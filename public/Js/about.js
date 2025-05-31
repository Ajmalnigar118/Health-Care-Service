// about.js

// 1. Navbar active link highlight
document.querySelectorAll('.nav-link').forEach(link => {
  if (link.href === window.location.href) {
    link.classList.add('active');
  }
});

// 2. Smooth scroll for internal links (اگر آپ کے page میں internal anchor links ہوں)
// یہ آپ کے HTML میں موجود کسی anchor پر لگ سکتا ہے، یہاں example دیا ہے
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// 3. Fade-in animation for sections when scrolling into view
const fadeSections = document.querySelectorAll('section');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
    }
  });
}, { threshold: 0.1 });

fadeSections.forEach(section => observer.observe(section));
