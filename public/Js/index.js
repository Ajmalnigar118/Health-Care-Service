const form = document.getElementById('appointmentForm');
const messageDiv = document.getElementById('appointmentMessage');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = {
    name: form.name.value.trim(),
    fatherName: form.fatherName.value.trim(),
    email: form.email.value.trim(),
    phone: form.phone.value.trim(),
    doctor: form.doctor.value,
    date: form.date.value,
    time: form.time.value,
  };

  // سادہ client-side validation
  if (!formData.name || !formData.fatherName || !formData.email || !formData.phone || !formData.doctor || !formData.date || !formData.time) {
    messageDiv.style.color = 'red';
    messageDiv.textContent = 'براہ کرم تمام فیلڈز کو پر کریں۔';
    return;
  }

  try {
    const response = await fetch('/api/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {
      messageDiv.style.color = 'green';
      messageDiv.textContent = data.message;
      form.reset();
    } else {
      messageDiv.style.color = 'red';
      messageDiv.textContent = data.message || 'کچھ غلط ہوگیا ہے۔ دوبارہ کوشش کریں۔';
    }
  } catch (error) {
    messageDiv.style.color = 'red';
    messageDiv.textContent = 'سرور سے رابطہ نہیں ہو سکا۔ دوبارہ کوشش کریں۔';
    console.error('Network error:', error);
  }
});

// باقی آپ کا smooth fade-in اور scroll animations بھی رہیں گے

window.addEventListener('load', () => {
  document.body.classList.add('fade-in');
});

const sections = document.querySelectorAll('.fade-section');

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.1
});

sections.forEach(section => {
  fadeObserver.observe(section);
});
