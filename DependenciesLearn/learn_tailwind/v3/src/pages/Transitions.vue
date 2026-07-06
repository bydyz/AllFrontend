<template>
  <div class="space-y-8">
    <h1 class="text-3xl font-bold text-gray-800">过渡动画 (Transitions)</h1>

    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">过渡属性</h2>
      <p class="text-gray-600 mb-4">
        transition 属性用于指定哪些 CSS 属性应该添加过渡效果。
      </p>

      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
        <pre>// 过渡属性
transition-none    // transition-property: none
transition-all     // transition-property: all
transition         // transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter
transition-colors  // transition-property: color, background-color, border-color, text-decoration-color, fill, stroke
transition-opacity // transition-property: opacity
transition-shadow  // transition-property: box-shadow
transition-transform // transition-property: transform</pre>
      </div>

      <!-- 过渡属性示例 -->
      <div class="flex gap-4 flex-wrap">
        <div class="w-32 h-32 bg-blue-500 transition-all hover:bg-red-500 hover:scale-110 rounded-lg flex items-center justify-center text-white">
          transition-all
        </div>
        <div class="w-32 h-32 bg-green-500 transition-colors hover:bg-yellow-500 rounded-lg flex items-center justify-center text-white">
          transition-colors
        </div>
        <div class="w-32 h-32 bg-purple-500 transition-opacity hover:opacity-50 rounded-lg flex items-center justify-center text-white">
          transition-opacity
        </div>
        <div class="w-32 h-32 bg-pink-500 transition-shadow hover:shadow-2xl rounded-lg flex items-center justify-center text-white">
          transition-shadow
        </div>
        <div class="w-32 h-32 bg-indigo-500 transition-transform hover:rotate-12 rounded-lg flex items-center justify-center text-white">
          transition-transform
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">持续时间</h2>
      <p class="text-gray-600 mb-4">
        duration 属性用于指定过渡效果的持续时间。
      </p>

      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
        <pre>// 持续时间
duration-0     // transition-duration: 0ms
duration-75    // transition-duration: 75ms
duration-100   // transition-duration: 100ms
duration-150   // transition-duration: 150ms
duration-200   // transition-duration: 200ms
duration-300   // transition-duration: 300ms
duration-500   // transition-duration: 500ms
duration-700   // transition-duration: 700ms
duration-1000  // transition-duration: 1000ms</pre>
      </div>

      <!-- 持续时间示例 -->
      <div class="flex gap-4 flex-wrap">
        <div class="w-32 h-32 bg-blue-500 transition-all duration-100 hover:bg-red-500 rounded-lg flex items-center justify-center text-white text-sm">
          100ms
        </div>
        <div class="w-32 h-32 bg-green-500 transition-all duration-300 hover:bg-red-500 rounded-lg flex items-center justify-center text-white text-sm">
          300ms
        </div>
        <div class="w-32 h-32 bg-yellow-500 transition-all duration-500 hover:bg-red-500 rounded-lg flex items-center justify-center text-white text-sm">
          500ms
        </div>
        <div class="w-32 h-32 bg-purple-500 transition-all duration-700 hover:bg-red-500 rounded-lg flex items-center justify-center text-white text-sm">
          700ms
        </div>
        <div class="w-32 h-32 bg-pink-500 transition-all duration-1000 hover:bg-red-500 rounded-lg flex items-center justify-center text-white text-sm">
          1000ms
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">延迟</h2>
      <p class="text-gray-600 mb-4">
        delay 属性用于指定过渡效果开始前的延迟时间。
      </p>

      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
        <pre>// 延迟
