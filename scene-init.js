import { getScriptBaseUrl } from "./util.js";

export function setupVideoAnimation() {
  const startFrame = 250;
  const endFrame = 507; // Реальное количество кадров
  const animationEndFrame = 600; // Кадр, до которого будет тянуться анимация
  const frameCount = endFrame - startFrame + 1;
  const animationFrameCount = animationEndFrame - startFrame + 1;
  const imageElement = document.getElementById("image-sequence");

  function updateImageSequence(progress) {
    // Рассчитываем текущий кадр на основе прогресса
    let url = getScriptBaseUrl();
    let frameIndex =
      Math.floor(progress * (animationFrameCount - 1)) + startFrame;

    // Если рассчитанный кадр больше реального последнего кадра, отображаем последний реальный кадр
    if (frameIndex > endFrame) {
      frameIndex = endFrame;
    }

    const paddedIndex = String(frameIndex).padStart(3, "0");
    imageElement.src = `${url}frames_1/p1${paddedIndex}.webp`;
  }

  // Создаем единый таймлайн для смены кадров и появления текста
  const masterTimeline = gsap.timeline({
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
    .to("#part1", { opacity: 1, duration: 0.1, ease: "power1.inOut" }, "0.7") // Появление заголовка 1 на 90% анимации
    .to("#part2", { opacity: 1, duration: 0.1, ease: "power1.inOut" }, "0.8") // Появление заголовка 2 на 95% анимации
    .to(
      "#cta-button",
      { opacity: 1, duration: 0.1, ease: "power1.inOut" },
      "0.9",
    ) // Появление заголовка 2 на 95% анимации
    .to("#tags", { opacity: 1, duration: 0.1, ease: "power1.inOut" }, "0.9") // Появление заголовка 2 на 95% анимации
    .to(
      "#description",
      { opacity: 1, duration: 0.1, ease: "power1.inOut" },
      "0.9",
    )
    .to("#border", { opacity: 1, duration: 0.1, ease: "power1.inOut" }, "1");
}
