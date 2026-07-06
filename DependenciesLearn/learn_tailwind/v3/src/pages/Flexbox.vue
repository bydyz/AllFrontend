<template>
  <div class="space-y-8">
    <h1 class="text-3xl font-bold text-gray-800">Flexbox</h1>

    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">Flex 容器</h2>
      <p class="text-gray-600 mb-4">
        Flexbox 是一种强大的布局方式，可以轻松实现各种复杂的布局效果。
      </p>

      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
        <pre>// Flex 容器
flex           // display: flex
inline-flex    // display: inline-flex

// Flex 方向
flex-row         // flex-direction: row
flex-row-reverse // flex-direction: row-reverse
flex-col         // flex-direction: column
flex-col-reverse // flex-direction: column-reverse

// Flex 换行
flex-wrap      // flex-wrap: wrap
flex-wrap-reverse // flex-wrap: wrap-reverse
flex-nowrap    // flex-wrap: nowrap

// Flex 填充
flex-1         // flex: 1 1 0%
flex-auto      // flex: 1 1 auto
flex-initial   // flex: 0 1 auto
flex-none      // flex: none</pre>
      </div>

      <!-- Flex 容器示例 -->
      <div class="space-y-4">
        <div>
          <h4 class="font-medium text-gray-700 mb-2">flex-row:</h4>
          <div class="flex flex-row bg-gray-100 p-2 gap-2">
            <div class="bg-blue-500 text-white p-2">1</div>
            <div class="bg-blue-500 text-white p-2">2</div>
            <div class="bg-blue-500 text-white p-2">3</div>
          </div>
        </div>
        <div>
          <h4 class="font-medium text-gray-700 mb-2">flex-col:</h4>
          <div class="flex flex-col bg-gray-100 p-2 gap-2 w-fit">
            <div class="bg-green-500 text-white p-2">1</div>
            <div class="bg-green-500 text-white p-2">2</div>
            <div class="bg-green-500 text-white p-2">3</div>
          </div>
        </div>
        <div>
          <h4 class="font-medium text-gray-700 mb-2">flex-wrap:</h4>
          <div class="flex flex-wrap bg-gray-100 p-2 gap-2 w-64">
            <div class="bg-purple-500 text-white p-2">1</div>
            <div class="bg-purple-500 text-white p-2">2</div>
            <div class="bg-purple-500 text-white p-2">3</div>
            <div class="bg-purple-500 text-white p-2">4</div>
            <div class="bg-purple-500 text-white p-2">5</div>
            <div class="bg-purple-500 text-white p-2">6</div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">主轴对齐</h2>

      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
        <pre>// 主轴对齐（水平方向，当 flex-direction: row 时）
justify-start    // justify-content: flex-start
justify-end      // justify-content: flex-end
justify-center   // justify-content: center
justify-between  // justify-content: space-between
justify-around   // justify-content: space-around
justify-evenly   // justify-content: space-evenly</pre>
      </div>

      <!-- 主轴对齐示例 -->
      <div class="space-y-4">
        <div>
          <h4 class="font-medium text-gray-700 mb-2">justify-start:</h4>
          <div class="flex justify-start bg-gray-100 p-2 gap-2">
            <div class="bg-blue-500 text-white p-2">1</div>
            <div class="bg-blue-500 text-white p-2">2</div>
            <div class="bg-blue-500 text-white p-2">3</div>
          </div>
        </div>
        <div>
          <h4 class="font-medium text-gray-700 mb-2">justify-center:</h4>
          <div class="flex justify-center bg-gray-100 p-2 gap-2">
            <div class="bg-green-500 text-white p-2">1</div>
            <div class="bg-green-500 text-white p-2">2</div>
            <div class="bg-green-500 text-white p-2">3</div>
          </div>
        </div>
        <div>
          <h4 class="font-medium text-gray-700 mb-2">justify-between:</h4>
          <div class="flex justify-between bg-gray-100 p-2">
            <div class="bg-purple-500 text-white p-2">1</div>
            <div class="bg-purple-500 text-white p-2">2</div>
            <div class="bg-purple-500 text-white p-2">3</div>
          </div>
        </div>
        <div>
          <h4 class="font-medium text-gray-700 mb-2">justify-around:</h4>
          <div class="flex justify-around bg-gray-100 p-2">
            <div class="bg-pink-500 text-white p-2">1</div>
            <div class="bg-pink-500 text-white p-2">2</div>
            <div class="bg-pink-500 text-white p-2">3</div>
          </div>
        </div>
        <div>
          <h4 class="font-medium text-gray-700 mb-2">justify-evenly:</h4>
          <div class="flex justify-evenly bg-gray-100 p-2">
            <div class="bg-yellow-500 text-white p-2">1</div>
            <div class="bg-yellow-500 text-white p-2">2</div>
            <div class="bg-yellow-500 text-white p-2">3</div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">交叉轴对齐</h2>

      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
        <pre>// 交叉轴对齐（垂直方向，当 flex-direction: row 时）
