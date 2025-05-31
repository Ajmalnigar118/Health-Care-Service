document.getElementById("adminLoginForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const username = this.username.value.trim();
  const password = this.password.value.trim();
  const messageBox = document.getElementById("adminLoginMessage");

  try {
    const res = await fetch("/admin-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const result = await res.json();

    if (res.ok) {
      messageBox.textContent = result.message;
      messageBox.style.color = "green";
      localStorage.setItem("adminToken", result.token);
      window.location.href = "../html/admin-dashboard.html";
    } else {
      messageBox.textContent = result.message;
      messageBox.style.color = "red";
    }
  } catch (err) {
    messageBox.textContent = "Login error.";
    messageBox.style.color = "red";
  }
});
