<template>
  <div class="space-y-8">
    <h1 class="text-3xl font-bold text-gray-800">响应式 (Responsive)</h1>

    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">响应式断点</h2>
      <p class="text-gray-600 mb-4">
        Tailwind CSS 内置了 5 个响应式断点，支持移动优先的设计方式。
        默认情况下，样式应用于所有屏幕尺寸，使用响应式前缀可以指定特定断点以上应用。
      </p>

      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
        <pre>// 响应式断点
sm: 640px    // 平板竖屏
md: 768px    // 平板横屏
lg: 1024px   // 桌面
xl: 1280px   // 大桌面
2xl: 1536px  // 超大桌面

// 使用方式
// 默认样式：所有屏幕
<div class="p-4">默认样式</div>

// 小屏幕及以上
<div class="p-4 sm:p-6">小屏幕及以上</div>

// 中等屏幕及以上
<div class="p-4 md:p-8">中等屏幕及以上</div>

// 大屏幕及以上
<div class="p-4 lg:p-10">大屏幕及以上</div></pre>
      </div>

      <!-- 响应式断点示例 -->
      <div class="bg-gray-100 p-4 rounded-lg mb-4">
        <p class="text-sm text-gray-600 mb-2">调整浏览器窗口大小查看效果：</p>
        <div class="bg-blue-500 text-white p-4 rounded text-center">
          <span class="hidden">默认: hidden</span>
          <span class="sm:inline sm:bg-green-500 sm:p-2 sm:rounded">sm: inline (640px+)</span>
          <span class="md:inline md:bg-yellow-500 md:p-2 md:rounded">md: inline (768px+)</span>
          <span class="lg:inline lg:bg-red-500 lg:p-2 lg:rounded">lg: inline (1024px+)</span>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">响应式布局示例</h2>

      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
        <pre>// 响应式网格布局
<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  <div class="bg-white p-4 rounded shadow">项目 1</div>
  <div class="bg-white p-4 rounded shadow">项目 2</div>
  <div class="bg-white p-4 rounded shadow">项目 3</div>
  <div class="bg-white p-4 rounded shadow">项目 4</div>
</div>

// 响应式文字大小
<div class="text-sm md:text-base lg:text-lg xl:text-xl">
  响应式文字大小
</div>

// 响应式间距
<div class="p-2 md:p-4 lg:p-8">
  响应式内边距
</div>

// 响应式显示/隐藏
<div class="hidden md:block">仅在中等屏幕及以上显示</div>
<div class="block md:hidden">仅在中等屏幕以下显示</div></pre>
      </div>

      <!-- 响应式布局示例 -->
      <div class="space-y-4">
        <div>
          <h4 class="font-medium text-gray-700 mb-2">响应式网格：</h4>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 bg-gray-100 p-4 rounded">
            <div class="bg-blue-500 text-white p-4 rounded text-center">1</div>
            <div class="bg-blue-500 text-white p-4 rounded text-center">2</div>
            <div class="bg-blue-500 text-white p-4 rounded text-center">3</div>
            <div class="bg-blue-500 text-white p-4 rounded text-center">4</div>
            <div class="bg-blue-500 text-white p-4 rounded text-center">5</div>
            <div class="bg-blue-500 text-white p-4 rounded text-center">6</div>
            <div class="bg-blue-500 text-white p-4 rounded text-center">7</div>
            <div class="bg-blue-500 text-white p-4 rounded text-center">8</div>
          </div>
        </div>

        <div>
          <h4 class="font-medium text-gray-700 mb-2">响应式文字大小：</h4>
          <div class="bg-gray-100 p-4 rounded">
            <p class="text-sm md:text-base lg:text-lg xl:text-xl font-bold text-indigo-600">
              这段文字会根据屏幕大小变化
            </p>
            <p class="text-xs text-gray-500 mt-2">
              当前：text-sm (移动) → text-base (sm) → text-lg (md) → text-xl (lg)
            </p>
          </div>
        </div>

        <div>
          <h4 class="font-medium text-gray-700 mb-2">响应式显示/隐藏：</h4>
          <div class="bg-gray-100 p-4 rounded space-y-2">
            <div class="block md:hidden bg-green-500 text-white p-2 rounded text-center">
              仅在移动设备显示 (md:hidden)
            </div>
            <div class="hidden md:block bg-blue-500 text-white p-2 rounded text-center">
              仅在中等屏幕及以上显示 (md:block)
            </div>
            <div class="hidden lg:block bg-purple-500 text-white p-2 rounded text-center">
              仅在大屏幕及以上显示 (lg:block)
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">响应式 Flexbox</h2>

      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
        <pre>// 响应式 Flex 方向
