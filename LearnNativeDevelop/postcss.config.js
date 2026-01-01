// postcss.config.js
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