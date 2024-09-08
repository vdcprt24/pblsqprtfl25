export function removeStyles() {
  const heroSection = document.querySelector("#hero-section");

  // Проходим по всем элементам на странице
  let elements = document.body.querySelectorAll("*");

  for (let i = 0; i < elements.length; i++) {
    let element = elements[i];

    if (element === heroSection) {
      // Как только дойдем до #hero-section, выводим 'meow' и прекращаем выполнение
      break; // Прекращаем выполнение цикла
    }

    // Логируем элемент для отладки и удаляем классы и стили
    element.removeAttribute("class");
    element.removeAttribute("style");
  }
}
