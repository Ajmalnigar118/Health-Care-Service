document.addEventListener('DOMContentLoaded', async () => {
  const tableBody = document.querySelector('#appointmentsTable tbody');

  try {
    const res = await fetch('/admin/appointments');
    const data = await res.json();

    if (Array.isArray(data)) {
      data.forEach(app => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${app.name}</td>
          <td>${app.fatherName}</td>
          <td>${app.email}</td>
          <td>${app.phone}</td>
          <td>${app.doctor}</td>
          <td>${app.date}</td>
          <td>${app.time}</td>
        `;
        tableBody.appendChild(row);
      });
    } else {
      console.error('Data is not an array:', data);
    }
  } catch (err) {
    console.error('Error fetching appointments:', err);
  }
});
