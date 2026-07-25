<template>
  <div class="space-y-8">
    <h1 class="text-3xl font-bold text-gray-800">边框 (Borders)</h1>

    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">边框宽度</h2>
      <p class="text-gray-600 mb-4">
        边框宽度工具类用于设置元素边框的粗细。
      </p>

      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
        <pre>// 所有边框
border      // border-width: 1px
border-0    // border-width: 0
border-2    // border-width: 2px
border-4    // border-width: 4px
border-8    // border-width: 8px

// 单边边框
border-t    // border-top-width: 1px
border-r    // border-right-width: 1px
border-b    // border-bottom-width: 1px
border-l    // border-left-width: 1px

// 单边边框宽度
border-t-2  // border-top-width: 2px
border-r-4  // border-right-width: 4px
border-b-8  // border-bottom-width: 8px
border-l-0  // border-left-width: 0</pre>
      </div>

      <!-- 边框宽度示例 -->
      <div class="flex gap-4">
        <div class="border border-gray-400 p-4 rounded">border (1px)</div>
        <div class="border-2 border-gray-400 p-4 rounded">border-2 (2px)</div>
        <div class="border-4 border-gray-400 p-4 rounded">border-4 (4px)</div>
        <div class="border-8 border-gray-400 p-4 rounded">border-8 (8px)</div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">边框颜色</h2>

      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
        <pre>// 边框颜色
border-{color}        // border-red-500
border-{color}-{shade} // border-blue-600
border-transparent    // 透明边框
border-current        // 当前文字颜色

// 单边边框颜色
border-t-{color}      // border-t-red-500
border-r-{color}      // border-r-red-500
border-b-{color}      // border-b-red-500
border-l-{color}      // border-l-red-500</pre>
      </div>

      <!-- 边框颜色示例 -->
      <div class="flex gap-4">
        <div class="border-2 border-red-500 p-4 rounded">border-red-500</div>
        <div class="border-2 border-blue-500 p-4 rounded">border-blue-500</div>
        <div class="border-2 border-green-500 p-4 rounded">border-green-500</div>
        <div class="border-2 border-transparent p-4 rounded bg-gray-100">border-transparent</div>
        <div class="border-2 border-current p-4 rounded text-purple-600">border-current</div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">圆角</h2>

      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
        <pre>// 所有角
rounded       // border-radius: 0.25rem (4px)
rounded-none  // border-radius: 0
rounded-sm    // border-radius: 0.125rem (2px)
rounded       // border-radius: 0.25rem (4px)
rounded-md    // border-radius: 0.375rem (6px)
rounded-lg    // border-radius: 0.5rem (8px)
rounded-xl    // border-radius: 0.75rem (12px)
rounded-2xl   // border-radius: 1rem (16px)
rounded-3xl   // border-radius: 1.5rem (24px)
rounded-full  // border-radius: 9999px (圆形)

// 单个角
rounded-t     // border-top-left-radius, border-top-right-radius
rounded-r     // border-top-right-radius, border-bottom-right-radius
rounded-b     // border-bottom-right-radius, border-bottom-left-radius
rounded-l     // border-bottom-left-radius, border-top-left-radius

rounded-tl    // border-top-left-radius
rounded-tr    // border-top-right-radius
rounded-br    // border-bottom-right-radius
rounded-bl    // border-bottom-left-radius</pre>
      </div>

      <!-- 圆角示例 -->
      <div class="flex gap-4">
        <div class="bg-blue-500 text-white p-4 rounded-none">rounded-none</div>
        <div class="bg-blue-500 text-white p-4 rounded-sm">rounded-sm</div>
        <div class="bg-blue-500 text-white p-4 rounded">rounded</div>
        <div class="bg-blue-500 text-white p-4 rounded-md">rounded-md</div>
        <div class="bg-blue-500 text-white p-4 rounded-lg">rounded-lg</div>
        <div class="bg-blue-500 text-white p-4 rounded-xl">rounded-xl</div>
        <div class="bg-blue-500 text-white p-4 rounded-2xl">rounded-2xl</div>
        <div class="bg-blue-500 text-white p-4 rounded-full px-6">rounded-full</div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">边框样式</h2>

      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
        <pre>// 边框样式
