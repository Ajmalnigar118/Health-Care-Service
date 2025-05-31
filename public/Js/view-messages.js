// ../Js/view-messages.js

document.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem('adminToken');
  if (!token) {
    alert("Unauthorized access. Please login first.");
    window.location.href = 'admin-login.html';
    return;
  }

  try {
    const res = await fetch('/admin/messages', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await res.json();
    if (res.ok) {
      const tbody = document.querySelector('#messagesTable tbody');
      tbody.innerHTML = '';

      data.forEach(msg => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${msg.name}</td>
          <td>${msg.email}</td>
          <td>${msg.phone}</td>
          <td>${msg.message}</td>
        `;
        tbody.appendChild(row);
      });
    } else {
      alert(data.message || "Failed to fetch messages.");
    }
  } catch (err) {
    console.error("Error fetching messages:", err);
    alert("An error occurred while loading messages.");
  }
});
