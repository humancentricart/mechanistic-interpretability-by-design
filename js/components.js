const COMPONENTS = [
  { id: "nav-component", path: "components/nav.html" },
  { id: "header-component", path: "components/header.html" },
  { id: "links-component", path: "components/links.html" },
  { id: "abstract-section", path: "components/abstract-section.html" },
  { id: "content-section", path: "components/content-section.html" },
  { id: "program-section", path: "components/program-section.html" },
  { id: "presenters-section", path: "components/presenters-section.html" },
  { id: "footer-component", path: "components/footer.html" },
];

const PAGE_COMPONENTS = [
  { id: "presenters-full-component", path: "components/presenters-full.html" },
];

export async function loadComponent({ id, path }) {
  const container = document.getElementById(id);
  if (!container) return;

  try {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`Failed to load ${path}: ${response.status}`);
    }

    container.innerHTML = await response.text();
  } catch (error) {
    console.error(error);
    container.innerHTML = `<p>Unable to load ${path}</p>`;
  }
}

export async function loadPageComponents() {
  await Promise.all(COMPONENTS.map(loadComponent));
  await Promise.all(PAGE_COMPONENTS.map(loadComponent));
}
