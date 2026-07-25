<template>
  <div class="space-y-8">
    <h1 class="text-3xl font-bold text-gray-800">首页</h1>

    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">Tailwind CSS v3 学习指南</h2>
      <p class="text-gray-600 mb-4">
        Tailwind CSS 是一个功能优先的 CSS 框架，它提供了大量的原子化工具类，
        让你可以在 HTML 中快速构建自定义设计，而不需要编写大量的自定义 CSS。
      </p>

      <h3 class="text-lg font-semibold text-gray-700 mb-2">核心概念</h3>
      <ul class="list-disc list-inside text-gray-600 mb-4 space-y-1">
        <li><strong>功能优先</strong>：通过组合小的工具类来构建复杂的设计</li>
        <li><strong>原子化</strong>：每个类名对应一个具体的 CSS 属性</li>
        <li><strong>响应式</strong>：内置响应式断点，支持移动优先设计</li>
        <li><strong>可定制</strong>：通过配置文件完全自定义主题</li>
      </ul>

      <h3 class="text-lg font-semibold text-gray-700 mb-2">快速开始</h3>
      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
        <pre>// 安装 Tailwind CSS
npm install -D tailwindcss postcss autoprefixer

// 初始化配置文件
npx tailwindcss init -p

// 在 CSS 中添加指令
@tailwind base;
@tailwind components;
@tailwind utilities;</pre>
      </div>
    </div>

    <div class="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
      <h3 class="text-xl font-semibold mb-2">开始学习</h3>
      <p class="mb-4">点击顶部导航栏中的各个功能模块，了解 Tailwind CSS v3 的具体用法。</p>
      <router-link
        to="/spacing"
        class="inline-block bg-white text-indigo-600 px-4 py-2 rounded-lg font-medium hover:bg-indigo-50 transition-colors"
      >
        从间距开始 →
      </router-link>
    </div>
  </div>
</template>

<script setup>
// 首页组件 - 展示 Tailwind CSS v3 的概述和快速开始指南
</script>
