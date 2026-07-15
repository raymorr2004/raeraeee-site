// assets/js/services.js
document.addEventListener('DOMContentLoaded', () => {
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Calculate and set a good height for the active image
  function fitHeight(slider, idx) {
    const slides = slider._slides;
    const a = slides[idx];
    const img = a.querySelector('img');
    if (!img || !img.naturalWidth || !img.naturalHeight) return;

    // inner width (accounting for inset:10px from CSS)
    const innerW = slider.clientWidth - 20; // 10px left + 10px right
    const ratio = img.naturalHeight / img.naturalWidth;

    // clamp so it never gets too tiny or too tall
    const minH = 180;
    const maxH = 380;
    const nextH = Math.max(minH, Math.min(maxH, Math.round(innerW * ratio)));

    slider.style.setProperty('--overlay-h', `${nextH + 20}px`); // +20 to include our top/bottom inset
  }

  document.querySelectorAll('.overlay-slider').forEach(slider => {
    const slides = Array.from(slider.querySelectorAll('.slide'));
    if (slides.length <= 1) return;

    slider._slides = slides;
    let idx = 0, timer = null;
    const intervalMs = parseInt(slider.dataset.interval, 10) || 3500;

    // Ensure all images report natural sizes
    slides.forEach(s => {
      const img = s.querySelector('img');
      if (!img) return;
      if (!img.complete) {
        img.addEventListener('load', () => fitHeight(slider, idx), { once: true });
      }
    });

    const show = (i) => {
      slides[idx].classList.remove('is-active');
      idx = (i + slides.length) % slides.length;
      slides[idx].classList.add('is-active');
      fitHeight(slider, idx);
    };

    const start = () => { if (reduce) return; stop(); timer = setInterval(() => show(idx + 1), intervalMs); };
    const stop  = () => { if (timer) { clearInterval(timer); timer = null; } };

    slider.addEventListener('mouseenter', stop);
    slider.addEventListener('mouseleave', start);
    slider.addEventListener('focusin', stop);
    slider.addEventListener('focusout', start);

    // Initial state
    slides[0].classList.add('is-active');
    fitHeight(slider, 0);
    start();

    // Keep height correct on resize
    window.addEventListener('resize', () => fitHeight(slider, idx));
  });
});

// Expand/collapse service cards (click or keyboard)
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.game-panel .service-card');

  cards.forEach(card => {
    // a11y
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-expanded', 'false');

    const toggle = () => {
      const isOpen = card.classList.toggle('open');
      card.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    };

    // Don’t toggle when clicking links inside the card
    card.addEventListener('click', (e) => {
      if (e.target.closest('a')) return;
      toggle();
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle();
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('#packages .package-card');

  cards.forEach(card => {
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-expanded', card.classList.contains('open') ? 'true' : 'false');

    const toggle = () => {
      const isOpen = card.classList.toggle('open');
      card.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    };

    // Don’t toggle when clicking links
    card.addEventListener('click', (e) => {
      if (e.target.closest('a')) return;
      toggle();
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
    });
  });
});

