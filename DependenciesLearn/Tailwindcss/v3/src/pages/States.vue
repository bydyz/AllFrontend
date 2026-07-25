<template>
  <div class="space-y-8">
    <h1 class="text-3xl font-bold text-gray-800">状态变体 (States)</h1>

    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">悬停状态</h2>
      <p class="text-gray-600 mb-4">
        hover: 前缀用于定义元素在鼠标悬停时的样式。
      </p>

      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
        <pre>// 悬停状态
hover:bg-{color}      // hover:bg-blue-500
hover:text-{color}    // hover:text-white
hover:border-{color}  // hover:border-red-500
hover:shadow-{size}   // hover:shadow-lg
hover:scale-{value}   // hover:scale-105
hover:opacity-{value} // hover:opacity-80

// 示例
<button class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
  悬停变色
</button></pre>
      </div>

      <!-- 悬停状态示例 -->
      <div class="flex gap-4 flex-wrap">
        <button class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
          悬停变色
        </button>
        <button class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-all hover:shadow-lg">
          悬停阴影
        </button>
        <button class="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-all hover:scale-105">
          悬停放大
        </button>
        <button class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-all hover:opacity-80">
          悬停透明
        </button>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">焦点状态</h2>
      <p class="text-gray-600 mb-4">
        focus: 前缀用于定义元素获得焦点时的样式，常用于表单元素。
      </p>

      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
        <pre>// 焦点状态
focus:bg-{color}        // focus:bg-blue-500
focus:text-{color}      // focus:text-white
focus:border-{color}    // focus:border-blue-500
focus:ring-{color}      // focus:ring-blue-500
focus:ring-{size}       // focus:ring-2
focus:outline-{color}   // focus:outline-blue-500

// 示例
<input class="border focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none" /></pre>
      </div>

      <!-- 焦点状态示例 -->
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">焦点边框</label>
          <input
            type="text"
            class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
            placeholder="点击输入框查看焦点效果"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">焦点环</label>
          <input
            type="text"
            class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 outline-none transition-all"
            placeholder="点击输入框查看焦点环效果"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">焦点阴影</label>
          <input
            type="text"
            class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-transparent focus:shadow-lg focus:shadow-blue-200 outline-none transition-all"
            placeholder="点击输入框查看焦点阴影效果"
          />
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">激活状态</h2>
      <p class="text-gray-600 mb-4">
        active: 前缀用于定义元素被点击时的样式。
      </p>

      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
        <pre>// 激活状态
active:bg-{color}      // active:bg-blue-700
active:text-{color}    // active:text-white
active:scale-{value}   // active:scale-95

// 示例
<button class="bg-blue-500 active:bg-blue-700 text-white px-4 py-2 rounded">
  点击时变色
</button></pre>
      </div>

      <!-- 激活状态示例 -->
      <div class="flex gap-4">
        <button class="bg-blue-500 active:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors font-medium">
          点击变色
        </button>
        <button class="bg-green-500 active:bg-green-700 text-white px-6 py-3 rounded-lg transition-all active:scale-95 font-medium">
          点击缩小
        </button>
        <button class="bg-purple-500 active:bg-purple-700 text-white px-6 py-3 rounded-lg transition-all active:scale-95 active:shadow-inner font-medium">
          点击内阴影
        </button>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">禁用状态</h2>
      <p class="text-gray-600 mb-4">
        disabled: 前缀用于定义元素被禁用时的样式。
      </p>

      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
        <pre>// 禁用状态
disabled:bg-{color}      // disabled:bg-gray-300
disabled:text-{color}    // disabled:text-gray-500
disabled:cursor-not-allowed // disabled:cursor-not-allowed
disabled:opacity-{value} // disabled:opacity-50

// 示例
<button disabled class="bg-blue-500 disabled:bg-gray-300 text-white disabled:text-gray-500 px-4 py-2 rounded disabled:cursor-not-allowed">
  禁用按钮
