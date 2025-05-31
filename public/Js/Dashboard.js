document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Unauthorized! Please login.");
    window.location.href = "../html/login.html";
    return;
  }

  fetch("/get-user-info", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("userName").textContent = data.name;
      document.getElementById("userFatherName").textContent = data.fatherName;
      document.getElementById("userEmail").textContent = data.email;
      document.getElementById("userPhone").textContent = data.phone;

      document.getElementById("editName").value = data.name;
      document.getElementById("editFatherName").value = data.fatherName;
      document.getElementById("editEmail").value = data.email;
      document.getElementById("editPhone").value = data.phone;

      if (data.profileImage) {
        document.getElementById("profileImage").src = `/uploads/${data.profileImage}`;
      }
    });

  document
    .getElementById("profileUpdateForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      const formData = new FormData(this);
      fetch("/update-profile", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          alert(data.message);
          location.reload();
        });
    });
});

function toggleEditForm() {
  document.getElementById("editProfileForm").classList.toggle("hidden");
}

function togglePasswordForm() {
  document.getElementById("changePasswordForm").classList.toggle("hidden");
}

function changePassword() {
  const token = localStorage.getItem("token");
  fetch("/change-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      oldPassword: document.getElementById("oldPassword").value,
      newPassword: document.getElementById("newPassword").value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      alert(data.message);
    });
}

function logout() {
  localStorage.removeItem("token");
  window.location.href = "../html/login.html";
}
