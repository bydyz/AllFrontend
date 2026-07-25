<template>
  <div class="space-y-8">
    <h1 class="text-3xl font-bold text-gray-800">间距 (Spacing)</h1>

    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">间距工具类</h2>
      <p class="text-gray-600 mb-4">
        Tailwind CSS 提供了丰富的间距工具类，用于控制元素的内边距（padding）和外边距（margin）。
        间距值基于一个 4px 的网格系统，从 0 到 96（0px 到 384px）。
      </p>

      <h3 class="text-lg font-semibold text-gray-700 mb-2">内边距 (Padding)</h3>
      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
        <pre>// 所有方向
p-{size}      // p-4 → padding: 1rem (16px)

// 单个方向
px-{size}     // px-4 → padding-left: 1rem; padding-right: 1rem
py-{size}     // py-4 → padding-top: 1rem; padding-bottom: 1rem
pt-{size}     // pt-4 → padding-top: 1rem
pr-{size}     // pr-4 → padding-right: 1rem
pb-{size}     // pb-4 → padding-bottom: 1rem
pl-{size}     // pl-4 → padding-left: 1rem

// size 可以是: 0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 72, 80, 96</pre>
      </div>

      <!-- 内边距示例 -->
      <div class="mb-6">
        <h4 class="font-medium text-gray-700 mb-2">示例演示：</h4>
        <div class="space-y-2">
          <div class="bg-indigo-100 border border-indigo-300">
            <div class="bg-indigo-500 text-white p-2">p-2 (8px)</div>
          </div>
          <div class="bg-indigo-100 border border-indigo-300">
            <div class="bg-indigo-500 text-white p-4">p-4 (16px)</div>
          </div>
          <div class="bg-indigo-100 border border-indigo-300">
            <div class="bg-indigo-500 text-white p-8">p-8 (32px)</div>
          </div>
        </div>
      </div>

      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
        <pre>// 水平内边距
px-4 → padding-left: 1rem; padding-right: 1rem

// 垂直内边距
py-4 → padding-top: 1rem; padding-bottom: 1rem</pre>
      </div>
      <div class="space-y-2">
        <div class="bg-indigo-100 border border-indigo-300">
          <div class="bg-indigo-500 text-white px-8 py-2">px-8 py-2</div>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">外边距 (Margin)</h2>
      <p class="text-gray-600 mb-4">
        外边距工具类与内边距类似，但用于控制元素外部的空间。
      </p>

      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
        <pre>// 所有方向
m-{size}      // m-4 → margin: 1rem (16px)

// 单个方向
mx-{size}     // mx-4 → margin-left: 1rem; margin-right: 1rem
my-{size}     // my-4 → margin-top: 1rem; margin-bottom: 1rem
mt-{size}     // mt-4 → margin-top: 1rem
mr-{size}     // mr-4 → margin-right: 1rem
mb-{size}     // mb-4 → margin-bottom: 1rem
ml-{size}     // ml-4 → margin-left: 1rem

// 特殊值
mx-auto      // margin-left: auto; margin-right: auto (居中)
m-{size}     // 负值：-m-4 → margin: -1rem</pre>
      </div>

      <!-- 外边距示例 -->
      <div class="mb-6">
        <h4 class="font-medium text-gray-700 mb-2">示例演示：</h4>
        <div class="bg-gray-200 p-4">
          <div class="bg-green-500 text-white p-2 mb-2">mb-2 (8px) - 下方有间距</div>
          <div class="bg-green-500 text-white p-2 mb-4">mb-4 (16px) - 下方有更多间距</div>
          <div class="bg-green-500 text-white p-2">无下方间距</div>
        </div>
      </div>

      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
        <pre>// 水平居中
mx-auto → margin-left: auto; margin-right: auto

// 示例
<div class="bg-blue-500 text-white p-2 mx-auto w-32">居中显示</div></pre>
      </div>
      <div class="bg-gray-200 p-4">
        <div class="bg-blue-500 text-white p-2 mx-auto w-32 text-center">居中显示</div>
      </div>
    </div>

    <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
      <h3 class="text-lg font-semibold text-yellow-800 mb-2">提示</h3>
      <p class="text-yellow-700">
        间距值基于 4px 网格，例如 <code class="bg-yellow-100 px-1 rounded">p-4</code> = 4 × 4px = 16px。
        使用 <code class="bg-yellow-100 px-1 rounded">p-0.5</code> 可以得到 2px 的间距。
      </p>
    </div>
  </div>
</template>

<script setup>
// 间距工具类演示组件
// 展示了 padding 和 margin 的各种用法
</script>