delay-0     // transition-delay: 0ms
delay-75    // transition-delay: 75ms
delay-100   // transition-delay: 100ms
delay-150   // transition-delay: 150ms
delay-200   // transition-delay: 200ms
delay-300   // transition-delay: 300ms
delay-500   // transition-delay: 500ms
delay-700   // transition-delay: 700ms
delay-1000  // transition-delay: 1000ms</pre>
      </div>

      <!-- 延迟示例 -->
      <div class="flex gap-4 flex-wrap">
        <div class="w-32 h-32 bg-blue-500 transition-all duration-300 delay-0 hover:bg-red-500 rounded-lg flex items-center justify-center text-white text-sm">
          无延迟
        </div>
        <div class="w-32 h-32 bg-green-500 transition-all duration-300 delay-100 hover:bg-red-500 rounded-lg flex items-center justify-center text-white text-sm">
          延迟 100ms
        </div>
        <div class="w-32 h-32 bg-yellow-500 transition-all duration-300 delay-200 hover:bg-red-500 rounded-lg flex items-center justify-center text-white text-sm">
          延迟 200ms
        </div>
        <div class="w-32 h-32 bg-purple-500 transition-all duration-300 delay-300 hover:bg-red-500 rounded-lg flex items-center justify-center text-white text-sm">
          延迟 300ms
        </div>
        <div class="w-32 h-32 bg-pink-500 transition-all duration-300 delay-500 hover:bg-red-500 rounded-lg flex items-center justify-center text-white text-sm">
          延迟 500ms
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">缓动函数</h2>
      <p class="text-gray-600 mb-4">
        ease 属性用于指定过渡效果的速度曲线。
      </p>

      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
        <pre>// 缓动函数
ease-linear    // transition-timing-function: linear
ease-in        // transition-timing-function: cubic-bezier(0.4, 0, 1, 1)
ease-out       // transition-timing-function: cubic-bezier(0, 0, 0.2, 1)
ease-in-out    // transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1)</pre>
      </div>

      <!-- 缓动函数示例 -->
      <div class="flex gap-4 flex-wrap">
        <div class="w-32 h-32 bg-blue-500 transition-all duration-500 ease-linear hover:bg-red-500 hover:translate-x-4 rounded-lg flex items-center justify-center text-white text-sm">
          linear
        </div>
        <div class="w-32 h-32 bg-green-500 transition-all duration-500 ease-in hover:bg-red-500 hover:translate-x-4 rounded-lg flex items-center justify-center text-white text-sm">
          ease-in
        </div>
        <div class="w-32 h-32 bg-yellow-500 transition-all duration-500 ease-out hover:bg-red-500 hover:translate-x-4 rounded-lg flex items-center justify-center text-white text-sm">
          ease-out
        </div>
        <div class="w-32 h-32 bg-purple-500 transition-all duration-500 ease-in-out hover:bg-red-500 hover:translate-x-4 rounded-lg flex items-center justify-center text-white text-sm">
          ease-in-out
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">动画 (Animation)</h2>

      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
        <pre>// 内置动画
animate-none     // animation: none
animate-spin     // animation: spin 1s linear infinite（旋转）
animate-ping     // animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite（水波纹）
animate-pulse    // animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite（脉冲）
animate-bounce   // animation: bounce 1s infinite（弹跳）

// 自定义动画（需要在配置中定义）
// tailwind.config.js
export default {
  theme: {
    extend: {
      animation: {
        'wiggle': 'wiggle 1s ease-in-out infinite',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
      },
    },
  },
}

// 使用
// animate-wiggle</pre>
      </div>

      <!-- 动画示例 -->
      <div class="flex gap-8 flex-wrap items-center justify-center p-8 bg-gray-100 rounded-lg">
        <div class="text-center">
          <div class="w-16 h-16 bg-blue-500 animate-spin rounded-lg mb-2"></div>
          <span class="text-sm text-gray-600">spin（旋转）</span>
        </div>
        <div class="text-center">
          <div class="w-16 h-16 bg-green-500 animate-ping rounded-full mb-2"></div>
          <span class="text-sm text-gray-600">ping（水波纹）</span>
        </div>
        <div class="text-center">
          <div class="w-16 h-16 bg-yellow-500 animate-pulse rounded-lg mb-2"></div>
          <span class="text-sm text-gray-600">pulse（脉冲）</span>
        </div>
        <div class="text-center">
          <div class="w-16 h-16 bg-purple-500 animate-bounce rounded-lg mb-2"></div>
          <span class="text-sm text-gray-600">bounce（弹跳）</span>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">变换 (Transform)</h2>

      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
        <pre>// 缩放
