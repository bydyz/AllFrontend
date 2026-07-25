<template>
  <div class="space-y-8">
    <h1 class="text-3xl font-bold text-gray-800">Grid</h1>

    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">Grid 容器</h2>
      <p class="text-gray-600 mb-4">
        CSS Grid 是另一种强大的布局方式，特别适合二维布局。
      </p>

      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
        <pre>// Grid 容器
grid           // display: grid
inline-grid    // display: inline-grid

// 列
grid-cols-1    // grid-template-columns: repeat(1, minmax(0, 1fr))
grid-cols-2    // grid-template-columns: repeat(2, minmax(0, 1fr))
grid-cols-3    // grid-template-columns: repeat(3, minmax(0, 1fr))
grid-cols-4    // grid-template-columns: repeat(4, minmax(0, 1fr))
grid-cols-5    // grid-template-columns: repeat(5, minmax(0, 1fr))
grid-cols-6    // grid-template-columns: repeat(6, minmax(0, 1fr))
grid-cols-7    // grid-template-columns: repeat(7, minmax(0, 1fr))
grid-cols-8    // grid-template-columns: repeat(8, minmax(0, 1fr))
grid-cols-9    // grid-template-columns: repeat(9, minmax(0, 1fr))
grid-cols-10   // grid-template-columns: repeat(10, minmax(0, 1fr))
grid-cols-11   // grid-template-columns: repeat(11, minmax(0, 1fr))
grid-cols-12   // grid-template-columns: repeat(12, minmax(0, 1fr))
grid-cols-none // grid-template-columns: none

// 行
grid-rows-1    // grid-template-rows: repeat(1, minmax(0, 1fr))
grid-rows-2    // grid-template-rows: repeat(2, minmax(0, 1fr))
grid-rows-3    // grid-template-rows: repeat(3, minmax(0, 1fr))
grid-rows-4    // grid-template-rows: repeat(4, minmax(0, 1fr))
grid-rows-5    // grid-template-rows: repeat(5, minmax(0, 1fr))
grid-rows-6    // grid-template-rows: repeat(6, minmax(0, 1fr))
grid-rows-none // grid-template-rows: none</pre>
      </div>

      <!-- Grid 容器示例 -->
      <div class="space-y-4">
        <div>
          <h4 class="font-medium text-gray-700 mb-2">grid-cols-3:</h4>
          <div class="grid grid-cols-3 gap-2 bg-gray-100 p-2">
            <div class="bg-blue-500 text-white p-4 text-center">1</div>
            <div class="bg-blue-500 text-white p-4 text-center">2</div>
            <div class="bg-blue-500 text-white p-4 text-center">3</div>
            <div class="bg-blue-500 text-white p-4 text-center">4</div>
            <div class="bg-blue-500 text-white p-4 text-center">5</div>
            <div class="bg-blue-500 text-white p-4 text-center">6</div>
          </div>
        </div>
        <div>
          <h4 class="font-medium text-gray-700 mb-2">grid-cols-4:</h4>
          <div class="grid grid-cols-4 gap-2 bg-gray-100 p-2">
            <div class="bg-green-500 text-white p-4 text-center">1</div>
            <div class="bg-green-500 text-white p-4 text-center">2</div>
            <div class="bg-green-500 text-white p-4 text-center">3</div>
            <div class="bg-green-500 text-white p-4 text-center">4</div>
            <div class="bg-green-500 text-white p-4 text-center">5</div>
            <div class="bg-green-500 text-white p-4 text-center">6</div>
            <div class="bg-green-500 text-white p-4 text-center">7</div>
            <div class="bg-green-500 text-white p-4 text-center">8</div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">Grid 项目</h2>

      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
        <pre>// 列跨度
col-span-1    // grid-column: span 1 / span 1
col-span-2    // grid-column: span 2 / span 2
col-span-3    // grid-column: span 3 / span 3
col-span-4    // grid-column: span 4 / span 4
col-span-5    // grid-column: span 5 / span 5
col-span-6    // grid-column: span 6 / span 6
col-span-full // grid-column: 1 / -1

// 行跨度
row-span-1    // grid-row: span 1 / span 1
row-span-2    // grid-row: span 2 / span 2
row-span-3    // grid-row: span 3 / span 3
row-span-4    // grid-row: span 4 / span 4
row-span-5    // grid-row: span 5 / span 5
row-span-6    // grid-row: span 6 / span 6
row-span-full // grid-row: 1 / -1

// 列开始/结束
col-start-1   // grid-column-start: 1
col-start-2   // grid-column-start: 2
col-start-3   // grid-column-start: 3
col-start-4   // grid-column-start: 4
col-start-5   // grid-column-start: 5
col-start-6   // grid-column-start: 6
col-start-7   // grid-column-start: 7
col-start-auto // grid-column-start: auto
col-end-1     // grid-column-end: 1
col-end-2     // grid-column-end: 2
col-end-3     // grid-column-end: 3
col-end-4     // grid-column-end: 4
col-end-5     // grid-column-end: 5
col-end-6     // grid-column-end: 6
col-end-7     // grid-column-end: 7
col-end-auto  // grid-column-end: auto

