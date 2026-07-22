"use strict";

import { copyBibTeX, toggleDarkMode, handleScroll, scrollToTop } from "./ui.js";
import { loadPageComponents } from "./components.js";
import { initializeCarousels } from "./carousels.js";

window.copyBibTeX = copyBibTeX;
window.toggleDarkMode = toggleDarkMode;
window.scrollToTop = scrollToTop;

async function initializePage() {
  await loadPageComponents();
  initializeCarousels();
}

window.addEventListener("scroll", handleScroll);

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    handleScroll();
    initializePage();
  }, { once: true });
} else {
  handleScroll();
  initializePage();
}