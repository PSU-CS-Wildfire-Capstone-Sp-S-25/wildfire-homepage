(() => {
  const API_BASE = `${window.location.protocol}//${window.location.hostname}:8787/api`;
  const statusOrder = { running: 0, queued: 1, complete: 2 };
  const statusColors = { queued: "#f4b74a", running: "#ff6b3d", complete: "#38c172" };
  const SEEDED_REQUESTS = [
    { id: "WF-2401", lat: 38.716, lon: -120.2341, label: "Caldor replicate", time: "2026-01-29T09:00", status: "queued", model: "dynamical" },
    { id: "WF-2402", lat: 34.15, lon: -118.288, label: "Palisades snapshot", time: "2026-01-29T14:30", status: "running", model: "both" },
    { id: "WF-2403", lat: 44.058, lon: -121.314, label: "Crescent ignition", time: "2026-01-28T08:00", status: "complete", model: "ai" },
    { id: "WF-2404", lat: 39.441, lon: -106.045, label: "Rockies pilot", time: "2026-01-27T16:15", status: "queued", model: "dynamical" },
    { id: "WF-2405", lat: 47.6062, lon: -122.3321, label: "Puget smoke", time: "2026-01-29T06:45", status: "running", model: "both" },
    { id: "WF-2406", lat: 32.7157, lon: -117.1611, label: "San Diego interface", time: "2026-01-30T11:15", status: "queued", model: "ai" },
  ];

  const state = {
    apiEnabled: false,
    syncSeconds: 0,
    requests: [...SEEDED_REQUESTS],
    spinActive: true,
    userInteracting: false,
    rotationTimer: null,
  };

  const form = document.getElementById("ignition-form");
  const toast = document.getElementById("submit-toast");
  const requestList = document.getElementById("request-list");
  const activeCount = document.getElementById("active-count");
  const lastSync = document.getElementById("last-sync");
  const globeContainer = document.getElementById("globe-map");
  const tooltip = document.getElementById("globe-tooltip");
  const zoomInBtn = document.getElementById("globe-zoom-in");
  const zoomOutBtn = document.getElementById("globe-zoom-out");

  let projection;
  let path;
  let svg;
  let globeGroup;
  let globeCountries;
  let globePoints;
  let globeCircle;
  let countriesGeoJson;

  const apiUrl = (pathName) => `${API_BASE}${pathName}`;

  const fetchJson = async (pathName, options = {}) => {
    const response = await fetch(apiUrl(pathName), {
      cache: "no-store",
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });
    if (!response.ok) throw new Error(`API request failed: ${response.status}`);
    return response.json();
  };

  const checkApiHealth = async () => {
    try {
      await fetchJson("/health");
      state.apiEnabled = true;
      return true;
    } catch {
      state.apiEnabled = false;
      return false;
    }
  };

  const setToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2400);
  };

  const renderRequestList = () => {
    if (!requestList) return;
    requestList.innerHTML = "";
    const sorted = [...state.requests].sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);
    if (!sorted.length) {
      requestList.innerHTML = '<div class="request-card queued"><p class="request-meta">No requests yet.</p></div>';
      return;
    }
    sorted.slice(0, 6).forEach((req) => {
      const card = document.createElement("div");
      card.className = `request-card ${req.status}`;
      card.innerHTML = `
        <div>
          <p class="request-id">${req.id}</p>
          <p class="request-label">${req.label}</p>
          <p class="request-meta">${Number(req.lat).toFixed(3)}, ${Number(req.lon).toFixed(3)} · ${req.status[0].toUpperCase() + req.status.slice(1)} · ${String(req.model).toUpperCase()}</p>
        </div>
        <div class="request-tag ${req.status}">${req.status[0].toUpperCase() + req.status.slice(1)}</div>
      `;
      requestList.appendChild(card);
    });
  };

  const updateStats = () => {
    if (activeCount) activeCount.textContent = state.requests.filter((r) => r.status !== "complete").length;
    if (lastSync) lastSync.textContent = "just now";
    state.syncSeconds = 0;
  };

  const loadRequestsFromApi = async () => {
    const data = await fetchJson("/public-requests");
    const items = data.items || [];
    state.requests = items.length ? items : [...SEEDED_REQUESTS];
  };

  const createColorFromStatus = (status) => statusColors[status] || "#9ca3af";

  const renderGlobe = () => {
    if (!svg || !countriesGeoJson) return;
    path = d3.geoPath().projection(projection);

    globeCircle.attr("r", projection.scale()).attr("cx", projection.translate()[0]).attr("cy", projection.translate()[1]);

    globeCountries.selectAll("path").attr("d", path);

    globePoints
      .selectAll("circle")
      .attr("cx", (d) => {
        const pt = projection([+d.lon, +d.lat]);
        return pt ? pt[0] : -999;
      })
      .attr("cy", (d) => {
        const pt = projection([+d.lon, +d.lat]);
        return pt ? pt[1] : -999;
      })
      .style("display", (d) => {
        const p = d3.geoDistance([+d.lon, +d.lat], [-projection.rotate()[0], -projection.rotate()[1]]);
        return p > Math.PI / 2 ? "none" : "inline";
      });
  };

  const redrawRequestPoints = () => {
    if (!globePoints) return;
    const points = globePoints.selectAll("circle").data(state.requests, (d) => d.id);

    points
      .enter()
      .append("circle")
      .attr("r", 4.5)
      .attr("stroke", "rgba(0,0,0,0.4)")
      .attr("stroke-width", 1.5)
      .merge(points)
      .attr("fill", (d) => createColorFromStatus(d.status));

    points.exit().remove();
    renderGlobe();
  };

  const spinGlobe = () => {
    if (!projection || state.userInteracting || !state.spinActive) return;
    const rotate = projection.rotate();
    projection.rotate([rotate[0] - 0.18, rotate[1]]);
    renderGlobe();
  };

  const initD3Globe = async () => {
    if (!globeContainer || !window.d3 || !window.topojson) return;

    const width = Math.max(360, globeContainer.getBoundingClientRect().width || 520);
    const height = width;
    const center = [width / 2, height / 2];
    const radius = width / 2.3;

    projection = d3.geoOrthographic().scale(radius).translate(center).rotate([0, -20]).clipAngle(90);
    path = d3.geoPath().projection(projection);

    svg = d3.select(globeContainer).append("svg").attr("width", width).attr("height", height);

    globeCircle = svg
      .append("circle")
      .attr("class", "d3-globe-ocean")
      .attr("cx", center[0])
      .attr("cy", center[1])
      .attr("r", radius);

    globeGroup = svg.append("g");
    globeCountries = globeGroup.append("g").attr("class", "countries");
    globePoints = globeGroup.append("g").attr("class", "request-points");

    const world = await d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json");
    countriesGeoJson = topojson.feature(world, world.objects.countries);

    globeCountries
      .selectAll("path")
      .data(countriesGeoJson.features)
      .enter()
      .append("path")
      .attr("class", "d3-country")
      .on("mouseover", function () {
        d3.select(this).classed("is-hover", true);
      })
      .on("mouseout", function () {
        d3.select(this).classed("is-hover", false);
      });

    const drag = d3
      .drag()
      .on("start", () => {
        state.userInteracting = true;
      })
      .on("drag", (event) => {
        const rotate = projection.rotate();
        const k = 60 / projection.scale();
        projection.rotate([rotate[0] + event.dx * k, rotate[1] - event.dy * k]);
        renderGlobe();
      })
      .on("end", () => {
        state.userInteracting = false;
      });

    svg.call(drag);

    svg.call(
      d3.zoom().scaleExtent([0.7, 2.6]).on("zoom", (event) => {
        projection.scale(radius * event.transform.k);
        renderGlobe();
      })
    );

    svg.on("click", (event) => {
      const [mx, my] = d3.pointer(event);
      const coords = projection.invert([mx, my]);
      if (!coords) return;
      const lonField = document.getElementById("request-lon");
      const latField = document.getElementById("request-lat");
      if (lonField) lonField.value = Number(coords[0]).toFixed(4);
      if (latField) latField.value = Number(coords[1]).toFixed(4);
      setToast("Coordinates set from globe click.");
    });

    if (zoomInBtn) zoomInBtn.addEventListener("click", () => svg.call(d3.zoom().scaleBy, 1.2));
    if (zoomOutBtn) zoomOutBtn.addEventListener("click", () => svg.call(d3.zoom().scaleBy, 0.85));

    renderGlobe();
    if (state.rotationTimer) state.rotationTimer.stop();
    state.rotationTimer = d3.timer(spinGlobe);
  };

  const refreshRequests = async () => {
    if (!state.apiEnabled) {
      const ok = await checkApiHealth();
      if (!ok) return;
    }
    try {
      await loadRequestsFromApi();
      renderRequestList();
      redrawRequestPoints();
      updateStats();
    } catch {
      if (lastSync) lastSync.textContent = "sync error";
    }
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
          await fetchJson("/submit", { method: "POST", body: JSON.stringify(payload) });
          await loadRequestsFromApi();
        } catch {
          setToast("Failed to submit to local DB API.");
          return;
        }
      } else {
        state.requests.unshift(payload);
      }

      renderRequestList();
      redrawRequestPoints();
      updateStats();
      setToast("Request added to the queue.");
      form.reset();
    });
  }

  setInterval(async () => {
    state.syncSeconds += 10;
    if (state.syncSeconds >= 10) {
      await refreshRequests();
    } else if (lastSync) {
      lastSync.textContent = `${state.syncSeconds}s ago`;
    }
  }, 10000);

  const initialize = async () => {
    await initD3Globe();
    const ok = await checkApiHealth();
    if (ok) await loadRequestsFromApi();
    renderRequestList();
    redrawRequestPoints();
    updateStats();
  };

  initialize();
})();
