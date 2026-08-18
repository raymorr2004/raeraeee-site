// ============================================================
// RaeRaeee Site - Shared JavaScript
// Loaded on every page. Each feature only runs when its
// matching elements exist on the current page.
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initActiveNavigation();
  initSocialCards();
  initEmailBlocks();
  initExpandableGameCards();
  initServiceCards();
  initPackageCards();
  initExpandableSections();
  initImageSliders();
  initOverlaySliders();
  initMinecraftServers();
  initCalendar();
});


// ============================================================
// THEME
// ============================================================

function initTheme() {
  const themeLink = document.getElementById("theme-stylesheet");
  const toggleBtn = document.getElementById("toggle-theme");

  if (!themeLink) return;

  const themes = {
    light: "assets/css/style.css",
    dark: "assets/css/darkmode.css",
  };

  const prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  const defaultTheme =
    themeLink.dataset.default || (prefersDark ? "dark" : "light");

  function applyTheme(theme) {
    const selectedTheme = themes[theme] ? theme : "light";

    themeLink.setAttribute("href", themes[selectedTheme]);
    localStorage.setItem("theme", selectedTheme);
    document.documentElement.setAttribute("data-theme", selectedTheme);

    if (toggleBtn) {
      toggleBtn.textContent =
        selectedTheme === "dark" ? "Light Mode" : "Dark Mode";

      toggleBtn.setAttribute(
        "aria-pressed",
        selectedTheme === "dark" ? "true" : "false"
      );
    }
  }

  const savedTheme = localStorage.getItem("theme");
  applyTheme(savedTheme || defaultTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener("click", (event) => {
      event.preventDefault();

      const currentTheme =
        localStorage.getItem("theme") || defaultTheme;

      applyTheme(currentTheme === "dark" ? "light" : "dark");
    });
  }
}


// ============================================================
// ACTIVE NAVIGATION LINK
// ============================================================

function initActiveNavigation() {
  const navLinks = document.querySelectorAll("nav a");
  const currentPage =
    window.location.pathname.split("/").pop() || "index.html";

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");

    if (!href) return;

    const linkPage = href.split("#")[0].split("/").pop();

    if (linkPage === currentPage) {
      link.classList.add("active");

      // If the active page is inside the Services dropdown,
      // keep the dropdown open so the current page is visible.
      const dropdown = link.closest(".nav-dropdown");

      if (dropdown) {
        dropdown.open = true;
      }
    }
  });
}


// ============================================================
// SOCIAL CARDS
// ============================================================

function initSocialCards() {
  document.querySelectorAll(".social-link").forEach((box) => {
    const image = box.querySelector("img");
    const header = box.querySelector("h4");

    [image, header].filter(Boolean).forEach((element) => {
      element.addEventListener("click", (event) => {
        event.stopPropagation();
        box.classList.toggle("expanded");
      });
    });
  });
}


// ============================================================
// EMAIL REVEAL + COPY
// ============================================================

function initEmailBlocks() {
  document.querySelectorAll(".email-block").forEach((emailBlock) => {
    const image = emailBlock.querySelector("img");
    const header = emailBlock.querySelector("h4");
    const emailText = emailBlock.querySelector(".email-address");
    const confirm = emailBlock.querySelector(".copy-confirm");

    [image, header].filter(Boolean).forEach((element) => {
      element.addEventListener("click", () => {
        emailBlock.classList.toggle("expanded");
      });
    });

    if (!emailText) return;

    emailText.addEventListener("click", async () => {
      const address = emailText.textContent.trim();

      try {
        await navigator.clipboard.writeText(address);

        if (confirm) {
          confirm.style.opacity = "1";

          window.setTimeout(() => {
            confirm.style.opacity = "0";
          }, 2000);
        }
      } catch (error) {
        console.warn("Could not copy email address:", error);
      }
    });
  });
}


// ============================================================
// GAME PAGE CARDS
// ============================================================

function initExpandableGameCards() {
  if (document.body.id !== "games-page") return;

  document.querySelectorAll(".game-card").forEach((card) => {
    const header = card.querySelector("h4");
    const image = card.querySelector("img");

    const toggleCard = () => {
      card.classList.toggle("expanded");
    };

    if (header) {
      header.addEventListener("click", toggleCard);
    }

    if (image) {
      image.addEventListener("click", toggleCard);
    }
  });
}


// ============================================================
// SERVICE CARDS
// ============================================================

