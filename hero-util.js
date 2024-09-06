import { hexToRgb, rgbToHex, interpolateColor } from "./util.js";

// Массив для хранения всех рассчитанных цветов
let colorMapCache = [];
let lastAppliedColor = null;

function defineColorMap() {
  const screenHeight = window.innerHeight;
  let p1StartPostion = 3.2;

  if (window.innerWidth <= 576) {
    p1StartPostion = 2.5;
  }

  const colorMap = [
    { start: 0, end: 1.1 * screenHeight, color: "#FFFFFF" },
    {
      start: 1.1 * screenHeight,
      end: 1.6 * screenHeight,
      startColor: "#FFFFFF",
      endColor: "#000000",
    },
    {
      start: 1.6 * screenHeight,
      end: p1StartPostion * screenHeight,
      color: "#000000",
    },
    {
      start: p1StartPostion * screenHeight,
      end: (p1StartPostion + 0.2) * screenHeight,
      startColor: "#000000",
      endColor: "#FFFFFF",
    },
    {
      start: (p1StartPostion + 0.2) * screenHeight,
      end: Infinity,
      color: "#FFFFFF",
    },
  ];

  return colorMap;
}

// Предвычисляем все цвета для позиций прокрутки
export function calculateColors() {
  const screenHeight = window.innerHeight;
  const colorMap = defineColorMap();

  for (let i = 0; i <= screenHeight * 4; i++) {
    let appliedColor = null;

    // Находим соответствующий диапазон
    const entry = colorMap.find(({ start, end }) => i >= start && i <= end);

    if (entry) {
      if (entry.startColor && entry.endColor) {
        const progress = (i - entry.start) / (entry.end - entry.start);
        const startColorRGB = hexToRgb(entry.startColor);
        const endColorRGB = hexToRgb(entry.endColor);
        const colorValue = interpolateColor(
          progress,
          startColorRGB,
          endColorRGB,
        );
        appliedColor = rgbToHex(colorValue.r, colorValue.g, colorValue.b);
      } else if (entry.color) {
        appliedColor = entry.color;
      }
    }

    // Добавляем рассчитанный цвет в кэш
    colorMapCache[i] = appliedColor;
  }
}

// Функция для смены фона при прокрутке
export function changeBackgroundOnScroll(scrollPosition) {
  const screenHeight = window.innerHeight;

  // Ограничение позиции скролла в пределах предвычисленных значений
  let adjustedPosition = Math.min(scrollPosition, screenHeight * 4);

  adjustedPosition = Math.round(adjustedPosition);

  const appliedColor = colorMapCache[adjustedPosition];

  // Проверяем, изменился ли цвет, и только тогда обновляем фон
  if (appliedColor && appliedColor !== lastAppliedColor) {
    requestAnimationFrame(() => {
      document.body.style.backgroundColor = appliedColor;
    });
    lastAppliedColor = appliedColor;
  }
}

// Вызываем функцию для предвычисления цветов при загрузке страницы
window.addEventListener("load", () => {
  calculateColors();
});

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
    return;
  }

  const start = screenHeight * startCoefficient;

  if (scrollPosition >= start) {
    const offset = (scrollPosition - start) * parallaxSpeed;
    element.style.transform = `translateY(${offset}px)`;
  } else {
    element.style.transform = `translateY(0px)`;
  }
}
