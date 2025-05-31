document.addEventListener("DOMContentLoaded", function () {
  const doctorLinks = document.querySelectorAll(".doctor-name");

  doctorLinks.forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault(); // Default anchor jump بند کریں

      const targetId = link.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      // تمام collapse بند کریں
      document.querySelectorAll(".collapse").forEach(c => {
        if (c.id !== targetId) {
          c.classList.remove("show");
        }
      });

      // Collapse toggle کریں
      const isOpen = targetElement.classList.contains("show");
      if (!isOpen) {
        new bootstrap.Collapse(targetElement, {
          toggle: true,
        });

        // Smooth scroll کریں
        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        new bootstrap.Collapse(targetElement, {
          toggle: false,
        });
      }
    });
  });
});
