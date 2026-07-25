<template>
  <div class="space-y-8">
    <h1 class="text-3xl font-bold text-gray-800">布局 (Layout)</h1>

    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">显示方式</h2>
      <p class="text-gray-600 mb-4">
        显示方式工具类用于控制元素的 display 属性。
      </p>

      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
        <pre>// 显示方式
block         // display: block
inline-block  // display: inline-block
inline        // display: inline
flex          // display: flex
inline-flex   // display: inline-flex
grid          // display: grid
inline-grid   // display: inline-grid
table         // display: table
inline-table  // display: inline-table
table-caption // display: table-caption
table-cell    // display: table-cell
table-column  // display: table-column
table-column-group // display: table-column-group
table-footer-group  // display: table-footer-group
table-header-group  // display: table-header-group
table-row-group     // display: table-row-group
table-row           // display: table-row
flow-root           // display: flow-root
contents            // display: contents
list-item           // display: list-item
hidden              // display: none</pre>
      </div>

      <!-- 显示方式示例 -->
      <div class="space-y-2">
        <div>
          <span class="font-medium text-gray-700">block:</span>
          <div class="block bg-blue-500 text-white p-2 w-32">block 元素1</div>
          <div class="block bg-blue-600 text-white p-2 w-32">block 元素2</div>
        </div>
        <div>
          <span class="font-medium text-gray-700">inline-block:</span>
          <div class="inline-block bg-green-500 text-white p-2">inline-block 1</div>
          <div class="inline-block bg-green-600 text-white p-2">inline-block 2</div>
        </div>
        <div>
          <span class="font-medium text-gray-700">inline:</span>
          <span class="inline bg-purple-500 text-white p-2">inline 1</span>
          <span class="inline bg-purple-600 text-white p-2">inline 2</span>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">溢出处理</h2>

      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
        <pre>// 溢出处理
overflow-auto       // overflow: auto
overflow-hidden     // overflow: hidden
overflow-clip       // overflow: clip
overflow-visible    // overflow: visible
overflow-scroll     // overflow: scroll
overflow-x-auto     // overflow-x: auto
overflow-x-hidden   // overflow-x: hidden
overflow-x-clip     // overflow-x: clip
overflow-x-visible  // overflow-x: visible
overflow-x-scroll   // overflow-x: scroll
overflow-y-auto     // overflow-y: auto
overflow-y-hidden   // overflow-y: hidden
overflow-y-clip     // overflow-y: clip
overflow-y-visible  // overflow-y: visible
overflow-y-scroll   // overflow-y: scroll</pre>
      </div>

      <!-- 溢出示例 -->
      <div class="flex gap-4">
        <div class="overflow-auto h-32 w-48 border border-gray-300 p-2">
          <p>overflow-auto - 当内容超出容器时会显示滚动条。</p>
          <p>这段文字会超出容器高度。</p>
          <p>滚动查看更多内容。</p>
          <p>继续滚动...</p>
          <p>更多内容...</p>
        </div>
        <div class="overflow-hidden h-32 w-48 border border-gray-300 p-2">
          <p>overflow-hidden - 超出部分会被隐藏。</p>
          <p>这段文字会超出容器高度。</p>
          <p>但是你看不到超出的部分。</p>
          <p>更多内容...</p>
          <p>被隐藏了...</p>
        </div>
        <div class="overflow-scroll h-32 w-48 border border-gray-300 p-2">
          <p>overflow-scroll - 始终显示滚动条。</p>
          <p>这段文字会超出容器高度。</p>
          <p>滚动条始终可见。</p>
          <p>继续滚动...</p>
          <p>更多内容...</p>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">定位</h2>

      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
        <pre>// 定位方式
static    // position: static
fixed     // position: fixed
absolute  // position: absolute
relative  // position: relative
sticky    // position: sticky

// 定位偏移
top-0      // top: 0
top-1      // top: 0.25rem (4px)
top-2      // top: 0.5rem (8px)
top-4      // top: 1rem (16px)
top-auto   // top: auto

right-0    // right: 0
right-1    // right: 0.25rem
right-2    // right: 0.5rem
right-4    // right: 1rem
right-auto // right: auto

bottom-0   // bottom: 0
bottom-1   // bottom: 0.25rem
bottom-2   // bottom: 0.5rem
bottom-4   // bottom: 1rem
bottom-auto // bottom: auto

left-0     // left: 0
left-1     // left: 0.25rem
left-2     // left: 0.5rem
left-4     // left: 1rem
left-auto  // left: auto

