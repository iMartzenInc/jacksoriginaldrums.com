document.addEventListener("DOMContentLoaded", function () {
  // Update copyright jaar dynamisch
  const copyrightYear = document.getElementById("copyright-year");
  if (copyrightYear) {
    copyrightYear.textContent = new Date().getFullYear();
  }

  // Gladde scrolling voor anker links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");

      // Valideer dat targetId een simpele ID selector is (beveiliging: voorkom complexe selectors)
      if (!/^#[a-zA-Z][\w-]*$/.test(targetId)) {
        console.warn("Invalid anchor target:", targetId);
        return;
      }

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70, // Offset voor de navbar
          behavior: "smooth",
        });

        // Sluit de mobiele navigatie als deze open is
        const navbarCollapse = document.querySelector(".navbar-collapse");
        if (navbarCollapse.classList.contains("show")) {
          document.querySelector(".navbar-toggler").click();
        }
      }
    });
  });

  // Actieve nav-link aanpassen tijdens scrollen
  const sections = document.querySelectorAll("section, header");
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (pageYOffset >= sectionTop - 100) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

  // Drum galerij modal functionaliteit
  const drumModal = document.getElementById("drumModal");
  const modalImage = document.getElementById("modalImage");
  const modalTitle = document.getElementById("drumModalLabel");

  document.querySelectorAll(".drum-card").forEach((card) => {
    card.addEventListener("click", function () {
      const imgSrc = this.getAttribute("data-img");
      const imgTitle = this.getAttribute("data-title");

      // Beveiliging: Valideer dat imgSrc een veilig lokaal pad is
      if (imgSrc && /^images\/(drum|hout|jack|tekoop-[\w-]+)\d*\.jpe?g$/.test(imgSrc)) {
        modalImage.src = imgSrc;
        modalImage.alt = imgTitle || "";
        modalTitle.textContent = imgTitle || "Handgemaakte Drum";
      } else {
        console.warn("Invalid or missing image source:", imgSrc);
      }
    });
  });
});
