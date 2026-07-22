export class Carousel {
  constructor(element, interval = 3000) {
    if (!element) return;

    this.container = element;
    this.track = element.querySelector(".carousel-track");
    this.slides = Array.from(element.querySelectorAll(".carousel-slide"));
    this.indicators = element.querySelector(".carousel-indicators");

    this.currentIndex = 0;
    this.slidesPerView = 3;
    this.totalSlides = Math.max(1, Math.ceil(this.slides.length / this.slidesPerView));
    this.interval = interval;
    this.autoPlayTimer = null;

    this.createIndicators();
    this.setupEventListeners();
    this.startAutoPlay();
    this.updateCarousel();
  }

  createIndicators() {
    if (!this.indicators) return;

    for (let index = 0; index < this.totalSlides; index += 1) {
      const button = document.createElement("button");
      button.classList.add("indicator");
      if (index === 0) button.classList.add("active");

      button.addEventListener("click", () => {
        this.goToSlide(index);
      });

      this.indicators.appendChild(button);
    }
  }

  setupEventListeners() {
    const prevButton = this.container.querySelector(".prev");
    const nextButton = this.container.querySelector(".next");

    prevButton?.addEventListener("click", (event) => {
      event.preventDefault();
      this.prevSlide();
    });

    nextButton?.addEventListener("click", (event) => {
      event.preventDefault();
      this.nextSlide();
    });

    this.container.addEventListener("mouseenter", () => {
      this.stopAutoPlay();
    });

    this.container.addEventListener("mouseleave", () => {
      this.startAutoPlay();
    });

    document.addEventListener("keydown", (event) => {
      if (this.container.matches(":hover")) {
        if (event.key === "ArrowLeft") {
          this.prevSlide();
        } else if (event.key === "ArrowRight") {
          this.nextSlide();
        }
      }
    });
  }

  updateCarousel() {
    if (!this.track) return;

    const offset = -this.currentIndex * (100 / this.slidesPerView) * this.slidesPerView;
    this.track.style.transform = `translateX(${offset}%)`;

    if (!this.indicators) return;

    Array.from(this.indicators.children).forEach((indicator, index) => {
      indicator.classList.toggle("active", index === this.currentIndex);
    });
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.totalSlides;
    this.updateCarousel();
    this.resetAutoPlay();
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
    this.updateCarousel();
    this.resetAutoPlay();
  }

  goToSlide(index) {
    if (index !== this.currentIndex) {
      this.currentIndex = index;
      this.updateCarousel();
      this.resetAutoPlay();
    }
  }

  startAutoPlay() {
    if (this.autoPlayTimer) {
      clearInterval(this.autoPlayTimer);
    }

    this.autoPlayTimer = setInterval(() => {
      this.nextSlide();
    }, this.interval);
  }

  stopAutoPlay() {
    if (this.autoPlayTimer) {
      clearInterval(this.autoPlayTimer);
      this.autoPlayTimer = null;
    }
  }

  resetAutoPlay() {
    this.stopAutoPlay();
    this.startAutoPlay();
  }
}

export function setupTouchNavigation(carousel) {
  let touchStartX = 0;
  let touchEndX = 0;

  carousel.container.addEventListener(
    "touchstart",
    (event) => {
      touchStartX = event.changedTouches[0].screenX;
    },
    { passive: true }
  );

  carousel.container.addEventListener(
    "touchend",
    (event) => {
      touchEndX = event.changedTouches[0].screenX;
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          carousel.nextSlide();
        } else {
          carousel.prevSlide();
        }
      }
    },
    { passive: true }
  );
}

export function initializeCarousels() {
  const carouselConfigs = [
    { selector: "#imageCarousel", interval: 3000 },
    { selector: "#videoCarousel", interval: 5000 },
  ];

  carouselConfigs.forEach(({ selector, interval }) => {
    const element = document.querySelector(selector);
    if (element) {
      const carousel = new Carousel(element, interval);
      setupTouchNavigation(carousel);
    }
  });
}