items-start     // align-items: flex-start
items-end       // align-items: flex-end
items-center    // align-items: center
items-baseline  // align-items: baseline
items-stretch   // align-items: stretch

// 单个项目对齐
self-auto       // align-self: auto
self-start      // align-self: flex-start
self-end        // align-self: flex-end
self-center     // align-self: center
self-baseline   // align-self: baseline
self-stretch    // align-self: stretch</pre>
      </div>

      <!-- 交叉轴对齐示例 -->
      <div class="space-y-4">
        <div>
          <h4 class="font-medium text-gray-700 mb-2">items-start:</h4>
          <div class="flex items-start bg-gray-100 p-2 gap-2 h-32">
            <div class="bg-blue-500 text-white p-2">1</div>
            <div class="bg-blue-500 text-white p-4">2</div>
            <div class="bg-blue-500 text-white p-6">3</div>
          </div>
        </div>
        <div>
          <h4 class="font-medium text-gray-700 mb-2">items-center:</h4>
          <div class="flex items-center bg-gray-100 p-2 gap-2 h-32">
            <div class="bg-green-500 text-white p-2">1</div>
            <div class="bg-green-500 text-white p-4">2</div>
            <div class="bg-green-500 text-white p-6">3</div>
          </div>
        </div>
        <div>
          <h4 class="font-medium text-gray-700 mb-2">items-end:</h4>
          <div class="flex items-end bg-gray-100 p-2 gap-2 h-32">
            <div class="bg-purple-500 text-white p-2">1</div>
            <div class="bg-purple-500 text-white p-4">2</div>
            <div class="bg-purple-500 text-white p-6">3</div>
          </div>
        </div>
        <div>
          <h4 class="font-medium text-gray-700 mb-2">items-stretch:</h4>
          <div class="flex items-stretch bg-gray-100 p-2 gap-2 h-32">
            <div class="bg-pink-500 text-white p-2">1</div>
            <div class="bg-pink-500 text-white p-2">2</div>
            <div class="bg-pink-500 text-white p-2">3</div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">间距</h2>

      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
        <pre>// Flex 间距
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

      <!-- 间距示例 -->
      <div class="space-y-4">
        <div>
          <h4 class="font-medium text-gray-700 mb-2">gap-2:</h4>
          <div class="flex bg-gray-100 p-2 gap-2">
            <div class="bg-blue-500 text-white p-2">1</div>
            <div class="bg-blue-500 text-white p-2">2</div>
            <div class="bg-blue-500 text-white p-2">3</div>
          </div>
        </div>
        <div>
          <h4 class="font-medium text-gray-700 mb-2">gap-4:</h4>
          <div class="flex bg-gray-100 p-2 gap-4">
            <div class="bg-green-500 text-white p-2">1</div>
            <div class="bg-green-500 text-white p-2">2</div>
            <div class="bg-green-500 text-white p-2">3</div>
          </div>
        </div>
        <div>
          <h4 class="font-medium text-gray-700 mb-2">gap-8:</h4>
          <div class="flex bg-gray-100 p-2 gap-8">
            <div class="bg-purple-500 text-white p-2">1</div>
            <div class="bg-purple-500 text-white p-2">2</div>
            <div class="bg-purple-500 text-white p-2">3</div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">Flex Wrap</h2>

      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
        <pre>// Flex Wrap
