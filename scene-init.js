import { getScriptBaseUrl } from "./util.js";
import { preloadImages } from "./image-preload.js";

const MIN_SCREEN_WIDTH = 1050; // Минимальный размер экрана
let masterTimeline; // Переменная для хранения таймлайна

export function initVideoAnimation() {
  if (window.innerWidth >= MIN_SCREEN_WIDTH) {
    gsap.registerPlugin(ScrollTrigger);
    let loadedImages;
    loadedImages = preloadImages();
    setupVideoAnimation(loadedImages);
  } else {
    // Если ширина экрана меньше минимального размера, не инициализируем анимацию
    document.querySelector("#p1-background").style.opacity = 1;
    document.querySelector("#part1").style.opacity = 1;
    document.querySelector("#part2").style.opacity = 1;
    document.querySelector("#tags").style.opacity = 1;
    document.querySelector("#cta-button").style.opacity = 1;
    if (masterTimeline) {
      masterTimeline.kill(); // Убиваем таймлайн
    }
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }
}

export function setupVideoAnimation(loadedImages) {
  const startFrame = 250;
  const endFrame = 507;
  const animationEndFrame = 600;
  const frameCount = endFrame - startFrame + 1;
  const animationFrameCount = animationEndFrame - startFrame + 1;
  const imageElement = document.getElementById("image-sequence");

  function updateImageSequence(progress) {
    // Рассчитываем текущий кадр на основе прогресса
    let frameIndex =
      Math.floor(progress * (animationFrameCount - 1)) + startFrame;

    // Если рассчитанный кадр больше реального последнего кадра, отображаем последний реальный кадр
    if (frameIndex > endFrame) {
      frameIndex = endFrame;
    }

    // Используем предзагруженные изображения из массива loadedImages
    imageElement.src = loadedImages[frameIndex - startFrame].src;
  }

  // Создаем единый таймлайн для смены кадров и появления текста
  masterTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: "#p1-container",
      start: "top top",
      end: "bottom+=200vh",
      scrub: true,
      pin: true,
      // markers: true,
      onUpdate: (self) => {
        updateImageSequence(self.progress);
        const scrollIndicator = document.getElementById("scroll-indicator");
        if (scrollIndicator) {
          scrollIndicator.innerText = `Scroll Position: ${self.progress.toFixed(2)}`;
        }
      },
    },
  });

  // Анимация смены кадров
  masterTimeline.to(
    {},
    {
      duration: 1, // продолжительность анимации кадров (в пределах таймлайна)
      ease: "none",
    },
  );

  // Анимация появления текстовых блоков в конце видео-анимации
  masterTimeline
    .to(
      "#p1-background",
      { opacity: 1, duration: 0.3, ease: "power1.inOut" },
      "0.1",
    )
    .to("#part1", { opacity: 1, duration: 0.1, ease: "power1.inOut" }, "0.5")
    .to("#part2", { opacity: 1, duration: 0.1, ease: "power1.inOut" }, "0.6")
    .to("#tags", { opacity: 1, duration: 0.1, ease: "power1.inOut" }, "0.8")
    .to(
      "#cta-button",
      { opacity: 1, duration: 0.1, ease: "power1.inOut" },
      "0.8",
    );
}