// 行开始/结束
row-start-1   // grid-row-start: 1
row-start-2   // grid-row-start: 2
row-start-3   // grid-row-start: 3
row-start-4   // grid-row-start: 4
row-start-5   // grid-row-start: 5
row-start-6   // grid-row-start: 6
row-start-7   // grid-row-start: 7
row-start-auto // grid-row-start: auto
row-end-1     // grid-row-end: 1
row-end-2     // grid-row-end: 2
row-end-3     // grid-row-end: 3
row-end-4     // grid-row-end: 4
row-end-5     // grid-row-end: 5
row-end-6     // grid-row-end: 6
row-end-7     // grid-row-end: 7
row-end-auto  // grid-row-end: auto</pre>
      </div>

      <!-- Grid 项目示例 -->
      <div class="space-y-4">
        <div>
          <h4 class="font-medium text-gray-700 mb-2">col-span-2:</h4>
          <div class="grid grid-cols-4 gap-2 bg-gray-100 p-2">
            <div class="col-span-2 bg-purple-500 text-white p-4 text-center">col-span-2</div>
            <div class="bg-purple-500 text-white p-4 text-center">3</div>
            <div class="bg-purple-500 text-white p-4 text-center">4</div>
          </div>
        </div>
        <div>
          <h4 class="font-medium text-gray-700 mb-2">row-span-2:</h4>
          <div class="grid grid-cols-3 grid-rows-3 gap-2 bg-gray-100 p-2 h-48">
            <div class="row-span-2 bg-pink-500 text-white p-4 text-center">row-span-2</div>
            <div class="bg-pink-500 text-white p-4 text-center">2</div>
            <div class="bg-pink-500 text-white p-4 text-center">3</div>
            <div class="bg-pink-500 text-white p-4 text-center">4</div>
            <div class="bg-pink-500 text-white p-4 text-center">5</div>
            <div class="bg-pink-500 text-white p-4 text-center">6</div>
            <div class="bg-pink-500 text-white p-4 text-center">7</div>
            <div class="bg-pink-500 text-white p-4 text-center">8</div>
          </div>
        </div>
        <div>
          <h4 class="font-medium text-gray-700 mb-2">col-span-full:</h4>
          <div class="grid grid-cols-3 gap-2 bg-gray-100 p-2">
            <div class="col-span-full bg-yellow-500 text-white p-4 text-center">col-span-full (占满整行)</div>
            <div class="bg-yellow-500 text-white p-4 text-center">2</div>
            <div class="bg-yellow-500 text-white p-4 text-center">3</div>
            <div class="bg-yellow-500 text-white p-4 text-center">4</div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">Grid 间距</h2>

      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
        <pre>// Grid 间距
gap-0      // gap: 0
gap-1      // gap: 0.25rem (4px)
gap-2      // gap: 0.5rem (8px)
gap-3      // gap: 0.75rem (12px)
gap-4      // gap: 1rem (16px)
gap-5      // gap: 1.25rem (20px)
gap-6      // gap: 1.5rem (24px)
gap-8      // gap: 2rem (32px)
gap-10     // gap: 2.5rem (40px)
gap-12     // gap: 3rem (48px)
gap-16     // gap: 4rem (64px)

// 行列间距
gap-x-4    // column-gap: 1rem
gap-y-4    // row-gap: 1rem</pre>
      </div>

      <!-- Grid 间距示例 -->
      <div class="space-y-4">
        <div>
          <h4 class="font-medium text-gray-700 mb-2">gap-2:</h4>
          <div class="grid grid-cols-3 gap-2 bg-gray-100 p-2">
            <div class="bg-blue-500 text-white p-4 text-center">1</div>
            <div class="bg-blue-500 text-white p-4 text-center">2</div>
            <div class="bg-blue-500 text-white p-4 text-center">3</div>
          </div>
        </div>
        <div>
          <h4 class="font-medium text-gray-700 mb-2">gap-4:</h4>
          <div class="grid grid-cols-3 gap-4 bg-gray-100 p-2">
            <div class="bg-green-500 text-white p-4 text-center">1</div>
            <div class="bg-green-500 text-white p-4 text-center">2</div>
            <div class="bg-green-500 text-white p-4 text-center">3</div>
          </div>
        </div>
        <div>
          <h4 class="font-medium text-gray-700 mb-2">gap-8:</h4>
          <div class="grid grid-cols-3 gap-8 bg-gray-100 p-2">
            <div class="bg-purple-500 text-white p-4 text-center">1</div>
            <div class="bg-purple-500 text-white p-4 text-center">2</div>
            <div class="bg-purple-500 text-white p-4 text-center">3</div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">Grid Flow</h2>

      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
        <pre>// Grid Flow（自动放置算法）