flex-wrap         // flex-wrap: wrap
flex-wrap-reverse // flex-wrap: wrap-reverse
flex-nowrap       // flex-wrap: nowrap

// 内容对齐
content-center    // align-content: center
content-start     // align-content: flex-start
content-end       // align-content: flex-end
content-between   // align-content: space-between
content-around    // align-content: space-around
content-evenly    // align-content: space-evenly
content-baseline  // align-content: baseline
content-stretch   // align-content: stretch</pre>
      </div>

      <!-- Flex Wrap 示例 -->
      <div class="space-y-4">
        <div>
          <h4 class="font-medium text-gray-700 mb-2">flex-wrap:</h4>
          <div class="flex flex-wrap bg-gray-100 p-2 gap-2 h-32 content-start">
            <div class="bg-blue-500 text-white p-2">1</div>
            <div class="bg-blue-500 text-white p-2">2</div>
            <div class="bg-blue-500 text-white p-2">3</div>
            <div class="bg-blue-500 text-white p-2">4</div>
            <div class="bg-blue-500 text-white p-2">5</div>
            <div class="bg-blue-500 text-white p-2">6</div>
            <div class="bg-blue-500 text-white p-2">7</div>
            <div class="bg-blue-500 text-white p-2">8</div>
          </div>
        </div>
        <div>
          <h4 class="font-medium text-gray-700 mb-2">flex-nowrap (内容溢出):</h4>
          <div class="flex flex-nowrap bg-gray-100 p-2 gap-2 overflow-x-auto">
            <div class="bg-green-500 text-white p-2 whitespace-nowrap">1</div>
            <div class="bg-green-500 text-white p-2 whitespace-nowrap">2</div>
            <div class="bg-green-500 text-white p-2 whitespace-nowrap">3</div>
            <div class="bg-green-500 text-white p-2 whitespace-nowrap">4</div>
            <div class="bg-green-500 text-white p-2 whitespace-nowrap">5</div>
            <div class="bg-green-500 text-white p-2 whitespace-nowrap">6</div>
            <div class="bg-green-500 text-white p-2 whitespace-nowrap">7</div>
            <div class="bg-green-500 text-white p-2 whitespace-nowrap">8</div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
      <h3 class="text-lg font-semibold text-emerald-800 mb-2">Flexbox 工具类总结</h3>
      <ul class="text-emerald-700 space-y-1">
        <li>• <code class="bg-emerald-100 px-1 rounded">flex</code> - 启用 Flexbox 布局</li>
        <li>• <code class="bg-emerald-100 px-1 rounded">flex-{direction}</code> - 设置主轴方向</li>
        <li>• <code class="bg-emerald-100 px-1 rounded">justify-{value}</code> - 主轴对齐</li>
        <li>• <code class="bg-emerald-100 px-1 rounded">items-{value}</code> - 交叉轴对齐</li>
        <li>• <code class="bg-emerald-100 px-1 rounded">flex-{value}</code> - 控制元素伸缩</li>
        <li>• <code class="bg-emerald-100 px-1 rounded">gap-{size}</code> - 设置间距</li>
        <li>• <code class="bg-emerald-100 px-1 rounded">flex-wrap</code> - 控制换行</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
// Flexbox 工具类演示组件
// 展示了 Flex 容器、主轴对齐、交叉轴对齐、间距和换行等用法
</script>
