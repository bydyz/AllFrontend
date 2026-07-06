<template>
  <div class="space-y-8">
    <h1 class="text-3xl font-bold text-gray-800">颜色 (Colors)</h1>

    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">颜色系统</h2>
      <p class="text-gray-600 mb-4">
        Tailwind CSS 内置了丰富的颜色系统，包含 22 种颜色预设，每种颜色都有 11 个色调等级（50-950）。
      </p>

      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
        <pre>// 颜色使用语法
bg-{color}         // bg-blue-500 → 背景色
text-{color}       // text-red-500 → 文字颜色
border-{color}     // border-green-500 → 边框颜色

// 带透明度
bg-{color}/{opacity}  // bg-blue-500/50 → 50% 透明度
text-{color}/{opacity} // text-red-500/75 → 75% 透明度

// 内置颜色预设
slate, gray, zinc, neutral, stone,
red, orange, amber, yellow, lime, green, emerald, teal,
cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose</pre>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">颜色色阶</h2>
      <p class="text-gray-600 mb-4">
        每种颜色都有从 50（最浅）到 950（最深）的色调等级。
      </p>

      <!-- 颜色色阶示例 -->
      <div class="grid grid-cols-11 gap-1 mb-4">
        <div class="bg-red-50 h-12 rounded"></div>
        <div class="bg-red-100 h-12 rounded"></div>
        <div class="bg-red-200 h-12 rounded"></div>
        <div class="bg-red-300 h-12 rounded"></div>
        <div class="bg-red-400 h-12 rounded"></div>
        <div class="bg-red-500 h-12 rounded"></div>
        <div class="bg-red-600 h-12 rounded"></div>
        <div class="bg-red-700 h-12 rounded"></div>
        <div class="bg-red-800 h-12 rounded"></div>
        <div class="bg-red-900 h-12 rounded"></div>
        <div class="bg-red-950 h-12 rounded"></div>
      </div>
      <div class="grid grid-cols-11 gap-1 text-xs text-center text-gray-500 mb-6">
        <div>50</div><div>100</div><div>200</div><div>300</div><div>400</div>
        <div>500</div><div>600</div><div>700</div><div>800</div><div>900</div><div>950</div>
      </div>

      <h3 class="text-lg font-semibold text-gray-700 mb-2">所有颜色预设</h3>
      <div class="grid grid-cols-6 gap-4">
        <!-- 红色系 -->
        <div>
          <div class="text-sm font-medium text-gray-700 mb-1">Red</div>
          <div class="flex h-6 rounded overflow-hidden">
            <div class="bg-red-50 flex-1"></div>
            <div class="bg-red-100 flex-1"></div>
            <div class="bg-red-200 flex-1"></div>
            <div class="bg-red-300 flex-1"></div>
            <div class="bg-red-400 flex-1"></div>
            <div class="bg-red-500 flex-1"></div>
            <div class="bg-red-600 flex-1"></div>
            <div class="bg-red-700 flex-1"></div>
            <div class="bg-red-800 flex-1"></div>
            <div class="bg-red-900 flex-1"></div>
            <div class="bg-red-950 flex-1"></div>
          </div>
        </div>
        <!-- 橙色系 -->
        <div>
          <div class="text-sm font-medium text-gray-700 mb-1">Orange</div>
          <div class="flex h-6 rounded overflow-hidden">
            <div class="bg-orange-50 flex-1"></div>
            <div class="bg-orange-100 flex-1"></div>
            <div class="bg-orange-200 flex-1"></div>
            <div class="bg-orange-300 flex-1"></div>
            <div class="bg-orange-400 flex-1"></div>
            <div class="bg-orange-500 flex-1"></div>
            <div class="bg-orange-600 flex-1"></div>
            <div class="bg-orange-700 flex-1"></div>
            <div class="bg-orange-800 flex-1"></div>
            <div class="bg-orange-900 flex-1"></div>
            <div class="bg-orange-950 flex-1"></div>
          </div>
        </div>
        <!-- 黄色系 -->
        <div>
          <div class="text-sm font-medium text-gray-700 mb-1">Yellow</div>
          <div class="flex h-6 rounded overflow-hidden">
            <div class="bg-yellow-50 flex-1"></div>
            <div class="bg-yellow-100 flex-1"></div>
            <div class="bg-yellow-200 flex-1"></div>
            <div class="bg-yellow-300 flex-1"></div>
            <div class="bg-yellow-400 flex-1"></div>
            <div class="bg-yellow-500 flex-1"></div>
            <div class="bg-yellow-600 flex-1"></div>
            <div class="bg-yellow-700 flex-1"></div>
            <div class="bg-yellow-800 flex-1"></div>
            <div class="bg-yellow-900 flex-1"></div>
            <div class="bg-yellow-950 flex-1"></div>
          </div>
        </div>
        <!-- 绿色系 -->
        <div>
          <div class="text-sm font-medium text-gray-700 mb-1">Green</div>
          <div class="flex h-6 rounded overflow-hidden">
            <div class="bg-green-50 flex-1"></div>
            <div class="bg-green-100 flex-1"></div>
            <div class="bg-green-200 flex-1"></div>
            <div class="bg-green-300 flex-1"></div>
            <div class="bg-green-400 flex-1"></div>
            <div class="bg-green-500 flex-1"></div>
            <div class="bg-green-600 flex-1"></div>
            <div class="bg-green-700 flex-1"></div>
            <div class="bg-green-800 flex-1"></div>
            <div class="bg-green-900 flex-1"></div>
            <div class="bg-green-950 flex-1"></div>
          </div>
        </div>
        <!-- 蓝色系 -->
        <div>
          <div class="text-sm font-medium text-gray-700 mb-1">Blue</div>
          <div class="flex h-6 rounded overflow-hidden">
            <div class="bg-blue-50 flex-1"></div>
            <div class="bg-blue-100 flex-1"></div>
            <div class="bg-blue-200 flex-1"></div>
            <div class="bg-blue-300 flex-1"></div>
            <div class="bg-blue-400 flex-1"></div>
            <div class="bg-blue-500 flex-1"></div>
            <div class="bg-blue-600 flex-1"></div>
            <div class="bg-blue-700 flex-1"></div>
            <div class="bg-blue-800 flex-1"></div>
            <div class="bg-blue-900 flex-1"></div>
            <div class="bg-blue-950 flex-1"></div>
          </div>
        </div>
        <!-- 紫色系 -->
        <div>
          <div class="text-sm font-medium text-gray-700 mb-1">Purple</div>
          <div class="flex h-6 rounded overflow-hidden">
            <div class="bg-purple-50 flex-1"></div>
            <div class="bg-purple-100 flex-1"></div>
            <div class="bg-purple-200 flex-1"></div>
            <div class="bg-purple-300 flex-1"></div>
            <div class="bg-purple-400 flex-1"></div>
            <div class="bg-purple-500 flex-1"></div>
            <div class="bg-purple-600 flex-1"></div>
            <div class="bg-purple-700 flex-1"></div>
            <div class="bg-purple-800 flex-1"></div>
            <div class="bg-purple-900 flex-1"></div>
            <div class="bg-purple-950 flex-1"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">透明度</h2>
      <p class="text-gray-600 mb-4">
        支持使用斜杠语法设置颜色透明度，从 0% 到 100%。
      </p>

      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
        <pre>// 透明度语法