<div class="flex flex-col md:flex-row gap-4">
  <div>项目 1</div>
  <div>项目 2</div>
  <div>项目 3</div>
</div>

// 响应式 Flex 对齐
<div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
  <div>项目 1</div>
  <div>项目 2</div>
  <div>项目 3</div>
</div></pre>
      </div>

      <!-- 响应式 Flexbox 示例 -->
      <div class="space-y-4">
        <div>
          <h4 class="font-medium text-gray-700 mb-2">响应式 Flex 方向：</h4>
          <div class="flex flex-col md:flex-row gap-2 bg-gray-100 p-4 rounded">
            <div class="bg-blue-500 text-white p-4 rounded text-center">1</div>
            <div class="bg-blue-500 text-white p-4 rounded text-center">2</div>
            <div class="bg-blue-500 text-white p-4 rounded text-center">3</div>
          </div>
          <p class="text-xs text-gray-500 mt-1">移动设备：纵向排列 | 桌面：横向排列</p>
        </div>

        <div>
          <h4 class="font-medium text-gray-700 mb-2">响应式 Flex 对齐：</h4>
          <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-2 bg-gray-100 p-4 rounded">
            <div class="bg-green-500 text-white p-2 rounded">项目 1</div>
            <div class="bg-green-500 text-white p-6 rounded">项目 2（更高）</div>
            <div class="bg-green-500 text-white p-3 rounded">项目 3</div>
          </div>
          <p class="text-xs text-gray-500 mt-1">移动设备：纵向排列 | 桌面：横向排列且垂直居中</p>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">响应式容器</h2>

      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
        <pre>// 响应式容器宽度
<div class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
  响应式容器宽度
</div>

// 最大宽度
<div class="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto p-4">
  响应式最大宽度
</div></pre>
      </div>

      <!-- 响应式容器示例 -->
      <div class="space-y-4">
        <div>
          <h4 class="font-medium text-gray-700 mb-2">响应式宽度：</h4>
          <div class="bg-gray-100 p-4 rounded">
            <div class="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 bg-blue-500 text-white p-4 rounded text-center">
              w-full → sm:w-3/4 → md:w-1/2 → lg:w-1/3
            </div>
          </div>
        </div>

        <div>
          <h4 class="font-medium text-gray-700 mb-2">响应式最大宽度：</h4>
          <div class="bg-gray-100 p-4 rounded">
            <div class="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto bg-green-500 text-white p-4 rounded text-center">
              max-w-xs → sm:max-w-sm → md:max-w-md → lg:max-w-lg → xl:max-w-xl
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">自定义断点</h2>

      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
        <pre>// 在 tailwind.config.js 中自定义断点
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
    },
  },
}

// 使用自定义断点
<div class="hidden 3xl:block">仅在超大屏幕显示</div></pre>
      </div>
    </div>

    <div class="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
      <h3 class="text-lg font-semibold text-emerald-800 mb-2">响应式设计最佳实践</h3>
      <ul class="text-emerald-700 space-y-1">
        <li>• <strong>移动优先</strong>：先为移动设备编写样式，然后使用响应式前缀覆盖</li>
        <li>• <strong>渐进增强</strong>：从小屏幕到大屏幕逐步添加复杂布局</li>
        <li>• <strong>内容优先</strong>：确保内容在所有屏幕上都可读</li>
        <li>• <strong>测试</strong>：在真实设备上测试响应式效果</li>
        <li>• <strong>断点</strong>：使用 Tailwind 默认断点，避免过多自定义</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
// 响应式工具类演示组件
// 展示了响应式断点、布局、Flexbox 和容器等用法
</script>