border-solid   // border-style: solid
border-dashed  // border-style: dashed
border-dotted  // border-style: dotted
border-double  // border-style: double
border-none    // border-style: none
border-hidden  // border-style: hidden</pre>
      </div>

      <!-- 边框样式示例 -->
      <div class="flex gap-4">
        <div class="border-2 border-solid border-gray-500 p-4 rounded">border-solid</div>
        <div class="border-2 border-dashed border-gray-500 p-4 rounded">border-dashed</div>
        <div class="border-2 border-dotted border-gray-500 p-4 rounded">border-dotted</div>
        <div class="border-4 border-double border-gray-500 p-4 rounded">border-double</div>
        <div class="border-2 border-none border-gray-500 p-4 rounded bg-gray-100">border-none</div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">盒子阴影</h2>

      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
        <pre>// 盒子阴影
shadow-sm     // 小阴影
shadow        // 默认阴影
shadow-md     // 中等阴影
shadow-lg     // 大阴影
shadow-xl     // 超大阴影
shadow-2xl    // 2倍大阴影
shadow-inner  // 内阴影
shadow-none   // 无阴影

// 自定义阴影颜色
shadow-{color}-{shade}  // shadow-blue-500/50</pre>
      </div>

      <!-- 盒子阴影示例 -->
      <div class="flex gap-4">
        <div class="shadow-sm bg-white p-4 rounded-lg">shadow-sm</div>
        <div class="shadow bg-white p-4 rounded-lg">shadow</div>
        <div class="shadow-md bg-white p-4 rounded-lg">shadow-md</div>
        <div class="shadow-lg bg-white p-4 rounded-lg">shadow-lg</div>
        <div class="shadow-xl bg-white p-4 rounded-lg">shadow-xl</div>
        <div class="shadow-2xl bg-white p-4 rounded-lg">shadow-2xl</div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">轮廓</h2>

      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
        <pre>// 轮廓
outline        // outline-style: solid
outline-none   // outline-style: none
outline-dashed // outline-style: dashed
outline-dotted // outline-style: dotted
outline-double // outline-style: double

// 轮廓宽度
outline-0      // outline-width: 0
outline-1      // outline-width: 1px
outline-2      // outline-width: 2px
outline-4      // outline-width: 4px
outline-8      // outline-width: 8px

// 轮廓偏移
outline-offset-0   // outline-offset: 0
outline-offset-1   // outline-offset: 1px
outline-offset-2   // outline-offset: 2px
outline-offset-4   // outline-offset: 4px
outline-offset-8   // outline-offset: 8px</pre>
      </div>

      <!-- 轮廓示例 -->
      <div class="flex gap-4">
        <button class="outline outline-2 outline-blue-500 p-4 rounded-lg bg-white">
          outline
        </button>
        <button class="outline outline-dashed outline-2 outline-red-500 p-4 rounded-lg bg-white">
          outline-dashed
        </button>
        <button class="outline outline-dotted outline-2 outline-green-500 p-4 rounded-lg bg-white">
          outline-dotted
        </button>
        <button class="outline outline-2 outline-purple-500 outline-offset-2 p-4 rounded-lg bg-white">
          outline-offset-2
        </button>
      </div>
    </div>

    <div class="bg-orange-50 border border-orange-200 rounded-lg p-4">
      <h3 class="text-lg font-semibold text-orange-800 mb-2">边框工具类总结</h3>
      <ul class="text-orange-700 space-y-1">
        <li>• <code class="bg-orange-100 px-1 rounded">border-{size}</code> - 设置边框宽度</li>
        <li>• <code class="bg-orange-100 px-1 rounded">border-{color}</code> - 设置边框颜色</li>
        <li>• <code class="bg-orange-100 px-1 rounded">rounded-{size}</code> - 设置圆角</li>
        <li>• <code class="bg-orange-100 px-1 rounded">border-{style}</code> - 设置边框样式</li>
        <li>• <code class="bg-orange-100 px-1 rounded">shadow-{size}</code> - 设置盒子阴影</li>
        <li>• <code class="bg-orange-100 px-1 rounded">outline-{size}</code> - 设置轮廓</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
// 边框工具类演示组件
// 展示了边框宽度、颜色、圆角、样式、阴影和轮廓等用法
</script>
