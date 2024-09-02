import { setupVideoAnimation } from "./scene-init.js";
import { setupScrollIndicator } from "./util.js";
import { setupScrollIndicator } from "./util.js";
import { preloadImages } from "./image-preload.js";
import { initLenis } from "./lenis-init.js";

gsap.registerPlugin(ScrollTrigger);

window.onload = function () {
  window.scrollTo(0, 0);
  preloadImages();

  setupVideoAnimation();
  setupScrollIndicator();

  // Инициализация Lenis для плавной прокрутки
  // initLenis();
};