function initServiceCards() {
  document
    .querySelectorAll(".game-panel .service-card")
    .forEach((card) => {
      card.setAttribute("role", "button");
      card.setAttribute("tabindex", "0");

      card.setAttribute(
        "aria-expanded",
        card.classList.contains("open") ? "true" : "false"
      );

      const toggleCard = () => {
        const isOpen = card.classList.toggle("open");

        card.setAttribute(
          "aria-expanded",
          isOpen ? "true" : "false"
        );
      };

      card.addEventListener("click", (event) => {
        if (
          event.target.closest(
            "a, button, input, select, textarea"
          )
        ) {
          return;
        }

        toggleCard();
      });

      card.addEventListener("keydown", (event) => {
        if (
          event.key === "Enter" ||
          event.key === " "
        ) {
          if (
            event.target.closest(
              "a, button, input, select, textarea"
            )
          ) {
            return;
          }

          event.preventDefault();
          toggleCard();
        }
      });
    });
}


// ============================================================
// LEGACY SERVICES PACKAGE CARDS
// Keeps the old services.html functional if it still exists.
// ============================================================

function initPackageCards() {
  document
    .querySelectorAll("#packages .package-card")
    .forEach((card) => {
      card.setAttribute("role", "button");
      card.setAttribute("tabindex", "0");

      card.setAttribute(
        "aria-expanded",
        card.classList.contains("open") ? "true" : "false"
      );

      const toggleCard = () => {
        const isOpen = card.classList.toggle("open");

        card.setAttribute(
          "aria-expanded",
          isOpen ? "true" : "false"
        );
      };

      card.addEventListener("click", (event) => {
        if (event.target.closest("a")) return;

        toggleCard();
      });

      card.addEventListener("keydown", (event) => {
        if (
          event.key === "Enter" ||
          event.key === " "
        ) {
          event.preventDefault();
          toggleCard();
        }
      });
    });
}


// ============================================================
// EXPANDABLE ABOUT / FINISHED PROJECT SECTIONS
// ============================================================

function initExpandableSections() {
  document
    .querySelectorAll(".about-section")
    .forEach((section) => {
      const header =
        section.querySelector(".about-section-header");

      if (!header) return;

      header.setAttribute("role", "button");
      header.setAttribute("tabindex", "0");

      header.setAttribute(
        "aria-expanded",
        section.classList.contains("open")
          ? "true"
          : "false"
      );

      const toggleSection = () => {
        const isOpen =
          section.classList.toggle("open");

        header.setAttribute(
          "aria-expanded",
          isOpen ? "true" : "false"
        );
      };

      header.addEventListener(
        "click",
        toggleSection
      );

      header.addEventListener(
        "keydown",
        (event) => {
          if (
            event.key === "Enter" ||
            event.key === " "
          ) {
            event.preventDefault();
            toggleSection();
          }
        }
      );
    });
}


// ============================================================
// ABOUT / FINISHED PROJECT IMAGE SLIDERS
// ============================================================

function initImageSliders() {
  const reduceMotion =
    window.matchMedia &&
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

  document
    .querySelectorAll(".about-slider")
    .forEach((slider) => {
      const slides = Array.from(
        slider.querySelectorAll(".about-slide")
      );

      if (slides.length === 0) return;

      let currentSlide = Math.max(
        0,
        slides.findIndex((slide) =>
          slide.classList.contains("is-active")
        )
      );

      slides.forEach((slide, index) => {
        slide.classList.toggle(
          "is-active",
          index === currentSlide
        );
      });

      if (
        slides.length <= 1 ||
        reduceMotion
      ) {
        return;
      }

      const requestedInterval =
        Number(slider.dataset.slideInterval);

      const interval =
        Number.isFinite(requestedInterval) &&
        requestedInterval >= 1000
          ? requestedInterval
          : 4000;

      let timer = null;

      const showSlide = (index) => {
        slides[currentSlide].classList.remove(
          "is-active"
        );

        currentSlide =
          (index + slides.length) %
          slides.length;

        slides[currentSlide].classList.add(
          "is-active"
        );
      };

      const stop = () => {
        if (timer !== null) {
          window.clearInterval(timer);
          timer = null;
        }
      };

      const start = () => {
        stop();

        timer = window.setInterval(() => {
          showSlide(currentSlide + 1);
        }, interval);
      };

      slider.addEventListener(
        "mouseenter",
        stop
      );

      slider.addEventListener(
        "mouseleave",
        start
      );

      slider.addEventListener(
        "focusin",
        stop
      );

      slider.addEventListener(
        "focusout",
        start
      );

      start();
    });
}


// ============================================================
// SERVICES / PORTFOLIO OVERLAY SLIDERS
// ============================================================

