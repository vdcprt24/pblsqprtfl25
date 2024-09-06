import {
  changeBackgroundOnScroll,
  setElementTransition,
  applyParallaxEffect,
} from "./hero-util.js";

export function setupHeroScroll() {
  window.addEventListener("scroll", onScroll);
}

function onScroll() {
  let lastKnownScrollPosition = 0;
  let ticking = false;

  // Получаем середину экрана
  const screenHeight = window.innerHeight;
  lastKnownScrollPosition = window.scrollY + screenHeight / 2;

  if (!ticking) {
    window.requestAnimationFrame(() => {
      handleScroll(lastKnownScrollPosition);
      ticking = false;
    });

    ticking = true;
  }
}

function handleScroll(scrollPosition) {
  let p1scrollPosition = scrollPosition * 1.1;
  if (window.innerWidth <= 576) {
    scrollPosition = scrollPosition * 1.1;
    p1scrollPosition = scrollPosition * 2;
  }

  changeBackgroundOnScroll(scrollPosition);
  // applyParallaxEffect(scrollPosition, "block-1", 0.6, 0.5);
  // applyParallaxEffect(scrollPosition, "block-2", 0.2, 0.5);
  // applyParallaxEffect(scrollPosition, "block-3", -0.3, 0.5);
  setElementTransition(scrollPosition, "part-2", 0, 1, 1.4, 1.5);
  setElementTransition(
    scrollPosition,
    "image-sequence-container",
    0,
    1,
    1.4,
    1.5,
  );
  setElementTransition(scrollPosition, "part-3", 0, 1, 1.6, 1.7);
  setElementTransition(scrollPosition, "second-section", 1, 0, 2.1, 2.2);
  setElementTransition(scrollPosition, "third-heading", 0, 1, 2.1, 2.3);
  setElementTransition(scrollPosition, "arrow-icon", 0, 1, 2.3, 2.5);
  applyParallaxEffect(scrollPosition, "arrow-icon", 0.4, 2.3);
  setElementTransition(p1scrollPosition, "p1-container", 0, 1, 3.2, 3.4);
}
