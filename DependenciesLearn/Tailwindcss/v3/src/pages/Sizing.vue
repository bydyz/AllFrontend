<template>
  <div class="space-y-8">
    <h1 class="text-3xl font-bold text-gray-800">尺寸 (Sizing)</h1>

    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">宽度和高度</h2>
      <p class="text-gray-600 mb-4">
        Tailwind CSS 提供了控制元素宽度和高度的工具类，支持固定值、百分比和视口单位。
      </p>

      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
        <pre>// 固定宽度
w-{size}      // w-4 → width: 1rem (16px)
w-1/2         // width: 50%
w-full        // width: 100%
w-screen      // width: 100vw
w-min         // width: min-content
w-max         // width: max-content

// 最小/最大宽度
min-w-{size}  // min-w-0 → min-width: 0
max-w-{size}  // max-w-xs → max-width: 20rem (320px)

// 固定高度
h-{size}      // h-4 → height: 1rem (16px)
h-full        // height: 100%
h-screen      // height: 100vh
h-auto        // height: auto

// 最小/最大高度
min-h-{size}  // min-h-0 → min-height: 0
max-h-{size}  // max-h-screen → max-height: 100vh</pre>
      </div>

      <!-- 宽度示例 -->
      <div class="mb-6">
        <h4 class="font-medium text-gray-700 mb-2">宽度示例：</h4>
        <div class="space-y-2">
          <div class="bg-indigo-100 p-2">
            <div class="bg-indigo-500 text-white p-2 w-32">w-32 (128px)</div>
          </div>
          <div class="bg-indigo-100 p-2">
            <div class="bg-indigo-500 text-white p-2 w-1/2">w-1/2 (50%)</div>
          </div>
          <div class="bg-indigo-100 p-2">
            <div class="bg-indigo-500 text-white p-2 w-full">w-full (100%)</div>
          </div>
        </div>
      </div>

      <!-- 高度示例 -->
      <div class="mb-6">
        <h4 class="font-medium text-gray-700 mb-2">高度示例：</h4>
        <div class="flex items-end space-x-2 h-32">
          <div class="bg-green-500 text-white p-2 w-16 h-8">h-8</div>
          <div class="bg-green-500 text-white p-2 w-16 h-16">h-16</div>
          <div class="bg-green-500 text-white p-2 w-16 h-24">h-24</div>
          <div class="bg-green-500 text-white p-2 w-16 h-32">h-32</div>
        </div>
      </div>

      <!-- 最大宽度示例 -->
      <div class="mb-6">
        <h4 class="font-medium text-gray-700 mb-2">最大宽度示例：</h4>
        <div class="space-y-2">
          <div class="bg-purple-100 p-2">
            <div class="bg-purple-500 text-white p-2 max-w-xs">max-w-xs (320px)</div>
          </div>
          <div class="bg-purple-100 p-2">
            <div class="bg-purple-500 text-white p-2 max-w-md">max-w-md (448px)</div>
          </div>
          <div class="bg-purple-100 p-2">
            <div class="bg-purple-500 text-white p-2 max-w-lg">max-w-lg (512px)</div>
          </div>
          <div class="bg-purple-100 p-2">
            <div class="bg-purple-500 text-white p-2 max-w-xl">max-w-xl (576px)</div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">尺寸预设值</h2>

      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
        <pre>// 宽度预设值
w-0    → width: 0
w-1    → width: 0.25rem (4px)
w-2    → width: 0.5rem (8px)
w-3    → width: 0.75rem (12px)
w-4    → width: 1rem (16px)
w-5    → width: 1.25rem (20px)
w-6    → width: 1.5rem (24px)
w-8    → width: 2rem (32px)
w-10   → width: 2.5rem (40px)
w-12   → width: 3rem (48px)
w-16   → width: 4rem (64px)
w-20   → width: 5rem (80px)
w-24   → width: 6rem (96px)
w-32   → width: 8rem (128px)
w-40   → width: 10rem (160px)
w-48   → width: 12rem (192px)
w-56   → width: 14rem (224px)
w-64   → width: 16rem (256px)
w-72   → width: 18rem (288px)
w-80   → width: 20rem (320px)
w-96   → width: 24rem (384px)

// 百分比
w-1/2  → width: 50%
w-1/3  → width: 33.333333%
w-2/3  → width: 66.666667%
w-1/4  → width: 25%
w-3/4  → width: 75%
w-1/5  → width: 20%
w-2/5  → width: 40%
w-3/5  → width: 60%
w-4/5  → width: 80%

// 特殊值
w-full  → width: 100%
w-screen → width: 100vw
w-min   → width: min-content
w-max   → width: max-content
w-fit   → width: fit-content</pre>
      </div>
    </div>

    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <h3 class="text-lg font-semibold text-blue-800 mb-2">常用组合</h3>
      <p class="text-blue-700">
        结合 <code class="bg-blue-100 px-1 rounded">w-full</code> 和
        <code class="bg-blue-100 px-1 rounded">max-w-{size}</code> 可以创建响应式宽度，
        例如 <code class="bg-blue-100 px-1 rounded">w-full max-w-md</code> 表示宽度 100% 但最大不超过 448px。
      </p>
    </div>
  </div>
</template>

<script setup>
// 尺寸工具类演示组件
// 展示了宽度、高度、最小/最大宽度和高度的各种用法
</script>
