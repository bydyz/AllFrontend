<template>
  <div class="space-y-8">
    <h1 class="text-3xl font-bold text-gray-800">自定义配置 (Custom Config)</h1>

    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">配置文件概述</h2>
      <p class="text-gray-600 mb-4">
        Tailwind CSS 的配置文件 <code class="bg-gray-100 px-1 rounded">tailwind.config.js</code> 
        允许你完全自定义框架的默认主题、插件、内容扫描路径等。
      </p>

      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
        <pre>// tailwind.config.js 完整结构
/** @type {import('tailwindcss').Config} */
export default {
  // 内容扫描路径
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],

  // 主题配置
  theme: {
    // 完全覆盖默认主题
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    colors: {},
    spacing: {},
    fontSize: {},
    // ... 其他配置

    // 扩展默认主题
    extend: {
      colors: {},
      spacing: {},
      fontSize: {},
      // ... 其他扩展
    },
  },

  // 插件
  plugins: [],
}</pre>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">自定义颜色</h2>

      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
        <pre>// 自定义颜色
export default {
  theme: {
    extend: {
      colors: {
        // 简单颜色定义
        'primary': '#3490dc',
        'secondary': '#ffed4a',
        'danger': '#e3342f',

        // 带色调的颜色对象
        'brand': {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },

        // 使用 CSS 颜色函数
        'success': {
          DEFAULT: '#22c55e',
          50: '#f0fdf4',
          500: '#22c55e',
          600: '#16a34a',
        },
      },
    },
  },
}

// 使用
// bg-primary, text-danger, border-brand-500, bg-success</pre>
      </div>

      <!-- 自定义颜色示例 -->
      <div class="flex gap-4 flex-wrap">
        <div class="bg-primary text-white p-4 rounded-lg">bg-primary</div>
        <div class="bg-secondary text-gray-900 p-4 rounded-lg">bg-secondary</div>
        <div class="bg-danger text-white p-4 rounded-lg">bg-danger</div>
        <div class="bg-brand-500 text-white p-4 rounded-lg">bg-brand-500</div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">自定义间距</h2>

      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
        <pre>// 自定义间距
export default {
  theme: {
    extend: {
      spacing: {
        '128': '32rem',
        '144': '36rem',
        '156': '39rem',
        '172': '43rem',
        '192': '48rem',
      },
    },
  },
}

// 使用
// p-128, m-144, w-156</pre>
      </div>

      <!-- 自定义间距示例 -->
      <div class="space-y-2">
        <div class="bg-blue-100 p-128 text-center text-blue-800">
          p-128 (32rem = 512px)
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">自定义字体大小</h2>

      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
        <pre>// 自定义字体大小
export default {
  theme: {
    extend: {
      fontSize: {
        'display': ['5rem', { lineHeight: '1.1' }],
        'hero': ['4rem', { lineHeight: '1.2' }],
        'body': ['1.125rem', { lineHeight: '1.75' }],
      },
    },
  },
}

// 使用
// text-display, text-hero, text-body</pre>
      </div>

      <!-- 自定义字体大小示例 -->
      <div class="space-y-2">
        <div class="text-display font-bold text-indigo-600">text-display (5rem)</div>
        <div class="text-hero font-bold text-purple-600">text-hero (4rem)</div>
        <div class="text-body text-gray-700">text-body (1.125rem)</div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">自定义阴影</h2>

      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
        <pre>// 自定义阴影
export default {
  theme: {
    extend: {
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'glow': '0 0 15px rgba(59, 130, 246, 0.5)',
        'inner-glow': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      },
    },
  },
}

// 使用
// shadow-soft, shadow-glow, shadow-inner-glow</pre>
      </div>

      <!-- 自定义阴影示例 -->
      <div class="flex gap-4">
        <div class="shadow-soft bg-white p-6 rounded-lg">shadow-soft</div>
        <div class="shadow-glow bg-white p-6 rounded-lg">shadow-glow</div>
        <div class="shadow-inner-glow bg-white p-6 rounded-lg">shadow-inner-glow</div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">自定义动画</h2>

      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
        <pre>// 自定义动画
export default {
  theme: {
    extend: {
      animation: {
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(59, 130, 246, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.8)' },
        },
      },
    },
  },
}

