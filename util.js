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
  console.log("m2");
  return "https://victorduco.github.io/portfolio24/";
}
