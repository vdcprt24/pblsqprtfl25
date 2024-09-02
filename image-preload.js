export function preloadImages(imageUrls) {
  let loadedImages = [];
  for (let i = 0; i < imageUrls.length; i++) {
    let img = new Image();
    img.src = imageUrls[i];
    loadedImages.push(img);
  }
  return loadedImages;
}

// Генерация списка изображений
function generateImageUrls(folder, start, end) {
  let imageUrls = [];
  for (let i = start; i <= end; i++) {
    imageUrls.push(`${folder}/p${i}.webp`);
  }
  return imageUrls;
}

// Пример использования
let imagesToPreload = generateImageUrls("frames_1", 1000, 1507);

window.onload = function () {
  preloadImages(imagesToPreload);
};