function initOverlaySliders() {
  const reduceMotion =
    window.matchMedia &&
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

  function fitHeight(slider, index) {
    const slides = slider._slides;

    if (
      !slides ||
      !slides[index]
    ) {
      return;
    }

    const image =
      slides[index].querySelector("img");

    if (
      !image ||
      !image.naturalWidth ||
      !image.naturalHeight
    ) {
      return;
    }

    const innerWidth =
      Math.max(
        0,
        slider.clientWidth - 20
      );

    const ratio =
      image.naturalHeight /
      image.naturalWidth;

    const minHeight = 180;
    const maxHeight = 380;

    const calculatedHeight =
      Math.round(
        innerWidth * ratio
      );

    const nextHeight =
      Math.max(
        minHeight,
        Math.min(
          maxHeight,
          calculatedHeight
        )
      );

    slider.style.setProperty(
      "--overlay-h",
      `${nextHeight + 20}px`
    );
  }

  document
    .querySelectorAll(".overlay-slider")
    .forEach((slider) => {
      const slides = Array.from(
        slider.querySelectorAll(".slide")
      );

      if (slides.length === 0) return;

      slider._slides = slides;

      let currentIndex = Math.max(
        0,
        slides.findIndex((slide) =>
          slide.classList.contains("is-active")
        )
      );

      let timer = null;

      const interval =
        Number.parseInt(
          slider.dataset.interval,
          10
        ) || 3500;

      slides.forEach(
        (slide, index) => {
          slide.classList.toggle(
            "is-active",
            index === currentIndex
          );

          const image =
            slide.querySelector("img");

          if (
            image &&
            !image.complete
          ) {
            image.addEventListener(
              "load",
              () =>
                fitHeight(
                  slider,
                  currentIndex
                ),
              { once: true }
            );
          }
        }
      );

      const showSlide = (index) => {
        slides[currentIndex]
          .classList.remove(
            "is-active"
          );

        currentIndex =
          (index + slides.length) %
          slides.length;

        slides[currentIndex]
          .classList.add(
            "is-active"
          );

        fitHeight(
          slider,
          currentIndex
        );
      };

      const stop = () => {
        if (timer !== null) {
          window.clearInterval(
            timer
          );

          timer = null;
        }
      };

      const start = () => {
        if (
          reduceMotion ||
          slides.length <= 1
        ) {
          return;
        }

        stop();

        timer =
          window.setInterval(
            () => {
              showSlide(
                currentIndex + 1
              );
            },
            interval
          );
      };

      slider.addEventListener(
        "mouseenter",
        stop
      );

      slider.addEventListener(
        "mouseleave",
        start
      );

      slider.addEventListener(
        "focusin",
        stop
      );

      slider.addEventListener(
        "focusout",
        start
      );

      fitHeight(
        slider,
        currentIndex
      );

      start();

      window.addEventListener(
        "resize",
        () => {
          fitHeight(
            slider,
            currentIndex
          );
        }
      );
    });
}


// ============================================================
// MINECRAFT SERVER SECTIONS
// ============================================================

function initMinecraftServers() {
  const servers =
    document.querySelectorAll(
      ".server-column"
    );

  if (servers.length === 0) return;

  const desktopBreakpoint = 1100;

  servers.forEach((server) => {
    const header =
      server.querySelector(
        ".server-column-header"
      );

    if (!header) return;

    if (
      window.innerWidth <
      desktopBreakpoint
    ) {
      server.classList.remove("open");
    }

    header.addEventListener(
      "click",
      () => {
        server.classList.toggle("open");
      }
    );
  });
}


// ============================================================
// CALENDAR
// ============================================================

