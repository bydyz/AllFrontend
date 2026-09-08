<template>
  <div class="dashboard">
    <el-row :gutter="20" class="stat-row">
      <el-col :span="6" v-for="item in stats" :key="item.title">
        <el-card shadow="hover" class="stat-card">
          <div class="stat-content">
            <div class="stat-info">
              <div class="stat-title">{{ item.title }}</div>
              <div class="stat-value">{{ item.value }}</div>
            </div>
            <el-icon :size="40" :color="item.color">
              <component :is="item.icon" />
            </el-icon>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-card class="welcome-card">
      <template #header>
        <div class="card-header">
          <span>欢迎使用后台管理系统</span>
        </div>
      </template>
      <div class="welcome-content">
        <p>这是一个基于 Vue3 + Element Plus + Vite 构建的后台管理系统模板。</p>
      </div>
    </el-card>

    <el-card class="about-card">
      <template #header>
        <div class="card-header">
          <span>技术栈</span>
        </div>
      </template>

      <el-descriptions :column="2" border>
        <el-descriptions-item label="框架">Vue 3 (Composition API)</el-descriptions-item>
        <el-descriptions-item label="UI库">Element Plus</el-descriptions-item>
        <el-descriptions-item label="构建工具">Vite</el-descriptions-item>
        <el-descriptions-item label="路由">Vue Router 4</el-descriptions-item>
        <el-descriptions-item label="状态管理">Pinia</el-descriptions-item>
      </el-descriptions>

      <el-divider />

      <el-descriptions title="工程特性" :column="1" border>
        <el-descriptions-item label="布局">
          左侧菜单 + 顶部导航 + 内容区域的经典后台布局
        </el-descriptions-item>
        <el-descriptions-item label="菜单折叠">
          支持菜单展开/折叠，使用 Pinia 状态管理
        </el-descriptions-item>
        <el-descriptions-item label="路由">
          基于 Vue Router 的页面导航，支持嵌套路由
        </el-descriptions-item>
        <el-descriptions-item label="图标">
          使用 @element-plus/icons-vue 图标库
        </el-descriptions-item>
      </el-descriptions>

      <el-divider />

      <h3>目录结构</h3>
      <el-tree :data="treeData" default-expand-all :props="{ children: 'children', label: 'label' }" />
    </el-card>
  </div>
</template>

<script setup>
const stats = [
  { title: '访问量', value: '1,024', icon: 'View', color: '#409EFF' },
  { title: '用户数', value: '128', icon: 'User', color: '#67C23A' },
  { title: '订单数', value: '64', icon: 'ShoppingCart', color: '#E6A23C' },
  { title: '收入', value: '¥8,888', icon: 'Money', color: '#F56C6C' }
]

const treeData = [
  {
    label: 'Vue3_ElementPlus/',
    children: [
      { label: 'index.html' },
      { label: 'package.json' },
      { label: 'vite.config.js' },
      {
        label: 'src/',
        children: [
          { label: 'main.js' },
          { label: 'App.vue' },
          { label: 'router/index.js' },
          { label: 'stores/index.js' },
          { label: 'components/Tabs.vue' },
          {
            label: 'views/',
            children: [
              { label: 'Layout.vue' },
              { label: 'Dashboard.vue' }
            ]
          }
        ]
      }
    ]
  }
]
</script>

<style scoped>
.dashboard {
  padding: 0;
}

.stat-row {
  margin-bottom: 20px;
}

.stat-card {
  cursor: pointer;
}

.stat-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stat-title {
  color: #909399;
  font-size: 14px;
  margin-bottom: 8px;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  color: #303133;
}

.welcome-card,
.about-card {
  margin-top: 16px;
}

.card-header {
  font-size: 16px;
  font-weight: 500;
}

.welcome-content p {
  line-height: 2;
  color: #606266;
}

h3 {
  margin: 16px 0 12px;
  color: #303133;
}
</style>