// 使用
// animate-wiggle, animate-float, animate-glow</pre>
      </div>

      <!-- 自定义动画示例 -->
      <div class="flex gap-8 items-center justify-center p-8 bg-gray-100 rounded-lg">
        <div class="text-center">
          <div class="w-16 h-16 bg-blue-500 animate-wiggle rounded-lg mb-2"></div>
          <span class="text-sm text-gray-600">animate-wiggle</span>
        </div>
        <div class="text-center">
          <div class="w-16 h-16 bg-green-500 animate-float rounded-lg mb-2"></div>
          <span class="text-sm text-gray-600">animate-float</span>
        </div>
        <div class="text-center">
          <div class="w-16 h-16 bg-purple-500 animate-glow rounded-lg mb-2"></div>
          <span class="text-sm text-gray-600">animate-glow</span>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">自定义断点</h2>

      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
        <pre>// 自定义断点
export default {
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      // 自定义断点
      '3xl': '1920px',
      '4xl': '2560px',
      // 移除断点
      // '2xl': null,
    },
  },
}

// 使用
// hidden 3xl:block</pre>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">插件系统</h2>

      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
        <pre>// 使用插件
import plugin from 'tailwindcss/plugin'

export default {
  plugins: [
    // 官方插件
    // @tailwindcss/forms - 表单样式重置
    // @tailwindcss/typography - 排版样式
    // @tailwindcss/aspect-ratio - 宽高比
    // @tailwindcss/container-query - 容器查询

    // 自定义插件
    plugin(function({ addUtilities, addComponents, e, config }) {
      // 添加工具类
      addUtilities({
        '.text-shadow': {
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
        },
        '.text-shadow-lg': {
          textShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
        },
      })

      // 添加组件
      addComponents({
        '.btn': {
          padding: '.5rem 1rem',
          borderRadius: '.25rem',
          fontWeight: '600',
          transition: 'all 0.2s',
        },
        '.btn-primary': {
          backgroundColor: config('theme.colors.blue.500'),
          color: config('theme.colors.white'),
          '&:hover': {
            backgroundColor: config('theme.colors.blue.600'),
          },
        },
      })
    }),
  ],
}

// 使用
// text-shadow, text-shadow-lg
// btn, btn-primary</pre>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">内容配置</h2>

      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
        <pre>// 内容配置
export default {
  // 指定扫描路径
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],

  // 或者使用对象形式
  content: {
    files: [
      "./index.html",
      "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    extract: {
      // 自定义提取规则
      'my-class': (content) => {
        return content.match(/my-class-\w+/g) || []
      },
    },
  },

  // 安全模式（JIT 引擎）
  safelist: [
    // 明确包含的类
    'text-red-500',
    'bg-blue-500',
    // 动态类
    {
      pattern: /bg-(red|green|blue)-(500|600|700)/,
    },
  ],
}

// 注意：从 Tailwind CSS v3 开始，默认使用 JIT 引擎
// 内容配置会自动检测使用了哪些类</pre>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">PostCSS 配置</h2>

      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
        <pre>// postcss.config.js
export default {
  plugins: {
    // Tailwind CSS 插件
    tailwindcss: {},
    // 自动添加浏览器前缀
    autoprefixer: {},
    // 生产环境压缩 CSS
    ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {}),
  },
}

// 或者使用数组形式
export default {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ],
}</pre>
      </div>
    </div>

    <div class="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
      <h3 class="text-lg font-semibold text-indigo-800 mb-2">配置技巧</h3>
      <ul class="text-indigo-700 space-y-1">
        <li>• 使用 <code class="bg-indigo-100 px-1 rounded">extend</code> 而非直接覆盖 <code class="bg-indigo-100 px-1 rounded">theme</code></li>
        <li>• 保持颜色命名一致（如 500 为主色，600 为深色）</li>
        <li>• 使用 JavaScript 对象动态生成配置</li>
        <li>• 为常用模式创建自定义工具类</li>
        <li>• 使用插件扩展功能而非重复配置</li>
        <li>• 定期查看 Tailwind CSS 更新日志了解新功能</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
// 自定义配置演示组件
// 展示了颜色、间距、字体、阴影、动画、断点、插件和内容配置
</script>
