<script setup>
// ========================================
// 图标使用示例
// ========================================
// 使用 unplugin-icons 自动导入图标
// 图标以 Vue 组件形式使用

// ========================================
// 方式1: 使用 Iconify 图标集
// ========================================
// 语法: ~icons/{collection}/{name}
// collection: 图标库名称 (如 mdi, fluent, carbon 等)
// name: 图标名称

import MdiHome from '~icons/mdi/home'
import MdiAccount from '~icons/mdi/account'
import MdiSettings from '~icons/mdi/settings'
import FluentHeartFilled from '~icons/fluent/heart-filled-24-filled'
import CarbonSun from '~icons/carbon/sun'

// ========================================
// 方式2: 使用本地图标 (需要配置 FileSystemIconLoader)
// ========================================
// 语法: ~icons/my-icons/{name}
// import MyIcon from '~icons/my-icons/my-icon'
</script>

<template>
  <div class="icons-demo">
    <h1>项目2: 图标插件演示</h1>
    <p>插件: unplugin-icons/vite + unplugin-icons/resolvers + unplugin-icons/loaders</p>

    <!-- ======================================== -->
    <!-- Iconify 图标集示例 -->
    <!-- ======================================== -->
    <section>
      <h2>Iconify 图标集</h2>
      <p>支持 100+ 图标库，按需加载</p>

      <div class="icon-grid">
        <!-- Material Design Icons (mdi) -->
        <div class="icon-item">
          <MdiHome style="font-size: 32px; color: #42b883;" />
          <span>mdi:home</span>
        </div>

        <div class="icon-item">
          <MdiAccount style="font-size: 32px; color: #3490dc;" />
          <span>mdi:account</span>
        </div>

        <div class="icon-item">
          <MdiSettings style="font-size: 32px; color: #e9967a;" />
          <span>mdi:settings</span>
        </div>

        <!-- Fluent UI 图标 -->
        <div class="icon-item">
          <FluentHeartFilled style="font-size: 32px; color: #ff6b6b;" />
          <span>fluent:heart</span>
        </div>

        <!-- Carbon 图标 -->
        <div class="icon-item">
          <CarbonSun style="font-size: 32px; color: #f39c12;" />
          <span>carbon:sun</span>
        </div>
      </div>
    </section>

    <!-- ======================================== -->
    <!-- 图标组件属性 -->
    <!-- ======================================== -->
    <section>
      <h2>图标组件属性</h2>
      <p>图标组件支持以下属性:</p>
      <ul>
        <li><code>style</code> - 内联样式 (颜色、大小等)</li>
        <li><code>class</code> - CSS 类名</li>
        <li><code>data-*</code> - 数据属性</li>
      </ul>

      <div class="icon-examples">
        <!-- 通过 style 设置大小和颜色 -->
        <MdiHome style="font-size: 24px; color: blue;" />

        <!-- 通过 class 设置样式 -->
        <MdiHome class="icon-large" />

        <!-- 组合使用 -->
        <MdiAccount style="font-size: 40px;" class="icon-animated" />
      </div>
    </section>
  </div>
</template>

<style scoped>
.icons-demo {
  padding: 20px;
}

.icon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 20px;
  margin: 20px 0;
}

.icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  transition: transform 0.2s;
}

.icon-item:hover {
  transform: scale(1.05);
  border-color: #42b883;
}

.icon-item span {
  margin-top: 8px;
  font-size: 12px;
  color: #666;
}

.icon-examples {
  display: flex;
  gap: 20px;
  align-items: center;
  margin: 10px 0;
}

.icon-large {
  font-size: 48px !important;
  color: #e74c3c !important;
}

.icon-animated {
  color: #9b59b6;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

code {
  background-color: #f4f4f4;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: monospace;
}
</style>