scale-0      // transform: scale(0)
scale-50     // transform: scale(0.5)
scale-75     // transform: scale(0.75)
scale-90     // transform: scale(0.9)
scale-95     // transform: scale(0.95)
scale-100    // transform: scale(1)
scale-105    // transform: scale(1.05)
scale-110    // transform: scale(1.1)
scale-125    // transform: scale(1.25)
scale-150    // transform: scale(1.5)

// 旋转
rotate-0     // transform: rotate(0deg)
rotate-1     // transform: rotate(1deg)
rotate-2     // transform: rotate(2deg)
rotate-3     // transform: rotate(3deg)
rotate-6     // transform: rotate(6deg)
rotate-12    // transform: rotate(12deg)
rotate-45    // transform: rotate(45deg)
rotate-90    // transform: rotate(90deg)
rotate-180   // transform: rotate(180deg)

// 平移
translate-x-0    // transform: translateX(0)
translate-x-1    // transform: translateX(0.25rem)
translate-x-2    // transform: translateX(0.5rem)
translate-x-4    // transform: translateX(1rem)
translate-x-8    // transform: translateX(2rem)
translate-x-full // transform: translateX(100%)

translate-y-0    // transform: translateY(0)
translate-y-1    // transform: translateY(0.25rem)
translate-y-2    // transform: translateY(0.5rem)
translate-y-4    // transform: translateY(1rem)
translate-y-8    // transform: translateY(2rem)
translate-y-full // transform: translateY(100%)</pre>
      </div>

      <!-- 变换示例 -->
      <div class="flex gap-8 flex-wrap items-center justify-center p-8 bg-gray-100 rounded-lg">
        <div class="text-center">
          <div class="w-16 h-16 bg-blue-500 transition-all duration-300 hover:scale-110 rounded-lg mb-2 flex items-center justify-center text-white">
            scale
          </div>
          <span class="text-sm text-gray-600">hover: scale-110</span>
        </div>
        <div class="text-center">
          <div class="w-16 h-16 bg-green-500 transition-all duration-300 hover:rotate-45 rounded-lg mb-2 flex items-center justify-center text-white">
            rotate
          </div>
          <span class="text-sm text-gray-600">hover: rotate-45</span>
        </div>
        <div class="text-center">
          <div class="w-16 h-16 bg-yellow-500 transition-all duration-300 hover:translate-x-4 rounded-lg mb-2 flex items-center justify-center text-white">
            translate
          </div>
          <span class="text-sm text-gray-600">hover: translate-x-4</span>
        </div>
        <div class="text-center">
          <div class="w-16 h-16 bg-purple-500 transition-all duration-300 hover:scale-110 hover:rotate-12 rounded-lg mb-2 flex items-center justify-center text-white">
            组合
          </div>
          <span class="text-sm text-gray-600">hover: scale + rotate</span>
        </div>
      </div>
    </div>

    <div class="bg-rose-50 border border-rose-200 rounded-lg p-4">
      <h3 class="text-lg font-semibold text-rose-800 mb-2">过渡动画最佳实践</h3>
      <ul class="text-rose-700 space-y-1">
        <li>• 使用 <code class="bg-rose-100 px-1 rounded">transition-colors</code> 为颜色变化添加平滑过渡</li>
        <li>• 使用 <code class="bg-rose-100 px-1 rounded">duration-200</code> 或 <code class="bg-rose-100 px-1 rounded">duration-300</code> 创建快速响应效果</li>
        <li>• 避免过度使用 <code class="bg-rose-100 px-1 rounded">transition-all</code>，可能影响性能</li>
        <li>• 使用 <code class="bg-rose-100 px-1 rounded">transform</code> 而非 <code class="bg-rose-100 px-1 rounded">top/left</code> 进行动画，性能更好</li>
        <li>• 考虑用户的 <code class="bg-rose-100 px-1 rounded">prefers-reduced-motion</code> 设置</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
// 过渡动画演示组件
// 展示了过渡属性、持续时间、延迟、缓动函数、动画和变换等用法
</script>
