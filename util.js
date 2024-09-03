export function setupScrollIndicator() {
  const scrollIndicator = document.createElement("div");
  scrollIndicator.id = "scroll-indicator";
  scrollIndicator.style.position = "fixed";
  scrollIndicator.style.top = "10px";
  scrollIndicator.style.left = "10px";
  scrollIndicator.style.backgroundColor = "rgba(255, 0, 0, 0.5)";
  scrollIndicator.style.padding = "5px 10px";
  scrollIndicator.style.color = "white";
  scrollIndicator.style.fontSize = "16px";
  scrollIndicator.style.zIndex = "1000";
  document.body.appendChild(scrollIndicator);
}

export function getScriptBaseUrl() {
  if (window.location.hostname.includes("localhost")) {
    return "";
  }
  return "https://victorduco.github.io/portfolio24/";
}

export function hexToRgb(hex) {
  const bigint = parseInt(hex.slice(1), 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
}

export function rgbToHex(r, g, b) {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
}

export function interpolateColor(progress, startColorRGB, endColorRGB) {
  return {
    r: Math.round(
      startColorRGB.r - progress * (startColorRGB.r - endColorRGB.r),
    ),
    g: Math.round(
      startColorRGB.g - progress * (startColorRGB.g - endColorRGB.g),
    ),
    b: Math.round(
      startColorRGB.b - progress * (startColorRGB.b - endColorRGB.b),
    ),
  };
}
