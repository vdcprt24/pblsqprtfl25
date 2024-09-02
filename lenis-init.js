export function initLenis() {
  const lenis = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
  });

  // Связывание события прокрутки Lenis с обновлением ScrollTrigger
  lenis.on("scroll", ScrollTrigger.update);

  // Добавление рендеринга Lenis в GSAP Ticker
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  // Отключение сглаживания задержек в GSAP для корректной работы с Lenis
  gsap.ticker.lagSmoothing(0);

  // Запуск рендеринга анимации Three.js внутри рендер-цикла Lenis
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
}
