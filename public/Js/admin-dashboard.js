// ../Js/admin-dashboard.js

document.addEventListener('DOMContentLoaded', async () => {
  fetch('/admin/appointments', {
  method: 'GET',
  headers: {
    'Authorization': 'admin12345token'
  }
})

  const token = localStorage.getItem('adminToken');
  if (!token) {
    alert("Unauthorized access. Please log in.");
    window.location.href = 'admin-login.html';
    return;
  }

  try {
    const res = await fetch('/admin/appointments', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await res.json();
    if (res.ok) {
      const tbody = document.querySelector('#appointmentsTable tbody');
      tbody.innerHTML = ''; // Clear any existing rows

      data.forEach(appointment => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${appointment.name}</td>
          <td>${appointment.fatherName}</td>
          <td>${appointment.email}</td>
          <td>${appointment.phone}</td>
          <td>${appointment.doctor}</td>
          <td>${appointment.date}</td>
          <td>${appointment.time}</td>
        `;
        tbody.appendChild(row);
      });
    } else {
      alert(data.message || 'Failed to fetch appointments.');
    }
  } catch (error) {
    console.error("Error loading appointments:", error);
    alert('Something went wrong.');
  }
});
