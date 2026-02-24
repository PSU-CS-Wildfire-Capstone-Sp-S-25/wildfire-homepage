(() => {
  const API_BASE = "http://127.0.0.1:8787/api";
  const TOKEN_KEY = "wf_admin_token";
  const form = document.getElementById("admin-login-form");
  const message = document.getElementById("admin-login-message");

  const setMessage = (text, isError = false) => {
    if (!message) return;
    message.textContent = text;
    message.classList.toggle("is-error", isError);
  };

  if (!form) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    setMessage("Signing in...");

    const data = new FormData(form);
    const payload = {
      username: String(data.get("username") || ""),
      password: String(data.get("password") || ""),
    };

    try {
      const response = await fetch(`${API_BASE}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();

      if (!response.ok || !result.token) {
        throw new Error(result.error || "Invalid credentials");
      }

      localStorage.setItem(TOKEN_KEY, result.token);
      window.location.href = "/admin/jobs/";
    } catch (error) {
      setMessage(error.message || "Login failed.", true);
    }
  });
})();
