function resolveNavHref(page) {
  const isNested = window.location.pathname.includes("/iswc/") || window.location.pathname.includes("/ekaw/");
  const prefix = isNested ? "../" : "";

  switch (page) {
    case "main":
      return `${prefix}index.html`;
    case "iswc":
      return `${prefix}iswc/index.html`;
    case "ekaw":
      return `${prefix}ekaw/index.html`;
    case "presenters":
      return `${prefix}presenters.html`;
    default:
      return `${prefix}index.html`;
  }
}

export function initializeNavigation() {
  const nav = document.querySelector(".nav");
  if (!nav) return;

  const links = Array.from(nav.querySelectorAll(".nav-link"));
  links.forEach((link) => {
    link.classList.remove("active");
    const page = link.getAttribute("data-nav-page");
    if (page) {
      link.setAttribute("href", resolveNavHref(page));
    }
  });

  const pathname = window.location.pathname.toLowerCase();
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  const activePage = currentPath.toLowerCase().includes("presenters")
    ? "presenters"
    : pathname.includes("/iswc/")
      ? "iswc"
      : pathname.includes("/ekaw/")
        ? "ekaw"
        : "main";

  const activeLink = links.find((link) => link.getAttribute("data-nav-page") === activePage);

  if (activeLink) {
    activeLink.classList.add("active");
  }
}
