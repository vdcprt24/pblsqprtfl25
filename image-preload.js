import { getScriptBaseUrl } from "./util.js";

export function preloadImages() {
  let imageUrls = generateImageUrls();
  let loadedImages = [];
  for (let i = 0; i < imageUrls.length; i++) {
    let img = new Image();
    img.src = imageUrls[i];
    loadedImages.push(img);
  }
  return loadedImages;
}

// Генерация списка изображений
function generateImageUrls() {
  let url = getScriptBaseUrl();
  let folder = "frames_1";
  let start = 1001;
  let end = 1430;
  let imageUrls = [];

  for (let i = start; i <= end; i++) {
    let paddedNumber = i.toString().padStart(4, "0"); // Добавление нулей, если номер короче 4 цифр
    imageUrls.push(`${url}${folder}/p${paddedNumber}.webp`);
  }
  return imageUrls;
}

// Пример использования
