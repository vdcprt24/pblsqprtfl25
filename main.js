import { initVideoAnimation } from "./scene-init.js";
import { setupScrollIndicator } from "./util.js";
import { initLenis } from "./lenis-init.js";
import { setupHeroScroll } from "./hero.js";
import { calculateColors } from "./hero-util.js";
import { removeStyles } from "./reset-square.js";

window.onload = function () {
  window.scrollTo(0, 0);
  // initVideoAnimation();
  // setupHeroScroll();
  // calculateColors();
  // setupScrollIndicator();

  // initLenis();
};

// window.addEventListener("resize", initVideoAnimation);

document.addEventListener("DOMContentLoaded", function () {
  removeStyles();
  document.body.classList.add("visible-body");
});
