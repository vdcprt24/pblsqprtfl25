#!/bin/bash

input_folder="../../_exr_after"
output_folder="../frames_1"


# Проходим по всем файлам .png в папке input_folder
for file in "$input_folder"/*.png; do
  # Извлекаем имя файла без пути и расширения
  filename=$(basename "$file" .png)

  # Конвертируем файл в формат WebP и сохраняем в output_folder с новым именем
  ffmpeg -i "$file" -c:v libwebp "$output_folder/${filename}.webp"
done
