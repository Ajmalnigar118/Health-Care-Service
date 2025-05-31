// Scroll To Top Button
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollToTopBtn.classList.add("show");
  } else {
    scrollToTopBtn.classList.remove("show");
  }
});

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contactForm');
  const response = document.getElementById('response');

  if (!contactForm || !response) {
    console.warn("Contact form or response element not found.");
    return;
  }

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const message = document.getElementById('messageText')?.value.trim();

    if (!name || !email || !message) {
      response.innerText = "Please fill all the fields.";
      response.style.color = "red";
      return;
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, message })
      });

      const data = await res.json();

      if (res.ok) {
        response.innerText = data.message;
        response.style.color = "green";
        contactForm.reset();
      } else {
        response.innerText = data.message || 'Submission failed.';
        response.style.color = "red";
      }

    } catch (err) {
      response.innerText = "Something went wrong.";
      response.style.color = "red";
      console.error(err);
    }
  });
});
