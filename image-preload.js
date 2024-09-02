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
  let start = 1000;
  let end = 1507;
  let imageUrls = [];
  for (let i = start; i <= end; i++) {
    imageUrls.push(`${url}${folder}/p${i}.webp`);
  }
  return imageUrls;
}

// Пример использования
