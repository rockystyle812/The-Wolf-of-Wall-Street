import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Статический экспорт для GitHub Pages — генерирует папку out/ с HTML/CSS/JS
  output: "export",

  // basePath = название репозитория на GitHub (для URL вида username.github.io/The-Wolf-of-Wall-Street)
  // Если сайт на кастомном домене или username.github.io — уберите basePath
  basePath: "/The-Wolf-of-Wall-Street",

  // Отключаем trailingSlash для чистых URL
  trailingSlash: true,

  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,

  // Для статического экспорта нужно отключить оптимизацию изображений (она требует сервер)
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
