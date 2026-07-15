// theme.js
window.addEventListener("DOMContentLoaded", () => {
  const themeLink = document.getElementById("theme-stylesheet");
  const toggleBtn = document.getElementById("toggle-theme");
  if (!themeLink) return;

  const THEMES = {
    light: "assets/css/style.css",
    dark:  "assets/css/darkmode.css",
  };

  const applyTheme = (theme) => {
    const href = THEMES[theme] || THEMES.light;
    themeLink.setAttribute("href", href);
    localStorage.setItem("theme", theme);
    if (toggleBtn) toggleBtn.textContent = theme === "dark" ? "Light Mode" : "Dark Mode";
    // Optional: expose theme for CSS (if you use variables)
    document.documentElement.setAttribute("data-theme", theme);
    // Optional: better a11y state for toggle
    if (toggleBtn) toggleBtn.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
  };

  // Decide initial theme
  const saved = localStorage.getItem("theme");                  // "dark" | "light" | null
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  const defaultTheme =
    // If you want to force a default via HTML: <link ... data-default="dark">
    themeLink.dataset.default ||
    (prefersDark ? "dark" : "light");

  // If saved exists, use it; otherwise use defaultTheme
  applyTheme(saved || defaultTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const current = localStorage.getItem("theme") || defaultTheme;
      applyTheme(current === "dark" ? "light" : "dark");
    });
  }
});
