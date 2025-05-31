// ../Js/view-users.js

document.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem('adminToken');
  if (!token) {
    alert("Unauthorized access. Please login as admin.");
    window.location.href = 'admin-login.html';
    return;
  }

  try {
    const res = await fetch('/admin/users', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const users = await res.json();
    if (res.ok) {
      const tbody = document.querySelector('#usersTable tbody');
      tbody.innerHTML = '';

      users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${user.name}</td>
          <td>${user.fatherName}</td>
          <td>${user.email}</td>
          <td>${user.phone}</td>
        `;
        tbody.appendChild(row);
      });
    } else {
      alert(users.message || "Failed to load users.");
    }
  } catch (error) {
    console.error("Fetch users error:", error);
    alert("Error loading users.");
  }
});
