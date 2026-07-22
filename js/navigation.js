export function initializeNavigation() {
  const nav = document.querySelector(".nav");
  if (!nav) return;

  const links = Array.from(nav.querySelectorAll(".nav-link"));
  links.forEach((link) => link.classList.remove("active"));

  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  const currentHash = window.location.hash.toLowerCase();

  const activeLink = links.find((link) => {
    const href = (link.getAttribute("href") || "").toLowerCase();

    if (currentPath.toLowerCase().includes("other-versions")) {
      return href.includes("other-versions");
    }

    if (currentHash.includes("presenters")) {
      return href.includes("presenters");
    }

    return href.includes("abstract-section") || href.includes("index.html");
  });

  if (activeLink) {
    activeLink.classList.add("active");
  }
}
