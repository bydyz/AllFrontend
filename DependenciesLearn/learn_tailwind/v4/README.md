# npm create vite



## 集成 tailwind    https://www.yuque.com/u51716160/gn8srq/wdy324vq415hhl2o

1. npm install -D tailwindcss postcss autoprefixer
2. tailwind.config.js
  ```javascript
  export default {
    content: [
      "./index.html",
      "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  }
  ```
3. postcss.config.js
  ```javascript
  export default {
    plugins: {
      // 旧版错误写法 ❌（直接使用 tailwindcss）
      // tailwindcss: {}, 

      // 新版正确写法 ✅
      "@tailwindcss/postcss": {
        // 可选的 Tailwind 配置
        config: "./tailwind.config.js", // 指定配置文件（默认会自动查找）
      },
      autoprefixer: {}, // 自动添加浏览器前缀
    },
  };


  // 用新版本的tailwindcss，但是用旧版本的写法会报以下错误
  [postcss] It looks like you're trying to use `tailwindcss` directly as a PostCSS plugin. The PostCSS plugin has moved to a separate package, so to continue using Tailwind CSS with PostCSS you'll need to install `@tailwindcss/postcss` and update your PostCSS configuration.

  // 注意：Vite 会自动读取 postcss.config.js，无需额外配置
  ```



## 搜集 tailwind 相关语法  其中未涉及的css 放到 LearnCSS 中  