// inset（同时设置 top, right, bottom, left）
inset-0    // top: 0; right: 0; bottom: 0; left: 0
inset-1    // top: 0.25rem; right: 0.25rem; bottom: 0.25rem; left: 0.25rem
inset-2    // top: 0.5rem; right: 0.5rem; bottom: 0.5rem; left: 0.5rem
inset-4    // top: 1rem; right: 1rem; bottom: 1rem; left: 1rem
inset-auto // top: auto; right: auto; bottom: auto; left: auto</pre>
      </div>

      <!-- 定位示例 -->
      <div class="relative h-48 border border-gray-300 p-4">
        <div class="absolute top-2 left-2 bg-red-500 text-white p-2 rounded">
          absolute top-2 left-2
        </div>
        <div class="absolute top-2 right-2 bg-blue-500 text-white p-2 rounded">
          absolute top-2 right-2
        </div>
        <div class="absolute bottom-2 left-2 bg-green-500 text-white p-2 rounded">
          absolute bottom-2 left-2
        </div>
        <div class="absolute bottom-2 right-2 bg-purple-500 text-white p-2 rounded">
          absolute bottom-2 right-2
        </div>
        <div class="absolute inset-0 m-auto bg-yellow-500 text-white p-2 rounded w-fit h-fit">
          absolute inset-0 m-auto（居中）
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">Z-Index</h2>

      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
        <pre>// Z-Index
z-0      // z-index: 0
z-10     // z-index: 10
z-20     // z-index: 20
z-30     // z-index: 30
z-40     // z-index: 40
z-50     // z-index: 50
z-auto   // z-index: auto

// 负值
-z-10    // z-index: -10
-z-20    // z-index: -20
-z-30    // z-index: -30
-z-40    // z-index: -40
-z-50    // z-index: -50</pre>
      </div>

      <!-- Z-Index 示例 -->
      <div class="relative h-48">
        <div class="absolute inset-0 bg-red-200 p-4 z-10">
          z-10 - 底层
        </div>
        <div class="absolute inset-4 bg-yellow-200 p-4 z-20">
          z-20 - 中间层
        </div>
        <div class="absolute inset-8 bg-green-200 p-4 z-30">
          z-30 - 顶层
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">可见性</h2>

      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
        <pre>// 可见性
visible    // visibility: visible
invisible  // visibility: invisible（元素仍占据空间）
collapse   // visibility: collapse（用于表格元素）</pre>
      </div>

      <!-- 可见性示例 -->
      <div class="flex gap-4">
        <div class="bg-blue-500 text-white p-4 rounded">visible</div>
        <div class="invisible bg-red-500 text-white p-4 rounded">invisible（看不见但占空间）</div>
        <div class="bg-green-500 text-white p-4 rounded">我在这里</div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">Object Fit</h2>

      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
        <pre>// Object Fit（用于替换元素如 img、video）
object-contain   // object-fit: contain
object-cover     // object-fit: cover
object-fill      // object-fit: fill
object-none      // object-fit: none
object-scale-down // object-fit: scale-down

// Object Position
object-bottom    // object-position: bottom
object-center    // object-position: center
object-left      // object-position: left
object-left-bottom // object-position: left bottom
object-left-top    // object-position: left top
object-right     // object-position: right
object-right-bottom // object-position: right bottom
object-right-top    // object-position: right top
object-top       // object-position: top</pre>
      </div>

      <!-- Object Fit 示例 -->
      <div class="flex gap-4">
        <div class="w-32 h-32 border border-gray-300">
          <img src="https://picsum.photos/200/300" class="w-full h-full object-contain" alt="contain" />
          <div class="text-center text-xs">object-contain</div>
        </div>
        <div class="w-32 h-32 border border-gray-300">
          <img src="https://picsum.photos/200/300" class="w-full h-full object-cover" alt="cover" />
          <div class="text-center text-xs">object-cover</div>
        </div>
        <div class="w-32 h-32 border border-gray-300">
          <img src="https://picsum.photos/200/300" class="w-full h-full object-fill" alt="fill" />
          <div class="text-center text-xs">object-fill</div>
        </div>
        <div class="w-32 h-32 border border-gray-300">
          <img src="https://picsum.photos/200/300" class="w-full h-full object-none" alt="none" />
          <div class="text-center text-xs">object-none</div>
        </div>
      </div>
    </div>

    <div class="bg-cyan-50 border border-cyan-200 rounded-lg p-4">
      <h3 class="text-lg font-semibold text-cyan-800 mb-2">布局工具类总结</h3>
      <ul class="text-cyan-700 space-y-1">
        <li>• <code class="bg-cyan-100 px-1 rounded">display</code> - 控制元素显示方式</li>
        <li>• <code class="bg-cyan-100 px-1 rounded">overflow</code> - 处理内容溢出</li>
        <li>• <code class="bg-cyan-100 px-1 rounded">position</code> - 控制定位方式</li>
        <li>• <code class="bg-cyan-100 px-1 rounded">top/right/bottom/left</code> - 定位偏移</li>
        <li>• <code class="bg-cyan-100 px-1 rounded">z-{value}</code> - 控制层叠顺序</li>
        <li>• <code class="bg-cyan-100 px-1 rounded">visibility</code> - 控制可见性</li>
        <li>• <code class="bg-cyan-100 px-1 rounded">object-fit</code> - 控制替换元素的填充方式</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
// 布局工具类演示组件
// 展示了显示方式、溢出、定位、Z-Index、可见性和Object Fit等用法
</script>
