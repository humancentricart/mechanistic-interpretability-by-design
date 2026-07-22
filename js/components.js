function resolvePath(path) {
  const isNested = window.location.pathname.includes("/iswc/") || window.location.pathname.includes("/ekaw/");
  return isNested ? `../${path}` : path;
}

function getHeaderPath() {
  const pathname = window.location.pathname.toLowerCase();
  if (pathname.includes("/iswc/")) return resolvePath("components/header-iswc.html");
  if (pathname.includes("/ekaw/")) return resolvePath("components/header-ekaw.html");
  return resolvePath("components/header-main.html");
}

const COMPONENTS = [
  { id: "nav-component", path: resolvePath("components/nav.html") },
  { id: "header-component", path: getHeaderPath() },
  { id: "links-component", path: resolvePath("components/links.html") },
  { id: "abstract-section", path: resolvePath("components/abstract-section.html") },
  { id: "content-section", path: resolvePath("components/content-section.html") },
  { id: "program-section", path: resolvePath("components/program-section.html") },
  { id: "presenters-section", path: resolvePath("components/presenters-section.html") },
  { id: "footer-component", path: resolvePath("components/footer.html") },
];

const PAGE_COMPONENTS = [
  { id: "presenters-full-component", path: resolvePath("components/presenters-full.html") },
];

function isExternalLink(value) {
  return /^(https?:|mailto:|tel:|data:|#|\?|\/)/i.test(value);
}

function rewriteRelativePaths(html) {
  const isNested = window.location.pathname.includes("/iswc/") || window.location.pathname.includes("/ekaw/");

  if (!isNested) {
    return html;
  }

  return html.replace(/(src|href)=["']([^"']+)["']/g, (match, attribute, value) => {
    if (isExternalLink(value)) {
      return match;
    }

    if (value.startsWith("./") || value.startsWith("../")) {
      return match;
    }

    return `${attribute}="../${value}"`;
  });
}

export async function loadComponent({ id, path }) {
  const container = document.getElementById(id);
  if (!container) return;

  try {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`Failed to load ${path}: ${response.status}`);
    }

    container.innerHTML = rewriteRelativePaths(await response.text());
  } catch (error) {
    console.error(error);
    container.innerHTML = `<p>Unable to load ${path}</p>`;
  }
}

export async function loadPageComponents() {
  await Promise.all(COMPONENTS.map(loadComponent));
  await Promise.all(PAGE_COMPONENTS.map(loadComponent));
}
