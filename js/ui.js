export function copyBibTeX() {
  const bibTexElement = document.querySelector(".bibtex-section pre code");
  if (!bibTexElement) return;

  const bibTexText = bibTexElement.innerText.trim();

  if (!navigator.clipboard?.writeText) {
    alert("Clipboard access is not available in this browser.");
    return;
  }

  navigator.clipboard
    .writeText(bibTexText)
    .then(() => {
      alert("BibTeX citation copied to clipboard!");
    })
    .catch((error) => {
      console.error("Failed to copy BibTeX citation:", error);
      alert("Unable to copy BibTeX citation.");
    });
}

export function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  document.querySelector(".nav")?.classList.toggle("dark-mode");
}

export function handleScroll() {
  const scrollUpBtn = document.getElementById("scrollUpBtn");
  if (!scrollUpBtn) return;

  const shouldShow =
    document.body.scrollTop > 100 || document.documentElement.scrollTop > 100;

  scrollUpBtn.style.display = shouldShow ? "block" : "none";
}

export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
