import { hexToRgb, rgbToHex, interpolateColor } from "./util.js";

function defineColorMap() {
  const screenHeight = window.innerHeight;

  const colorMap = [
    { end: 1.1 * screenHeight, color: "#FFFFFF" },
    {
      start: 1.2 * screenHeight,
      end: 1.6 * screenHeight,
      startColor: "#FFFFFF",
      endColor: "#000000",
    },
    // { start: 1.5 * screenHeight, end: 3 * screenHeight, color: "#000000" },
    // {
    //   start: 3 * screenHeight,
    //   end: 3.2 * screenHeight,
    //   startColor: "#000000",
    //   endColor: "#2B2E35",
    // },
    // { start: 3.2 * screenHeight, color: "#2B2E35" },
    { start: 1.5 * screenHeight, color: "#000000" },
  ];
  return colorMap;
}

export function changeBackgroundOnScroll(scrollPosition) {
  let appliedColor = null;
  const colorMap = defineColorMap();

  for (let i = 0; i < colorMap.length; i++) {
    const entry = colorMap[i];

    if (entry.end && scrollPosition <= entry.end) {
      if (entry.start !== undefined && scrollPosition >= entry.start) {
        if (entry.startColor && entry.endColor) {
          const progress =
            (scrollPosition - entry.start) / (entry.end - entry.start);
          const startColorRGB = hexToRgb(entry.startColor);
          const endColorRGB = hexToRgb(entry.endColor);
          const colorValue = interpolateColor(
            progress,
            startColorRGB,
            endColorRGB,
          );
          appliedColor = rgbToHex(colorValue.r, colorValue.g, colorValue.b);
        }
      } else if (entry.color) {
        appliedColor = entry.color;
      }
      break;
    }
  }

  if (appliedColor) {
    document.body.style.backgroundColor = appliedColor;
  }
}

export function setElementTransition(
  scrollPosition,
  elementId,
  startValue,
  endValue,
  startCoefficient,
  endCoefficient,
) {
  const screenHeight = window.innerHeight;
  const element = document.getElementById(elementId);

  if (!element) {
    console.error(`Element with ID "${elementId}" not found.`);
    return;
  }

  const start = screenHeight * startCoefficient;
  const end = screenHeight * endCoefficient;

  if (scrollPosition >= start && scrollPosition <= end) {
    const progress = (scrollPosition - start) / (end - start);
    const currentValue = startValue + progress * (endValue - startValue);
    element.style.opacity = currentValue.toString();
  } else {
    const finalValue = scrollPosition < start ? startValue : endValue;
    element.style.opacity = finalValue.toString();
  }
}

export function applyParallaxEffect(
  scrollPosition,
  elementId,
  parallaxSpeed,
  startCoefficient,
) {
  const screenHeight = window.innerHeight;
  const element = document.getElementById(elementId);

  if (!element) {
    console.error(`Element with ID "${elementId}" not found.`);
    return;
  }

  const start = screenHeight * startCoefficient;

  // Проверяем, началась ли прокрутка для параллакса
  if (scrollPosition >= start) {
    // Рассчитываем смещение для параллакса
    const offset = (scrollPosition - start) * parallaxSpeed;

    // Применяем смещение к элементу
    element.style.transform = `translateY(${offset}px)`;
  } else {
    // Если прокрутка до начала параллакса, сбрасываем смещение
    element.style.transform = `translateY(0px)`;
  }
}
