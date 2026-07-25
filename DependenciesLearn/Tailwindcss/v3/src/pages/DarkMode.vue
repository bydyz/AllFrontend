<template>
  <div class="space-y-8">
    <h1 class="text-3xl font-bold text-gray-800">暗黑模式 (Dark Mode)</h1>

    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">暗黑模式配置</h2>
      <p class="text-gray-600 mb-4">
        Tailwind CSS 内置了暗黑模式支持，可以通过类策略（class strategy）或媒体查询策略（media strategy）启用。
      </p>

      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
        <pre>// 在 tailwind.config.js 中配置暗黑模式
export default {
  // 使用类策略（推荐）
  darkMode: 'class',

  // 或使用媒体查询策略
  // darkMode: 'media',

  theme: {
    extend: {},
  },
  plugins: [],
}

// 在 HTML 中添加 dark 类启用暗黑模式
&lt;html class="dark"&gt;
  &lt;body&gt;
    &lt;!-- 暗黑模式样式将被激活 --&gt;
  &lt;/body&gt;
&lt;/html&gt;</pre>
      </div>

      <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
        <p class="text-yellow-700">
          <strong>注意：</strong>点击页面右上角的暗黑模式切换按钮可以预览效果。
        </p>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">暗黑模式工具类</h2>

      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
        <pre>// 使用 dark: 前缀
// 默认样式（亮色模式）
<div class="bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
  亮色/暗色背景和文字
</div>

// 常用暗黑模式样式
dark:bg-{color}        // 暗色背景
dark:text-{color}      // 暗色文字
dark:border-{color}    // 暗色边框
dark:shadow-{size}     // 暗色阴影
dark:ring-{color}      // 暗色环形边框

// 示例
<div class="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-4">
  自适应背景和文字
</div></pre>
      </div>

      <!-- 暗黑模式示例 -->
      <div class="space-y-4">
        <div class="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <h4 class="font-medium">自适应背景和文字</h4>
          <p class="text-sm text-gray-600 dark:text-gray-400">这段文字在暗色模式下会变亮</p>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm dark:shadow-lg">
            <h4 class="font-medium">带阴影</h4>
            <p class="text-sm text-gray-600 dark:text-gray-400">暗色模式下阴影更大</p>
          </div>
          <div class="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-4 rounded-lg border border-gray-200 dark:border-gray-700 ring-2 ring-blue-500 dark:ring-purple-500">
            <h4 class="font-medium">带环形边框</h4>
            <p class="text-sm text-gray-600 dark:text-gray-400">暗色模式下环形边框颜色不同</p>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">组件示例</h2>

      <!-- 卡片组件 -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-xl border border-gray-200 dark:border-gray-700 p-6 mb-4">
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">卡片标题</h3>
        <p class="text-gray-600 dark:text-gray-400 mb-4">
          这是一个卡片组件，展示了暗黑模式的完整应用。
        </p>
        <div class="flex gap-2">
          <button class="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
            主要按钮
          </button>
          <button class="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg transition-colors">
            次要按钮
          </button>
        </div>
      </div>

      <!-- 表单组件 -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-xl border border-gray-200 dark:border-gray-700 p-6 mb-4">
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">表单示例</h3>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">用户名</label>
            <input
              type="text"
              class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent outline-none"
              placeholder="请输入用户名"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">密码</label>
            <input
              type="password"
              class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent outline-none"
              placeholder="请输入密码"
            />
          </div>
          <div class="flex items-center">
            <input
              type="checkbox"
              class="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-blue-500 focus:ring-blue-500"
            />
            <label class="ml-2 text-sm text-gray-700 dark:text-gray-300">记住我</label>
          </div>
        </div>
      </div>

      <!-- 列表组件 -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-xl border border-gray-200 dark:border-gray-700 p-6">
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">列表示例</h3>
        <ul class="divide-y divide-gray-200 dark:divide-gray-700">
          <li class="py-3 flex items-center justify-between">
            <span class="text-gray-900 dark:text-white">项目 1</span>
            <span class="text-green-500 dark:text-green-400 text-sm">已完成</span>
          </li>
          <li class="py-3 flex items-center justify-between">
            <span class="text-gray-900 dark:text-white">项目 2</span>
            <span class="text-yellow-500 dark:text-yellow-400 text-sm">进行中</span>
          </li>
          <li class="py-3 flex items-center justify-between">
            <span class="text-gray-900 dark:text-white">项目 3</span>
            <span class="text-gray-500 dark:text-gray-400 text-sm">待处理</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">JavaScript 控制</h2>

      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
        <pre>// 使用 JavaScript 切换暗黑模式
const html = document.documentElement

// 切换暗黑模式
function toggleDarkMode() {
  html.classList.toggle('dark')
}

// 检查系统偏好
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
if (prefersDark) {
  html.classList.add('dark')
}

// Vue 3 中使用
import { ref, onMounted } from 'vue'

const isDark = ref(false)

onMounted(() => {
  // 检查本地存储
  const saved = localStorage.getItem('darkMode')
  if (saved !== null) {
    isDark.value = saved === 'true'
  } else {
    // 检查系统偏好
    isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  }

  // 应用暗黑模式
  if (isDark.value) {
    document.documentElement.classList.add('dark')
  }
})

// 切换函数
function toggleDark() {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark')
  localStorage.setItem('darkMode', isDark.value)
}</pre>
      </div>
    </div>

    <div class="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
      <h3 class="text-lg font-semibold text-indigo-800 mb-2">暗黑模式最佳实践</h3>
      <ul class="text-indigo-700 space-y-1">
        <li>• 使用 <code class="bg-indigo-100 px-1 rounded">dark:</code> 前缀为暗色模式定义样式</li>
        <li>• 考虑使用语义化颜色（如 <code class="bg-indigo-100 px-1 rounded">bg-primary</code>）而非具体颜色</li>
        <li>• 确保暗色模式下文字对比度足够</li>
        <li>• 使用 <code class="bg-indigo-100 px-1 rounded">class</code> 策略以支持手动切换</li>
        <li>• 在 <code class="bg-indigo-100 px-1 rounded">localStorage</code> 中保存用户偏好</li>
        <li>• 考虑系统偏好作为默认值</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
// 暗黑模式演示组件
// 展示了暗黑模式配置、工具类、组件示例和 JavaScript 控制
</script>
