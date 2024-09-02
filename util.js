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
  // Получаем все теги <script> на странице
  var scripts = document.getElementsByTagName("script");

  // Последний скрипт в массиве — это тот, который выполняется
  var currentScript = scripts[scripts.length - 1];

  // Получаем полный URL текущего скрипта
  var scriptURL = currentScript.src;

  // Извлекаем путь к папке, где находится скрипт
  var scriptPath = scriptURL.substring(0, scriptURL.lastIndexOf("/"));
  console.log(scriptPath);

  // Добавляем / в конце и возвращаем
  return scriptPath + "/";
}
