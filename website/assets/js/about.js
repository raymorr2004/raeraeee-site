document.addEventListener("DOMContentLoaded", function () {
  const isAboutPage = document.body.id === "about-page";

  if (!isAboutPage) {
    return;
  }

  /* Expandable About sections */

  const aboutSections = document.querySelectorAll(
    "#about-page .about-section"
  );

  aboutSections.forEach((section) => {
    const header = section.querySelector(".about-section-header");

    if (!header) {
      return;
    }

    header.addEventListener("click", function () {
      section.classList.toggle("open");
    });
  });

  /* About-page image sliders */

  const aboutSliders = document.querySelectorAll(
    "#about-page .about-slider"
  );

  aboutSliders.forEach((slider) => {
    const slides = slider.querySelectorAll(".about-slide");

    if (slides.length < 2) {
      return;
    }

    let currentSlide = 0;

    const requestedInterval = Number(
      slider.dataset.slideInterval
    );

    const slideInterval =
      Number.isFinite(requestedInterval) && requestedInterval >= 1000
        ? requestedInterval
        : 5000;

    window.setInterval(function () {
      slides[currentSlide].classList.remove("is-active");

      currentSlide = (currentSlide + 1) % slides.length;

      slides[currentSlide].classList.add("is-active");
    }, slideInterval);
  });
});