grid-flow-row         // grid-auto-flow: row
grid-flow-col         // grid-auto-flow: column
grid-flow-dense       // grid-auto-flow: dense
grid-flow-row-dense   // grid-auto-flow: row dense
grid-flow-col-dense   // grid-auto-flow: column dense

// 自动行/列大小
auto-rows-auto        // grid-auto-rows: auto
auto-rows-min         // grid-auto-rows: min-content
auto-rows-max         // grid-auto-rows: max-content
auto-rows-fr          // grid-auto-rows: minmax(0, 1fr)
auto-cols-auto        // grid-auto-columns: auto
auto-cols-min         // grid-auto-columns: min-content
auto-cols-max         // grid-auto-columns: max-content
auto-cols-fr          // grid-auto-columns: minmax(0, 1fr)</pre>
      </div>

      <!-- Grid Flow 示例 -->
      <div class="space-y-4">
        <div>
          <h4 class="font-medium text-gray-700 mb-2">grid-flow-row:</h4>
          <div class="grid grid-flow-row grid-cols-3 gap-2 bg-gray-100 p-2">
            <div class="bg-blue-500 text-white p-4 text-center">1</div>
            <div class="bg-blue-500 text-white p-4 text-center">2</div>
            <div class="bg-blue-500 text-white p-4 text-center">3</div>
            <div class="bg-blue-500 text-white p-4 text-center">4</div>
            <div class="bg-blue-500 text-white p-4 text-center">5</div>
          </div>
        </div>
        <div>
          <h4 class="font-medium text-gray-700 mb-2">grid-flow-col:</h4>
          <div class="grid grid-flow-col grid-rows-3 gap-2 bg-gray-100 p-2 h-48">
            <div class="bg-green-500 text-white p-4 text-center">1</div>
            <div class="bg-green-500 text-white p-4 text-center">2</div>
            <div class="bg-green-500 text-white p-4 text-center">3</div>
            <div class="bg-green-500 text-white p-4 text-center">4</div>
            <div class="bg-green-500 text-white p-4 text-center">5</div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">Grid 对齐</h2>

      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
        <pre>// 内容对齐
place-content-center   // place-content: center
place-content-start    // place-content: start
place-content-end      // place-content: end
place-content-between  // place-content: space-between
place-content-around   // place-content: space-around
place-content-evenly   // place-content: space-evenly
place-content-stretch  // place-content: stretch

// 项目对齐
place-items-center     // place-items: center
place-items-start      // place-items: start
place-items-end        // place-items: end
place-items-baseline   // place-items: baseline
place-items-stretch    // place-items: stretch

// 自对齐
place-self-center      // place-self: center
place-self-start       // place-self: start
place-self-end         // place-self: end
place-self-stretch     // place-self: stretch</pre>
      </div>

      <!-- Grid 对齐示例 -->
      <div class="space-y-4">
        <div>
          <h4 class="font-medium text-gray-700 mb-2">place-content-center:</h4>
          <div class="grid grid-cols-3 place-content-center gap-2 bg-gray-100 p-2 h-32">
            <div class="bg-blue-500 text-white p-2 text-center">1</div>
            <div class="bg-blue-500 text-white p-2 text-center">2</div>
            <div class="bg-blue-500 text-white p-2 text-center">3</div>
          </div>
        </div>
        <div>
          <h4 class="font-medium text-gray-700 mb-2">place-items-center:</h4>
          <div class="grid grid-cols-3 place-items-center gap-2 bg-gray-100 p-2 h-32">
            <div class="bg-green-500 text-white p-2 text-center">1</div>
            <div class="bg-green-500 text-white p-4 text-center">2</div>
            <div class="bg-green-500 text-white p-6 text-center">3</div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-violet-50 border border-violet-200 rounded-lg p-4">
      <h3 class="text-lg font-semibold text-violet-800 mb-2">Grid 工具类总结</h3>
      <ul class="text-violet-700 space-y-1">
        <li>• <code class="bg-violet-100 px-1 rounded">grid</code> - 启用 Grid 布局</li>
        <li>• <code class="bg-violet-100 px-1 rounded">grid-cols-{n}</code> - 定义列数</li>
        <li>• <code class="bg-violet-100 px-1 rounded">col-span-{n}</code> - 项目列跨度</li>
        <li>• <code class="bg-violet-100 px-1 rounded">row-span-{n}</code> - 项目行跨度</li>
        <li>• <code class="bg-violet-100 px-1 rounded">gap-{size}</code> - 设置间距</li>
        <li>• <code class="bg-violet-100 px-1 rounded">grid-flow-{direction}</code> - 控制自动放置方向</li>
        <li>• <code class="bg-violet-100 px-1 rounded">place-items-{value}</code> - 项目对齐</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
// Grid 工具类演示组件
// 展示了 Grid 容器、项目、间距、Flow 和对齐等用法
</script>