bg-blue-500/0    → 0% 透明度
bg-blue-500/10   → 10% 透明度
bg-blue-500/20   → 20% 透明度
bg-blue-500/25   → 25% 透明度
bg-blue-500/30   → 30% 透明度
bg-blue-500/40   → 40% 透明度
bg-blue-500/50   → 50% 透明度
bg-blue-500/60   → 60% 透明度
bg-blue-500/70   → 70% 透明度
bg-blue-500/75   → 75% 透明度
bg-blue-500/80   → 80% 透明度
bg-blue-500/90   → 90% 透明度
bg-blue-500/95   → 95% 透明度
bg-blue-500/100  → 100% 透明度</pre>
      </div>

      <!-- 透明度示例 -->
      <div class="flex gap-2">
        <div class="bg-blue-500/10 w-12 h-12 rounded"></div>
        <div class="bg-blue-500/20 w-12 h-12 rounded"></div>
        <div class="bg-blue-500/30 w-12 h-12 rounded"></div>
        <div class="bg-blue-500/40 w-12 h-12 rounded"></div>
        <div class="bg-blue-500/50 w-12 h-12 rounded"></div>
        <div class="bg-blue-500/60 w-12 h-12 rounded"></div>
        <div class="bg-blue-500/70 w-12 h-12 rounded"></div>
        <div class="bg-blue-500/80 w-12 h-12 rounded"></div>
        <div class="bg-blue-500/90 w-12 h-12 rounded"></div>
        <div class="bg-blue-500 w-12 h-12 rounded"></div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">边框颜色</h2>

      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
        <pre>// 边框颜色
border-{color}        // border-red-500 → 边框颜色
border-{color}-{shade} // border-blue-600 → 指定色调
border-transparent    // 透明边框
border-current        // 当前文字颜色

// 单边边框颜色
border-t-{color}      // border-t-red-500 → 上边框颜色
border-r-{color}      // border-r-red-500 → 右边框颜色
border-b-{color}      // border-b-red-500 → 下边框颜色
border-l-{color}      // border-l-red-500 → 左边框颜色</pre>
      </div>

      <!-- 边框颜色示例 -->
      <div class="flex gap-4">
        <div class="border-2 border-red-500 p-4 rounded">border-red-500</div>
        <div class="border-2 border-blue-500 p-4 rounded">border-blue-500</div>
        <div class="border-2 border-green-500 p-4 rounded">border-green-500</div>
        <div class="border-2 border-transparent p-4 rounded">border-transparent</div>
        <div class="border-2 border-current p-4 rounded text-purple-600">border-current</div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">自定义颜色</h2>

      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
        <pre>// tailwind.config.js 配置自定义颜色
export default {
  theme: {
    extend: {
      colors: {
        // 直接定义颜色值
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
      },
    },
  },
}

// 使用自定义颜色
// bg-brand-500, text-brand-500, border-brand-500</pre>
      </div>
    </div>

    <div class="bg-purple-50 border border-purple-200 rounded-lg p-4">
      <h3 class="text-lg font-semibold text-purple-800 mb-2">颜色使用技巧</h3>
      <ul class="text-purple-700 space-y-1">
        <li>• 使用 <code class="bg-purple-100 px-1 rounded">50-100</code> 色调作为背景色，适合浅色背景</li>
        <li>• 使用 <code class="bg-purple-100 px-1 rounded">500-600</code> 色调作为主要颜色</li>
        <li>• 使用 <code class="bg-purple-100 px-1 rounded">700-900</code> 色调作为深色文字</li>
        <li>• 使用 <code class="bg-purple-100 px-1 rounded">/{opacity}</code> 语法创建半透明效果</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
// 颜色工具类演示组件
// 展示了颜色系统、色阶、透明度、边框颜色和自定义颜色
</script>
