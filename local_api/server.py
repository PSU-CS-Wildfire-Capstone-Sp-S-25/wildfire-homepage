#!/usr/bin/env python3
import hashlib
import json
import os
import secrets
import sqlite3
import subprocess
import threading
import time
from datetime import datetime, timezone
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[1]
DB_PATH = ROOT / "data" / "wildfire_local.db"
HOST = "127.0.0.1"
PORT = 8787
ADMIN_USER = os.getenv("WILDFIRE_ADMIN_USER", "admin")
ADMIN_PASSWORD = os.getenv("WILDFIRE_ADMIN_PASSWORD", "change-me")
TOKEN_TTL_SECONDS = 60 * 60 * 8
SESSIONS: dict[str, dict[str, str]] = {}
ORCA_SSH_HOST = os.getenv("ORCA_SSH_HOST", "")
ORCA_SSH_USER = os.getenv("ORCA_SSH_USER", "")
ORCA_SSH_KEY_PATH = os.getenv("ORCA_SSH_KEY_PATH", "")
ORCA_REMOTE_COMMAND = os.getenv("ORCA_REMOTE_COMMAND", "echo wildfire-run")
ORCA_SIMULATE = os.getenv("ORCA_SIMULATE", "1") == "1"
WREXWEB_BASE_URL = os.getenv("WREXWEB_BASE_URL", "https://your-wrexweb.example/runs")

SEED_REQUESTS = [
    ("WF-2401", 38.716, -120.2341, "dynamical", "Caldor replicate", "2026-01-29T09:00", "queued"),
    ("WF-2402", 34.15, -118.288, "both", "Palisades snapshot", "2026-01-29T14:30", "running"),
    ("WF-2403", 44.058, -121.314, "ai", "Crescent ignition", "2026-01-28T08:00", "complete"),
    ("WF-2404", 39.441, -106.045, "dynamical", "Rockies pilot", "2026-01-27T16:15", "queued"),
    ("WF-2405", 47.6062, -122.3321, "both", "Puget smoke", "2026-01-29T06:45", "running"),
]


def get_conn():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def now_iso():
    return datetime.now(timezone.utc).isoformat()


def now_utc():
    return datetime.now(timezone.utc)


def hash_token(token: str) -> str:
    return hashlib.sha256(token.encode("utf-8")).hexdigest()


def create_admin_session(username: str) -> str:
    token = secrets.token_urlsafe(32)
    token_hash = hash_token(token)
    expires_at = now_utc().timestamp() + TOKEN_TTL_SECONDS
    SESSIONS[token_hash] = {
        "username": username,
        "expires_at": str(expires_at),
    }
    return token


def validate_admin_token(token: str | None) -> bool:
    if not token:
        return False
    token_hash = hash_token(token)
    session = SESSIONS.get(token_hash)
    if not session:
        return False
    if float(session["expires_at"]) <= now_utc().timestamp():
        SESSIONS.pop(token_hash, None)
        return False
    return True


def get_bearer_token(headers) -> str | None:
    auth = headers.get("Authorization", "")
    if not auth.startswith("Bearer "):
        return None
    return auth.replace("Bearer ", "", 1).strip() or None


def parse_create_payload(payload):
    lat = float(payload["lat"])
    lon = float(payload["lon"])
    model = str(payload["model"])
    label = str(payload["label"]).strip()
    time = str(payload["time"])
    notes = str(payload.get("notes", ""))
    status = str(payload.get("status", "queued"))
    return lat, lon, model, label, time, notes, status


def init_db():
    DB_PATH.parent.mkdir(parents=True, exist_ok=True)
    with get_conn() as conn:
        conn.executescript(
            """
            CREATE TABLE IF NOT EXISTS ignition_requests (
                id TEXT PRIMARY KEY,
                lat REAL NOT NULL,
                lon REAL NOT NULL,
                model_type TEXT NOT NULL,
                label TEXT NOT NULL,
                ignition_time TEXT NOT NULL,
                notes TEXT,
                status TEXT NOT NULL DEFAULT 'queued' CHECK(status IN ('queued', 'running', 'complete')),
                created_at TEXT NOT NULL,
                updated_at TEXT NOT NULL
            );

            CREATE TABLE IF NOT EXISTS simulation_runs (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                request_id TEXT NOT NULL,
                wrfx_job_id TEXT,
                status TEXT NOT NULL,
                logs_url TEXT,
                updated_at TEXT NOT NULL,
                FOREIGN KEY (request_id) REFERENCES ignition_requests(id)
            );

            CREATE TABLE IF NOT EXISTS run_events (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                request_id TEXT NOT NULL,
                event_type TEXT NOT NULL,
                payload TEXT,
                created_at TEXT NOT NULL,
                FOREIGN KEY (request_id) REFERENCES ignition_requests(id)
            );
            """
        )
        existing = conn.execute("SELECT COUNT(1) AS c FROM ignition_requests").fetchone()["c"]
        if existing == 0:
            ts = now_iso()
            conn.executemany(
                """
                INSERT INTO ignition_requests
                (id, lat, lon, model_type, label, ignition_time, status, created_at, updated_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                """,
                [(r[0], r[1], r[2], r[3], r[4], r[5], r[6], ts, ts) for r in SEED_REQUESTS],
            )


