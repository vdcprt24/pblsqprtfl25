import { hexToRgb, rgbToHex, interpolateColor } from "./util.js";

export function changeBackgroundOnScroll() {
  const screenHeight = window.innerHeight;
  let lastKnownScrollPosition = 0;
  let ticking = false;

  const colorMap = [
    { end: 0.8 * screenHeight, color: "#FFFFFF" },
    {
      start: 0.8 * screenHeight,
      end: 1.0 * screenHeight,
      startColor: "#FFFFFF",
      endColor: "#000000",
    },
    { start: 1.0 * screenHeight, end: 2.5 * screenHeight, color: "#000000" },
    {
      start: 2.5 * screenHeight,
      end: 2.7 * screenHeight,
      startColor: "#000000",
      endColor: "#2B2E35",
    },
    { start: 2.7 * screenHeight, color: "#2B2E35" },
  ];

  function handleScroll(scrollPosition) {
    let appliedColor = null;

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

    setElementTransition(scrollPosition, "part-2", 0, 1, 1.0, 1.1);
    setElementTransition(scrollPosition, "part-3", 0, 1, 1.2, 1.3);
    setElementTransition(scrollPosition, "second-section", 1, 0, 1.6, 1.7);
    setElementTransition(scrollPosition, "third-section", 0, 1, 1.6, 1.8);
    setElementTransition(scrollPosition, "p1-container", 0, 1, 2.7, 2.9);
  }

  function setElementTransition(
    scrollPosition,
    elementId,
    startValue,
    endValue,
    startCoefficient,
    endCoefficient,
  ) {
    const element = document.getElementById(elementId);

    if (!element) {
      console.error(Element with ID "${elementId}" not found.);
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

  function onScroll() {
    lastKnownScrollPosition = window.scrollY;

    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleScroll(lastKnownScrollPosition);
        ticking = false;
      });

      ticking = true;
    }
  }

  window.addEventListener("scroll", onScroll);
}
