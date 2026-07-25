/** @type {import('tailwindcss').Config} */
export default {
  // 配置内容扫描路径，确保 Tailwind 能扫描到所有使用了类名的文件
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    // 扩展默认主题配置
    extend: {
      // 自定义颜色
      colors: {
        'primary': '#3490dc',
        'secondary': '#ffed4a',
        'danger': '#e3342f',
      },
      // 自定义间距
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      // 自定义字体大小
      fontSize: {
        'display': ['5rem', { lineHeight: '1.1' }],
      },
    },
  },
  // 启用的插件
  plugins: [],
}
