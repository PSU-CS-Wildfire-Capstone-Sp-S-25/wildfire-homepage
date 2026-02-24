(() => {
  const API_BASE = "http://127.0.0.1:8787/api";
  const state = {
    apiEnabled: false,
    rotation: 0,
    syncSeconds: 0,
    requests: [
      {
        id: "WF-2401",
        lat: 38.716,
        lon: -120.2341,
        label: "Caldor replicate",
        time: "2026-01-29T09:00",
        status: "queued",
        model: "dynamical",
      },
      {
        id: "WF-2402",
        lat: 34.15,
        lon: -118.288,
        label: "Palisades snapshot",
        time: "2026-01-29T14:30",
        status: "running",
        model: "both",
      },
      {
        id: "WF-2403",
        lat: 44.058,
        lon: -121.314,
        label: "Crescent ignition",
        time: "2026-01-28T08:00",
        status: "complete",
        model: "ai",
      },
      {
        id: "WF-2404",
        lat: 39.441,
        lon: -106.045,
        label: "Rockies pilot",
        time: "2026-01-27T16:15",
        status: "queued",
        model: "dynamical",
      },
      {
        id: "WF-2405",
        lat: 47.6062,
        lon: -122.3321,
        label: "Puget smoke",
        time: "2026-01-29T06:45",
        status: "running",
        model: "both",
      },
    ],
  };

  const statusOrder = { running: 0, queued: 1, complete: 2 };
  const colors = {
    queued: "#f4b74a",
    running: "#ff6b3d",
    complete: "#38c172",
  };

  const form = document.getElementById("ignition-form");
  const toast = document.getElementById("submit-toast");
  const requestList = document.getElementById("request-list");
  const adminTable = document.getElementById("admin-table");
  const activeCount = document.getElementById("active-count");
  const lastSync = document.getElementById("last-sync");
  const refreshQueue = document.getElementById("refresh-queue");
  const exportCsv = document.getElementById("export-csv");
  const globeCanvas = document.getElementById("globe-canvas");

  const scrollButtons = document.querySelectorAll("[data-scroll-target]");
  scrollButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = document.querySelector(button.dataset.scrollTarget);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  const formatStatus = (status) => status[0].toUpperCase() + status.slice(1);
  const setToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2600);
  };

  const apiUrl = (path) => `${API_BASE}${path}`;

  const fetchJson = async (path, options = {}) => {
    const response = await fetch(apiUrl(path), {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }
    return response.json();
  };

  const loadRequestsFromApi = async () => {
    const data = await fetchJson("/requests");
    state.requests = data.items || [];
  };

  const computeActive = () =>
    state.requests.filter((req) => req.status !== "complete").length;

  const updateStats = () => {
    if (activeCount) activeCount.textContent = computeActive();
    if (lastSync) lastSync.textContent = "just now";
    state.syncSeconds = 0;
  };

  const renderRequestList = () => {
    if (!requestList) return;
    requestList.innerHTML = "";
    const sorted = [...state.requests].sort(
      (a, b) => statusOrder[a.status] - statusOrder[b.status]
    );
    sorted.slice(0, 6).forEach((req) => {
      const card = document.createElement("div");
      card.className = `request-card ${req.status}`;
      card.innerHTML = `
        <div>
          <p class="request-id">${req.id}</p>
          <p class="request-label">${req.label}</p>
          <p class="request-meta">${req.lat.toFixed(3)}, ${req.lon.toFixed(
            3
          )} · ${formatStatus(req.status)} · ${req.model.toUpperCase()}</p>
        </div>
        <div class="request-tag ${req.status}">${formatStatus(req.status)}</div>
      `;
      requestList.appendChild(card);
    });
  };

  const renderAdminTable = () => {
    if (!adminTable) return;
    const rows = state.requests.map((req) => {
      return `
        <div class="admin-row">
          <div>
            <p class="admin-id">${req.id}</p>
            <p class="admin-meta">${req.label}</p>
          </div>
          <div class="admin-meta">${req.lat.toFixed(3)}, ${req.lon.toFixed(
        3
      )}</div>
          <div class="admin-meta">${req.model.toUpperCase()}</div>
          <div class="admin-meta">${req.time.replace("T", " ")}</div>
          <div class="admin-status ${req.status}">${formatStatus(req.status)}</div>
          <div class="admin-actions-inline">
            <button type="button" data-action="complete" data-id="${req.id}">Complete</button>
            <button type="button" data-action="remove" data-id="${req.id}">Remove</button>
          </div>
        </div>
      `;
    });

    adminTable.innerHTML = `
      <div class="admin-header">
        <span>Request</span>
        <span>Lat/Lon</span>
        <span>Model</span>
        <span>Ignition time</span>
        <span>Status</span>
        <span>Actions</span>
      </div>
      ${rows.join("")}
    `;
  };

  const upsertRequest = (payload) => {
    const index = state.requests.findIndex((req) => req.id === payload.id);
    if (index === -1) {
      state.requests.unshift(payload);
      return;
    }
    state.requests[index] = { ...state.requests[index], ...payload };
  };

  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const payload = {
        id: `WF-${Math.floor(Math.random() * 9000 + 1000)}`,
        lat: Number(data.get("lat")),
        lon: Number(data.get("lon")),
        model: data.get("model"),
        label: data.get("label"),
        time: data.get("datetime"),
        notes: data.get("notes") || "",
        status: "queued",
      };
      if (state.apiEnabled) {
        try {
          await fetchJson("/requests", {
            method: "POST",
            body: JSON.stringify(payload),
          });
          await loadRequestsFromApi();
        } catch (error) {
          setToast("Failed to submit to local DB API.");
          return;
        }
      } else {
        upsertRequest(payload);
      }
      renderRequestList();
      renderAdminTable();
      updateStats();
      setToast("Request added to the queue.");
      form.reset();
    });
  }

  if (adminTable) {
    adminTable.addEventListener("click", async (event) => {
      const button = event.target.closest("button[data-action]");
      if (!button) return;
      const action = button.dataset.action;
      const id = button.dataset.id;
      const target = state.requests.find((req) => req.id === id);
      if (!target) return;
      try {
        if (action === "complete") {
          if (state.apiEnabled) {
            await fetchJson(`/requests/${id}`, {
              method: "PATCH",
              body: JSON.stringify({ status: "complete" }),
            });
            await loadRequestsFromApi();
          } else {
            target.status = "complete";
          }
          setToast(`Marked ${id} as complete.`);
        }
        if (action === "remove") {
          if (state.apiEnabled) {
            await fetchJson(`/requests/${id}`, { method: "DELETE" });
            await loadRequestsFromApi();
          } else {
            state.requests = state.requests.filter((req) => req.id !== id);
          }
          setToast(`Removed ${id} from queue.`);
        }
      } catch (error) {
        setToast("Admin action failed.");
        return;
      }
      renderRequestList();
      renderAdminTable();
      updateStats();
    });
  }

  if (refreshQueue) {
    refreshQueue.addEventListener("click", async () => {
      if (state.apiEnabled) {
        try {
          await loadRequestsFromApi();
        } catch (error) {
          setToast("Unable to refresh from local DB API.");
        }
      }
      updateStats();
      renderRequestList();
      renderAdminTable();
      setToast(
        state.apiEnabled ? "Queue refreshed from local DB." : "Queue refreshed."
      );
    });
  }

  if (exportCsv) {
    exportCsv.addEventListener("click", () => {
      const headers = [
        "id",
        "lat",
        "lon",
        "model",
        "label",
        "time",
        "status",
      ];
      const rows = state.requests.map((req) =>
        headers.map((key) => String(req[key] ?? "").replace(/"/g, ""))
      );
      const csv = [headers.join(","), ...rows.map((row) => row.join(","))].join(
        "\n"
      );
      const blob = new Blob([csv], { type: "text/csv" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "wrfxctrl-queue.csv";
      link.click();
      URL.revokeObjectURL(link.href);
    });
  }

  const ctx = globeCanvas?.getContext("2d");
  if (ctx && document.documentElement) {
    document.documentElement.classList.add("globe-live");
  }

  const project = (lat, lon, rotation, radius) => {
    const latRad = (lat * Math.PI) / 180;
    const lonRad = ((lon - rotation) * Math.PI) / 180;
    const cosLat = Math.cos(latRad);
    const x = radius * cosLat * Math.sin(lonRad);
    const y = radius * Math.sin(latRad);
    const z = cosLat * Math.cos(lonRad);
    return { x, y, visible: z > 0.02 };
  };

  const drawGlobe = () => {
    if (!ctx || !globeCanvas) return;
    const width = globeCanvas.width;
    const height = globeCanvas.height;
    const radius = Math.min(width, height) * 0.42;
    const centerX = width / 2;
    const centerY = height / 2;

    ctx.clearRect(0, 0, width, height);

    const gradient = ctx.createRadialGradient(
      centerX - radius * 0.3,
      centerY - radius * 0.3,
      radius * 0.2,
      centerX,
      centerY,
      radius
    );
    gradient.addColorStop(0, "#2d6f7e");
    gradient.addColorStop(0.6, "#0d3946");
    gradient.addColorStop(1, "#071f26");

    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
    ctx.clip();

    ctx.strokeStyle = "rgba(255,255,255,0.12)";
    ctx.lineWidth = 1;

    for (let lat = -60; lat <= 60; lat += 20) {
      ctx.beginPath();
      for (let lon = -180; lon <= 180; lon += 6) {
        const point = project(lat, lon, state.rotation, radius);
        const px = centerX + point.x;
        const py = centerY - point.y;
        if (lon === -180) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();
    }

    for (let lon = -150; lon <= 150; lon += 30) {
      ctx.beginPath();
      for (let lat = -90; lat <= 90; lat += 4) {
        const point = project(lat, lon, state.rotation, radius);
        const px = centerX + point.x;
        const py = centerY - point.y;
        if (lat === -90) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();
    }

    state.requests.forEach((req) => {
      const point = project(req.lat, req.lon, state.rotation, radius);
      if (!point.visible) return;
      ctx.beginPath();
      ctx.fillStyle = colors[req.status] || "#ffffff";
      ctx.strokeStyle = "rgba(0,0,0,0.4)";
      ctx.lineWidth = 2;
      ctx.arc(centerX + point.x, centerY - point.y, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    });

    ctx.restore();

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + 2, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(255,255,255,0.2)";
    ctx.lineWidth = 1;
    ctx.stroke();
  };

  const animate = () => {
    state.rotation = (state.rotation + 0.12) % 360;
    drawGlobe();
    requestAnimationFrame(animate);
  };

  const canvasToLatLon = (x, y) => {
    if (!globeCanvas) return null;
    const width = globeCanvas.width;
    const height = globeCanvas.height;
    const radius = Math.min(width, height) * 0.42;
    const centerX = width / 2;
    const centerY = height / 2;
    const dx = x - centerX;
    const dy = y - centerY;
    const rho = Math.hypot(dx, dy);
    if (rho > radius) return null;
    if (rho === 0) {
      return { lat: 0, lon: state.rotation };
    }
    const c = Math.asin(rho / radius);
    const lat = Math.asin((dy / rho) * Math.sin(c));
    const lon = Math.atan2(dx * Math.sin(c), rho * Math.cos(c));
    const latDeg = (-lat * 180) / Math.PI;
    const lonDeg = (lon * 180) / Math.PI + state.rotation;
    return { lat: latDeg, lon: ((lonDeg + 540) % 360) - 180 };
  };

  if (globeCanvas) {
    globeCanvas.addEventListener("click", (event) => {
      const rect = globeCanvas.getBoundingClientRect();
      const coords = canvasToLatLon(
        event.clientX - rect.left,
        event.clientY - rect.top
      );
      if (!coords) return;
      const latField = document.getElementById("request-lat");
      const lonField = document.getElementById("request-lon");
      if (latField) latField.value = coords.lat.toFixed(4);
      if (lonField) lonField.value = coords.lon.toFixed(4);
      setToast("Coordinates set from globe click.");
    });
  }

  setInterval(() => {
    state.syncSeconds += 10;
    if (state.syncSeconds >= 120) {
      updateStats();
    } else if (lastSync) {
      lastSync.textContent = `${state.syncSeconds}s ago`;
    }
  }, 10000);

  const initialize = async () => {
    try {
      await fetchJson("/health");
      state.apiEnabled = true;
      await loadRequestsFromApi();
      if (lastSync) lastSync.textContent = "just now";
    } catch (error) {
      state.apiEnabled = false;
      if (lastSync) lastSync.textContent = "demo mode";
    }

    renderRequestList();
    renderAdminTable();
    updateStats();
    drawGlobe();
    animate();
  };

  initialize();
})();
