(() => {
  const API_BASE = "http://127.0.0.1:8787/api";
  const TOKEN_KEY = "wf_admin_token";

  const table = document.getElementById("admin-jobs-table");
  const stats = document.getElementById("admin-jobs-stats");
  const message = document.getElementById("admin-jobs-message");
  const refreshBtn = document.getElementById("admin-refresh");
  const logoutBtn = document.getElementById("admin-logout");
  let itemsState = [];
  const completeUndoState = {};
  const pendingDeleteState = {};
  const DELETE_DELAY_MS = 8000;
  const POLL_MS = 8000;
  const loginUrl = new URL("../login/", window.location.href).toString();

  const token = localStorage.getItem(TOKEN_KEY);

  const setMessage = (text, isError = false) => {
    if (!message) return;
    message.textContent = text;
    message.classList.toggle("is-error", isError);
  };

  const escapeHtml = (value) =>
    String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");

  const formatDateTime = (value) => {
    if (!value) return "Not set";
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) {
      return String(value).replace("T", " ");
    }
    return new Intl.DateTimeFormat(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(parsed);
  };

  const redirectToLogin = () => {
    window.location.href = loginUrl;
  };

  if (!token) {
    redirectToLogin();
    return;
  }

  const authedFetch = async (path, options = {}) => {
    let response;
    try {
      response = await fetch(`${API_BASE}${path}`, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          ...(options.headers || {}),
        },
      });
    } catch (error) {
      throw new Error("Cannot reach local API at http://127.0.0.1:8787. Start: python3 local_api/server.py");
    }

    if (response.status === 401) {
      localStorage.removeItem(TOKEN_KEY);
      redirectToLogin();
      throw new Error("Session expired. Please sign in again.");
    }

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.error || "Request failed");
    }
    return result;
  };

  const formatStatus = (status) => status.charAt(0).toUpperCase() + status.slice(1);

  const renderStats = (items) => {
    if (!stats) return;

    const total = items.length;
    const queued = items.filter((item) => item.status === "queued").length;
    const complete = items.filter((item) => item.status === "complete").length;
    const activeRuns = items.filter((item) => {
      const runStatus = String(item.run_status || "").toLowerCase();
      return runStatus && runStatus !== "complete" && runStatus !== "failed";
    }).length;

    const cards = [
      { label: "Total jobs", value: total, tone: "fire" },
      { label: "Queued", value: queued, tone: "amber" },
      { label: "Completed", value: complete, tone: "green" },
      { label: "Runs in progress", value: activeRuns, tone: "default" },
    ];

    stats.innerHTML = cards
      .map(
        (card) => `
          <article class="wf-admin-stat wf-admin-stat-${card.tone}">
            <span class="wf-admin-stat-label">${card.label}</span>
            <strong class="wf-admin-stat-value">${card.value}</strong>
          </article>
        `
      )
      .join("");
  };

  const clearPendingDelete = (id) => {
    const pending = pendingDeleteState[id];
    if (!pending) return;
    clearTimeout(pending.timerId);
    delete pendingDeleteState[id];
  };

  const scheduleDelete = (id) => {
    clearPendingDelete(id);
    pendingDeleteState[id] = {
      timerId: setTimeout(async () => {
        try {
          await authedFetch(`/requests/${id}`, { method: "DELETE" });
          delete pendingDeleteState[id];
          setMessage(`Deleted ${id}.`);
          await loadJobs();
        } catch (error) {
          delete pendingDeleteState[id];
          setMessage(error.message || "Delete failed.", true);
          renderRows(itemsState);
        }
      }, DELETE_DELAY_MS),
    };
  };

  const renderRows = (items) => {
    itemsState = items;
    if (!table) return;
    renderStats(items);
    const rows = items
      .map(
        (req) => {
          const isDeletePending = Boolean(pendingDeleteState[req.id]);
          const completeAction = req.status === "complete" ? "undo-complete" : "complete";
          const completeLabel = req.status === "complete" ? "Undo" : "Complete";
          const deleteAction = isDeletePending ? "undo-delete" : "delete";
          const deleteLabel = isDeletePending ? "Undo Delete" : "Delete";
          const runStatus = req.run_status ? formatStatus(req.run_status) : "Not started";
          const cardClass = isDeletePending ? " wf-admin-job-card-pending" : "";
          return `
          <article class="wf-admin-job-card${cardClass}">
            <div class="wf-admin-job-head">
              <div>
                <p class="wf-admin-job-id">${escapeHtml(req.id)}</p>
                <h3>${escapeHtml(req.label || "Untitled request")}</h3>
              </div>
              <div class="wf-admin-job-badges">
                <span class="wf-status wf-status-${escapeHtml(req.status)}">${formatStatus(req.status)}</span>
                <span class="wf-admin-run-pill">${escapeHtml(runStatus)}</span>
              </div>
            </div>

            <div class="wf-admin-job-meta">
              <div>
                <span>Coordinates</span>
                <strong>${Number(req.lat).toFixed(3)}, ${Number(req.lon).toFixed(3)}</strong>
              </div>
              <div>
                <span>Model</span>
                <strong>${escapeHtml(String(req.model || "").toUpperCase() || "N/A")}</strong>
              </div>
              <div>
                <span>Ignition time</span>
                <strong>${escapeHtml(formatDateTime(req.time))}</strong>
              </div>
              <div>
                <span>Run state</span>
                <strong>${escapeHtml(runStatus)}</strong>
              </div>
            </div>

            <div class="wf-row-actions wf-admin-actions">
              <button type="button" data-action="run-orca" data-id="${req.id}">Run Orca</button>
              <button type="button" data-action="${completeAction}" data-id="${req.id}">${completeLabel}</button>
              <button type="button" data-action="${deleteAction}" data-id="${req.id}">${deleteLabel}</button>
            </div>
          </article>
        `;
        }
      )
      .join("");

    table.innerHTML = rows || '<div class="wf-empty">No jobs found.</div>';
  };

  const loadJobs = async () => {
    setMessage("Loading jobs...");
    try {
      const result = await authedFetch("/requests");
      const items = result.items || [];
      renderRows(items);
      setMessage(`${items.length} job${items.length === 1 ? "" : "s"} loaded.`);
    } catch (error) {
      setMessage(error.message || "Failed to load jobs.", true);
    }
  };

  if (table) {
    table.addEventListener("click", async (event) => {
      const button = event.target.closest("button[data-action]");
      if (!button) return;

      const action = button.dataset.action;
      const id = button.dataset.id;

      try {
        if (action === "complete") {
          completeUndoState[id] = itemsState.find((job) => job.id === id)?.status || "queued";
          await authedFetch(`/requests/${id}`, {
            method: "PATCH",
            body: JSON.stringify({ status: "complete" }),
          });
          setMessage(`Marked ${id} complete.`);
        }

        if (action === "run-orca") {
          await authedFetch(`/admin/trigger/${id}`, { method: "POST" });
          setMessage(`Orca run queued for ${id}.`);
        }

        if (action === "undo-complete") {
          const previousStatus = completeUndoState[id] || "queued";
          await authedFetch(`/requests/${id}`, {
            method: "PATCH",
            body: JSON.stringify({ status: previousStatus }),
          });
          delete completeUndoState[id];
          setMessage(`Restored ${id} to ${previousStatus}.`);
        }

        if (action === "delete") {
          scheduleDelete(id);
          setMessage(`Delete queued for ${id}. Click "Undo Delete" within 8 seconds to cancel.`);
          renderRows(itemsState);
          return;
        }

        if (action === "undo-delete") {
          clearPendingDelete(id);
          setMessage(`Delete canceled for ${id}.`);
          renderRows(itemsState);
          return;
        }

        await loadJobs();
      } catch (error) {
        setMessage(error.message || "Admin action failed.", true);
      }
    });
  }

  if (refreshBtn) {
    refreshBtn.addEventListener("click", loadJobs);
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem(TOKEN_KEY);
      redirectToLogin();
    });
  }

  loadJobs();
  setInterval(loadJobs, POLL_MS);
})();
