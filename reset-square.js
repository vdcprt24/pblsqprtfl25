export function removeStyles() {
  // Найдем элемент с id="all-content"
  const allContent = document.querySelector("#all-content");

  if (allContent) {
    // Удаляем всё содержимое body
    document.body.innerHTML = "";

    // Удаляем id и class у body
    document.body.removeAttribute("id");
    document.body.removeAttribute("class");

    // Перемещаем элемент с id="all-content" в корень body
    document.body.appendChild(allContent);
  } else {
    console.error("Element with id 'all-content' not found.");
  }
}