</button></pre>
      </div>

      <!-- 禁用状态示例 -->
      <div class="flex gap-4">
        <button class="bg-blue-500 disabled:bg-gray-300 text-white disabled:text-gray-500 px-6 py-3 rounded-lg disabled:cursor-not-allowed font-medium">
          禁用按钮
        </button>
        <button disabled class="bg-blue-500 disabled:bg-gray-300 text-white disabled:text-gray-500 px-6 py-3 rounded-lg disabled:cursor-not-allowed disabled:opacity-50 font-medium">
          禁用 + 透明
        </button>
        <input
          type="text"
          disabled
          class="px-4 py-2 rounded-lg border border-gray-300 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed outline-none"
          placeholder="禁用输入框"
        />
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">分组状态</h2>
      <p class="text-gray-600 mb-4">
        group-: 前缀用于在父元素悬停时改变子元素样式。
      </p>

      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
        <pre>// 分组状态
// 在父元素上添加 group 类
// 在子元素上使用 group-hover: 前缀

<div class="group bg-gray-100 p-4 rounded-lg cursor-pointer">
  <h4 class="font-medium text-gray-700 group-hover:text-blue-600">标题</h4>
  <p class="text-gray-500 group-hover:text-gray-700">描述文字</p>
  <div class="opacity-0 group-hover:opacity-100 transition-opacity">
    显示更多内容
  </div>
</div></pre>
      </div>

      <!-- 分组状态示例 -->
      <div class="group bg-gray-100 p-6 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors">
        <h4 class="font-medium text-gray-700 group-hover:text-blue-600 transition-colors">悬停整个卡片</h4>
        <p class="text-gray-500 group-hover:text-gray-700 transition-colors mt-1">标题和描述文字会变色</p>
        <div class="opacity-0 group-hover:opacity-100 transition-opacity mt-2 text-sm text-blue-500">
          显示更多内容（悬停时出现）
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">其他状态</h2>

      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
        <pre>// 占位符状态（用于输入框）
placeholder:text-{color}  // placeholder:text-gray-400

// 首字母
first:font-bold            // 第一个元素加粗
last:mb-0                  // 最后一个元素无下边距

// 奇偶
odd:bg-gray-100            // 奇数行背景色
even:bg-gray-200           // 偶数行背景色

// 访问过（链接）
visited:text-purple-600    // 访问过的链接颜色

// 不同形式
valid:border-green-500     // 验证通过边框
invalid:border-red-500     // 验证失败边框
required:border-blue-500   // 必填字段边框
read-only:bg-gray-100      // 只读背景色</pre>
      </div>

      <!-- 占位符状态示例 -->
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">占位符样式</label>
          <input
            type="text"
            class="w-full px-4 py-2 rounded-lg border border-gray-300 placeholder:text-gray-400 placeholder:italic outline-none focus:border-blue-500"
            placeholder="这是占位符文字（斜体）"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">只读状态</label>
          <input
            type="text"
            readonly
            class="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-100 text-gray-600 cursor-not-allowed outline-none"
            value="这是只读输入框"
          />
        </div>
      </div>
    </div>

    <div class="bg-amber-50 border border-amber-200 rounded-lg p-4">
      <h3 class="text-lg font-semibold text-amber-800 mb-2">状态变体总结</h3>
      <ul class="text-amber-700 space-y-1">
        <li>• <code class="bg-amber-100 px-1 rounded">hover:</code> - 鼠标悬停状态</li>
        <li>• <code class="bg-amber-100 px-1 rounded">focus:</code> - 获得焦点状态</li>
        <li>• <code class="bg-amber-100 px-1 rounded">active:</code> - 被点击状态</li>
        <li>• <code class="bg-amber-100 px-1 rounded">disabled:</code> - 被禁用状态</li>
        <li>• <code class="bg-amber-100 px-1 rounded">group-hover:</code> - 父元素悬停时子元素状态</li>
        <li>• <code class="bg-amber-100 px-1 rounded">placeholder:</code> - 占位符状态</li>
        <li>• <code class="bg-amber-100 px-1 rounded">first:/last:</code> - 首尾元素状态</li>
        <li>• <code class="bg-amber-100 px-1 rounded">odd:/even:</code> - 奇偶元素状态</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
// 状态变体演示组件
// 展示了 hover、focus、active、disabled、group 等状态变体
</script>
