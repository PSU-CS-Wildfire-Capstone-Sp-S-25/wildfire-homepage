(() => {
  const API_BASE = "http://127.0.0.1:8787/api";
  const TOKEN_KEY = "wf_admin_token";

  const table = document.getElementById("admin-jobs-table");
  const message = document.getElementById("admin-jobs-message");
  const refreshBtn = document.getElementById("admin-refresh");
  const logoutBtn = document.getElementById("admin-logout");
  let itemsState = [];
  const completeUndoState = {};
  const pendingDeleteState = {};
  const DELETE_DELAY_MS = 8000;
  const POLL_MS = 8000;

  const token = localStorage.getItem(TOKEN_KEY);

  const setMessage = (text, isError = false) => {
    if (!message) return;
    message.textContent = text;
    message.classList.toggle("is-error", isError);
  };

  const redirectToLogin = () => {
    window.location.href = "/admin/login/";
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
    const rows = items
      .map(
        (req) => {
          const isDeletePending = Boolean(pendingDeleteState[req.id]);
          const completeAction = req.status === "complete" ? "undo-complete" : "complete";
          const completeLabel = req.status === "complete" ? "Undo" : "Complete";
          const deleteAction = isDeletePending ? "undo-delete" : "delete";
          const deleteLabel = isDeletePending ? "Undo Delete" : "Delete";
          return `
          <div class="wf-table-row">
            <div>${req.id}</div>
            <div>${req.label}</div>
            <div>${Number(req.lat).toFixed(3)}, ${Number(req.lon).toFixed(3)}</div>
            <div>${String(req.model || "").toUpperCase()}</div>
            <div>${String(req.time || "").replace("T", " ")}</div>
            <div>
              <span class="wf-status wf-status-${req.status}">${formatStatus(req.status)}</span>
            </div>
            <div>${req.run_status ? formatStatus(req.run_status) : "-"}</div>
            <div class="wf-row-actions">
              <button type="button" data-action="run-orca" data-id="${req.id}">Run Orca</button>
              <button type="button" data-action="${completeAction}" data-id="${req.id}">${completeLabel}</button>
              <button type="button" data-action="${deleteAction}" data-id="${req.id}">${deleteLabel}</button>
            </div>
          </div>
        `;
        }
      )
      .join("");

    table.innerHTML = `
      <div class="wf-table-head">
        <div>ID</div>
        <div>Label</div>
        <div>Coordinates</div>
        <div>Model</div>
        <div>Ignition Time</div>
        <div>Status</div>
        <div>Run</div>
        <div>Actions</div>
      </div>
      ${rows || '<div class="wf-empty">No jobs found.</div>'}
    `;
  };

  const loadJobs = async () => {
    setMessage("Loading jobs...");
    try {
      const result = await authedFetch("/requests");
      renderRows(result.items || []);
      setMessage("Jobs loaded.");
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
