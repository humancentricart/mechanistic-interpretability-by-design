const COMPONENTS = [
  { id: "nav-component", path: "components/nav.html" },
  { id: "header-component", path: "components/header.html" },
  { id: "links-component", path: "components/links.html" },
  { id: "demo-video-component", path: "components/demo-video.html" },
  { id: "abstract-component", path: "components/abstract-section.html" },
  { id: "content-sections-component", path: "components/content-sections.html" },
  { id: "galleries-component", path: "components/galleries.html" },
  { id: "extra-videos-component", path: "components/extra-videos.html" },
  { id: "references-component", path: "components/references.html" },
  { id: "footer-component", path: "components/footer.html" },
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
}