def row_to_request(row):
    payload = {
        "id": row["id"],
        "lat": row["lat"],
        "lon": row["lon"],
        "model": row["model_type"],
        "label": row["label"],
        "time": row["ignition_time"],
        "notes": row["notes"] or "",
        "status": row["status"],
        "created_at": row["created_at"],
        "updated_at": row["updated_at"],
    }
    if "run_status" in row.keys():
        payload["run_status"] = row["run_status"] or ""
        payload["run_logs_url"] = row["run_logs_url"] or ""
        payload["run_result_url"] = row["run_result_url"] or ""
    return payload


def update_request_status(request_id: str, status: str):
    ts = now_iso()
    with get_conn() as conn:
        conn.execute(
            "UPDATE ignition_requests SET status = ?, updated_at = ? WHERE id = ?",
            (status, ts, request_id),
        )
        conn.execute(
            "INSERT INTO run_events (request_id, event_type, payload, created_at) VALUES (?, ?, ?, ?)",
            (request_id, "status_changed", json.dumps({"status": status}), ts),
        )


def set_simulation_run_status(run_id: int, status: str, logs_url: str = ""):
    ts = now_iso()
    with get_conn() as conn:
        conn.execute(
            "UPDATE simulation_runs SET status = ?, logs_url = ?, updated_at = ? WHERE id = ?",
            (status, logs_url, ts, run_id),
        )


def execute_orca_job(request_id: str, run_id: int, model: str):
    job_slug = f"{request_id}-{int(time.time())}"
    result_url = f"{WREXWEB_BASE_URL.rstrip('/')}/{job_slug}"
    logs = ""
    try:
        update_request_status(request_id, "running")
        set_simulation_run_status(run_id, "running")
        if ORCA_SIMULATE:
            time.sleep(2)
            logs = f"simulated_orca_job={job_slug}"
        else:
            if not (ORCA_SSH_HOST and ORCA_SSH_USER):
                raise RuntimeError("ORCA_SSH_HOST/ORCA_SSH_USER not configured")
            cmd = ["ssh"]
            if ORCA_SSH_KEY_PATH:
                cmd.extend(["-i", ORCA_SSH_KEY_PATH])
            remote = f"{ORCA_SSH_USER}@{ORCA_SSH_HOST}"
            cmd.extend([remote, f"{ORCA_REMOTE_COMMAND} --request {request_id} --model {model}"])
            proc = subprocess.run(cmd, capture_output=True, text=True, timeout=1800, check=True)
            logs = proc.stdout.strip()[:2000]
        logs_url = f"{result_url}/logs"
        set_simulation_run_status(run_id, "complete", logs_url=logs_url)
        update_request_status(request_id, "complete")
        with get_conn() as conn:
            ts = now_iso()
            conn.execute(
                "INSERT INTO run_events (request_id, event_type, payload, created_at) VALUES (?, ?, ?, ?)",
                (request_id, "orca_completed", json.dumps({"result_url": result_url, "logs": logs}), ts),
            )
    except Exception as exc:
        set_simulation_run_status(run_id, "failed", logs_url=str(exc))
        update_request_status(request_id, "queued")
        with get_conn() as conn:
            ts = now_iso()
            conn.execute(
                "INSERT INTO run_events (request_id, event_type, payload, created_at) VALUES (?, ?, ?, ?)",
                (request_id, "orca_failed", json.dumps({"error": str(exc)}), ts),
            )


