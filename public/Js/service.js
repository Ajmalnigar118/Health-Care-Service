// script.js

document.addEventListener("DOMContentLoaded", () => {
  // Function to handle fade-in animation when element is in viewport
  const fadeSections = document.querySelectorAll('.fade-section');

  const fadeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  fadeSections.forEach(section => {
    fadeObserver.observe(section);
  });

  // Optional: Card hover effect (add/remove class)
  const serviceCards = document.querySelectorAll('.service-card');

  serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.classList.add('hovered');
    });
    card.addEventListener('mouseleave', () => {
      card.classList.remove('hovered');
    });
  });
});
function showDetails(serviceName) {
  const modal = new bootstrap.Modal(document.getElementById("detailsModal"));
  const content = document.getElementById("modalContent");

  let details = "";

  switch (serviceName) {
    case "Consultation":
      details = `
        <p>Our consultation services connect you with licensed healthcare professionals for diagnosis, advice, and follow-ups.</p>
        <ul>
          <li>24/7 availability</li>
          <li>Video or in-person appointments</li>
          <li>Instant prescriptions</li>
        </ul>`;
      break;

    case "Health Monitoring":
      details = `
        <p>Track your vital signs and get regular health reports. We ensure your wellness is continuously evaluated.</p>
        <ul>
          <li>Blood pressure, sugar, heart rate tracking</li>
          <li>Automated reports sent to your doctor</li>
          <li>Health coaching options</li>
        </ul>`;
      break;

    case "Online Therapy":
      details = `
        <p>Our certified therapists offer private sessions via secure video platforms tailored to your mental health needs.</p>
        <ul>
          <li>Emotional support and therapy</li>
          <li>Weekly one-on-one sessions</li>
          <li>Confidential and secure</li>
        </ul>`;
      break;
  }

  content.innerHTML = details;
  modal.show();
}
// Show or hide scroll button
window.onscroll = function () {
  const btn = document.getElementById("scrollBtn");
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    btn.style.display = "block";
  } else {
    btn.style.display = "none";
  }
};

// Smooth scroll to top
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