function initCalendar() {
  const calendar =
    document.getElementById("calendar");

  const monthYear =
    document.getElementById("month-year");

  const previousButton =
    document.getElementById("prev-month");

  const nextButton =
    document.getElementById("next-month");

  if (
    !calendar ||
    !monthYear ||
    !previousButton ||
    !nextButton
  ) {
    return;
  }

  let current = new Date();
  let rawEvents = [];

  const toISODate = (date) =>
    date.toISOString().slice(0, 10);

  const toDate = (iso) =>
    new Date(`${iso}T00:00:00`);

  const stripTime = (date) =>
    new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );

  const daysOfWeek = [
    "SU",
    "MO",
    "TU",
    "WE",
    "TH",
    "FR",
    "SA",
  ];

  function expandEventsForView(
    events,
    viewStart,
    viewEnd
  ) {
    const output = [];

    for (const event of events) {
      if (event.date) {
        const date =
          toDate(event.date);

        if (
          date >= viewStart &&
          date <= viewEnd
        ) {
          output.push({
            ...event,
            date: toISODate(date),
          });
        }

        continue;
      }

      const recurrence =
        event.recurrence;

      if (!recurrence) continue;

      const start =
        recurrence.start
          ? toDate(
              recurrence.start
            )
          : viewStart;

      const end =
        recurrence.end
          ? toDate(
              recurrence.end
            )
          : viewEnd;

      const excluded =
        new Set(
          recurrence.exclude || []
        );

      const frequency =
        recurrence.freq ||
        "WEEKLY";

      const interval =
        Math.max(
          1,
          recurrence.interval || 1
        );

      if (
        frequency !== "WEEKLY"
      ) {
        continue;
      }

      const desiredDays = (
        recurrence.byDay &&
        recurrence.byDay.length
          ? recurrence.byDay
          : ["MO"]
      ).map((code) =>
        daysOfWeek.indexOf(code)
      );

      let cursor = new Date(
        Math.max(
          stripTime(viewStart)
            .getTime(),
          stripTime(start)
            .getTime()
        )
      );

      const limit = new Date(
        Math.min(
          stripTime(viewEnd)
            .getTime(),
          stripTime(end)
            .getTime()
        )
      );

      const weekIndex = (date) =>
        Math.floor(
          (
            stripTime(date) -
            new Date(
              1970,
              0,
              4
            )
          ) /
            (
              7 *
              24 *
              60 *
              60 *
              1000
            )
        );

      const baseWeek =
        weekIndex(start);

      while (
        cursor <= limit
      ) {
        const week =
          weekIndex(cursor);

        const onInterval =
          (week - baseWeek) %
            interval ===
          0;

        if (
          onInterval &&
          desiredDays.includes(
            cursor.getDay()
          )
        ) {
          const iso =
            toISODate(cursor);

          if (
            !excluded.has(iso)
          ) {
            output.push({
              ...event,
              date: iso,
            });
          }
        }

        cursor.setDate(
          cursor.getDate() + 1
        );
      }
    }

    return output;
  }

  function indexEventsByDate(
    events
  ) {
    const map = new Map();

    for (
      const event of events
    ) {
      if (
        !map.has(event.date)
      ) {
        map.set(
          event.date,
          []
        );
      }

      map
        .get(event.date)
        .push(event);
    }

    return map;
  }

  function renderCalendar(
    date
  ) {
    const year =
      date.getFullYear();

    const month =
      date.getMonth();

    const firstDay =
      new Date(
        year,
        month,
        1
      ).getDay();

    const daysInMonth =
      new Date(
        year,
        month + 1,
        0
      ).getDate();

    const viewStart =
      new Date(
        year,
        month,
        1
      );

    const viewEnd =
      new Date(
        year,
        month,
        daysInMonth
      );

    const expandedEvents =
      expandEventsForView(
        rawEvents,
        viewStart,
        viewEnd
      );

    const eventsByDate =
      indexEventsByDate(
        expandedEvents
      );

    monthYear.textContent =
      `${date.toLocaleString(
        "default",
        {
          month: "long",
        }
      )} ${year}`;

    calendar.innerHTML = `
      <div class="calendar-header">Sun</div>
      <div class="calendar-header">Mon</div>
      <div class="calendar-header">Tue</div>
      <div class="calendar-header">Wed</div>
      <div class="calendar-header">Thu</div>
      <div class="calendar-header">Fri</div>
      <div class="calendar-header">Sat</div>
    `;

    for (
      let index = 0;
      index < firstDay;
      index += 1
    ) {
      calendar.insertAdjacentHTML(
        "beforeend",
        '<div class="calendar-day empty"></div>'
      );
    }

    for (
      let day = 1;
      day <= daysInMonth;
      day += 1
    ) {
      const fullDate =
        `${year}-` +
        `${String(
          month + 1
        ).padStart(2, "0")}-` +
        `${String(day).padStart(
          2,
          "0"
        )}`;

      const dayEvents =
        eventsByDate.get(
          fullDate
        ) || [];

      const content =
        dayEvents
          .map(
            (event) => `
              <p class="event-text">${event.text}</p>
              ${
                event.time
                  ? `<p class="event-time">${event.time}</p>`
                  : ""
              }
            `
          )
          .join("");

      calendar.insertAdjacentHTML(
        "beforeend",
        `
          <div class="calendar-day">
            <strong>${day}</strong>
            ${content}
          </div>
        `
      );
    }
  }

  fetch(
    "assets/data/calendarEvents.json"
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Calendar data request failed: ${response.status}`
        );
      }

      return response.json();
    })
    .then((data) => {
      rawEvents =
        Array.isArray(data)
          ? data
          : [];

      renderCalendar(current);
    })
    .catch((error) => {
      console.error(
        "Could not load calendar events:",
        error
      );

      monthYear.textContent =
        "Calendar unavailable";
    });

  previousButton.addEventListener(
    "click",
    () => {
      current.setMonth(
        current.getMonth() - 1
      );

      renderCalendar(current);
    }
  );

  nextButton.addEventListener(
    "click",
    () => {
      current.setMonth(
        current.getMonth() + 1
      );

      renderCalendar(current);
    }
  );
}