def queue_orca_trigger(request_id: str):
    with get_conn() as conn:
        request_row = conn.execute(
            "SELECT id, model_type FROM ignition_requests WHERE id = ?",
            (request_id,),
        ).fetchone()
        if not request_row:
            return None
        ts = now_iso()
        cursor = conn.execute(
            """
            INSERT INTO simulation_runs (request_id, wrfx_job_id, status, logs_url, updated_at)
            VALUES (?, ?, ?, ?, ?)
            """,
            (request_id, f"orca-{request_id.lower()}", "queued", "", ts),
        )
        run_id = cursor.lastrowid
        conn.execute(
            "INSERT INTO run_events (request_id, event_type, payload, created_at) VALUES (?, ?, ?, ?)",
            (request_id, "orca_triggered", json.dumps({"run_id": run_id}), ts),
        )
    worker = threading.Thread(
        target=execute_orca_job,
        args=(request_id, run_id, request_row["model_type"]),
        daemon=True,
    )
    worker.start()
    return run_id


class Handler(BaseHTTPRequestHandler):
    server_version = "WildfireLocalDB/1.0"

    def _set_headers(self, code=200, content_type="application/json"):
        self.send_response(code)
        self.send_header("Content-Type", content_type)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE,OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")
        self.end_headers()

    def _read_json(self):
        length = int(self.headers.get("Content-Length", "0") or "0")
        if length <= 0:
            return {}
        body = self.rfile.read(length)
        return json.loads(body.decode("utf-8"))

    def _write_json(self, payload, code=200):
        self._set_headers(code)
        self.wfile.write(json.dumps(payload).encode("utf-8"))

    def _authed(self):
        token = get_bearer_token(self.headers)
        return validate_admin_token(token)

    def _require_admin(self):
        if self._authed():
            return True
        self._write_json({"error": "Unauthorized"}, 401)
        return False

    def _create_request(self, payload):
        lat, lon, model, label, time, notes, status = parse_create_payload(payload)

        if model not in {"dynamical", "ai", "both"}:
            self._write_json({"error": "Invalid model type"}, 400)
            return
        if status not in {"queued", "running", "complete"}:
            self._write_json({"error": "Invalid status"}, 400)
            return
        if not label:
            self._write_json({"error": "Label is required"}, 400)
            return

        rid = payload.get("id") or f"WF-{int(datetime.now().timestamp()) % 100000:05d}"
        ts = now_iso()

        try:
            with get_conn() as conn:
                conn.execute(
                    """
                    INSERT INTO ignition_requests
                    (id, lat, lon, model_type, label, ignition_time, notes, status, created_at, updated_at)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    """,
                    (rid, lat, lon, model, label, time, notes, status, ts, ts),
                )
                conn.execute(
                    "INSERT INTO run_events (request_id, event_type, payload, created_at) VALUES (?, ?, ?, ?)",
                    (rid, "created", json.dumps({"status": status}), ts),
                )
        except sqlite3.IntegrityError:
            self._write_json({"error": "Request id already exists"}, 409)
            return

        self._write_json({"id": rid, "ok": True}, 201)

    def log_message(self, fmt, *args):
        return

    def do_OPTIONS(self):
        self._set_headers(204)

    def do_GET(self):
        path = urlparse(self.path).path
        if path == "/api/health":
            self._write_json({"ok": True, "db": str(DB_PATH)})
            return

        if path == "/api/requests":
            if not self._require_admin():
                return
            with get_conn() as conn:
                rows = conn.execute(
                    """
                    SELECT
                        ir.*,
                        sr.status AS run_status,
                        sr.logs_url AS run_logs_url,
                        ? || '/' || COALESCE(sr.wrfx_job_id, '') AS run_result_url
                    FROM ignition_requests ir
                    LEFT JOIN (
                        SELECT s1.*
                        FROM simulation_runs s1
                        INNER JOIN (
                            SELECT request_id, MAX(id) AS max_id
                            FROM simulation_runs
                            GROUP BY request_id
                        ) latest ON latest.request_id = s1.request_id AND latest.max_id = s1.id
                    ) sr ON sr.request_id = ir.id
                    ORDER BY CASE ir.status
                        WHEN 'running' THEN 0
                        WHEN 'queued' THEN 1
                        ELSE 2
                    END, ir.created_at DESC
                    """
                    ,
                    (WREXWEB_BASE_URL.rstrip("/"),),
                ).fetchall()
            self._write_json({"items": [row_to_request(r) for r in rows]})
            return

        if path == "/api/public-requests":
            with get_conn() as conn:
                rows = conn.execute(
                    """
                    SELECT
                        ir.*,
                        sr.status AS run_status,
                        sr.logs_url AS run_logs_url,
                        ? || '/' || COALESCE(sr.wrfx_job_id, '') AS run_result_url
                    FROM ignition_requests ir
                    LEFT JOIN (
                        SELECT s1.*
                        FROM simulation_runs s1
                        INNER JOIN (
                            SELECT request_id, MAX(id) AS max_id
                            FROM simulation_runs
                            GROUP BY request_id
                        ) latest ON latest.request_id = s1.request_id AND latest.max_id = s1.id
                    ) sr ON sr.request_id = ir.id
                    ORDER BY ir.created_at DESC
                    LIMIT 100
                    """
                    ,
                    (WREXWEB_BASE_URL.rstrip("/"),),
                ).fetchall()
            self._write_json({"items": [row_to_request(r) for r in rows]})
            return

        self._write_json({"error": "Not found"}, 404)

    def do_POST(self):
        path = urlparse(self.path).path
        if path == "/api/admin/login":
            try:
                payload = self._read_json()
                username = str(payload.get("username", ""))
                password = str(payload.get("password", ""))
            except Exception:
                self._write_json({"error": "Invalid login payload"}, 400)
                return
            if username != ADMIN_USER or password != ADMIN_PASSWORD:
                self._write_json({"error": "Invalid credentials"}, 401)
                return
            token = create_admin_session(username)
            self._write_json({"ok": True, "token": token, "expires_in": TOKEN_TTL_SECONDS})
            return

        if path == "/api/admin/verify":
            if not self._require_admin():
                return
            self._write_json({"ok": True})
            return

        if path.startswith("/api/admin/trigger/"):
            if not self._require_admin():
                return
            request_id = path.rsplit("/", 1)[-1]
            if not request_id:
                self._write_json({"error": "Invalid request id"}, 400)
                return
            run_id = queue_orca_trigger(request_id)
            if not run_id:
                self._write_json({"error": "Request not found"}, 404)
                return
            self._write_json({"ok": True, "run_id": run_id, "message": "Orca run queued"})
            return

        if path == "/api/submit":
            try:
                payload = self._read_json()
            except Exception:
                self._write_json({"error": "Invalid request payload"}, 400)
                return
            payload["status"] = "queued"
            try:
                self._create_request(payload)
            except Exception:
                self._write_json({"error": "Invalid request payload"}, 400)
            return

        if path == "/api/requests":
            if not self._require_admin():
                return
            try:
                payload = self._read_json()
            except Exception:
                self._write_json({"error": "Invalid request payload"}, 400)
                return
            try:
                self._create_request(payload)
            except Exception:
                self._write_json({"error": "Invalid request payload"}, 400)
            return

        else:
            self._write_json({"error": "Not found"}, 404)
            return

    def do_PATCH(self):
        if not self._require_admin():
            return
        path = urlparse(self.path).path
        parts = path.strip("/").split("/")
        if len(parts) != 3 or parts[:2] != ["api", "requests"]:
            self._write_json({"error": "Not found"}, 404)
            return

        request_id = parts[2]
        payload = self._read_json()
        status = payload.get("status")

        if status not in {"queued", "running", "complete"}:
            self._write_json({"error": "Invalid status"}, 400)
            return

        ts = now_iso()
        with get_conn() as conn:
            row = conn.execute("SELECT id FROM ignition_requests WHERE id = ?", (request_id,)).fetchone()
            if not row:
                self._write_json({"error": "Request not found"}, 404)
                return
            conn.execute(
                "UPDATE ignition_requests SET status = ?, updated_at = ? WHERE id = ?",
                (status, ts, request_id),
            )
            conn.execute(
                "INSERT INTO run_events (request_id, event_type, payload, created_at) VALUES (?, ?, ?, ?)",
                (request_id, "status_changed", json.dumps({"status": status}), ts),
            )

        self._write_json({"ok": True})

    def do_DELETE(self):
        if not self._require_admin():
            return
        path = urlparse(self.path).path
        parts = path.strip("/").split("/")
        if len(parts) != 3 or parts[:2] != ["api", "requests"]:
            self._write_json({"error": "Not found"}, 404)
            return

        request_id = parts[2]
        with get_conn() as conn:
            row = conn.execute("SELECT id FROM ignition_requests WHERE id = ?", (request_id,)).fetchone()
            if not row:
                self._write_json({"error": "Request not found"}, 404)
                return
            ts = now_iso()
            conn.execute(
                "INSERT INTO run_events (request_id, event_type, payload, created_at) VALUES (?, ?, ?, ?)",
                (request_id, "removed", json.dumps({}), ts),
            )
            conn.execute("DELETE FROM ignition_requests WHERE id = ?", (request_id,))

        self._write_json({"ok": True})


def main():
    init_db()
    server = ThreadingHTTPServer((HOST, PORT), Handler)
    print(f"Local API listening at http://{HOST}:{PORT}")
    print(f"SQLite DB file: {DB_PATH}")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping server")


if __name__ == "__main__":
    main()
