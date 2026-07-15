const servers = document.querySelectorAll(".server-column");
const desktopBreakpoint = 1100;

servers.forEach((server) => {
  const header = server.querySelector(".server-column-header");

  if (window.innerWidth < desktopBreakpoint) {
    server.classList.remove("open");
  }

  header.addEventListener("click", () => {
    server.classList.toggle("open");
  });
});