<template>
  <el-container class="layout-container">
    <el-aside :width="isCollapse ? '64px' : '220px'" class="aside">
      <div class="logo">
        <el-icon size="24"><Monitor /></el-icon>
        <span v-show="!isCollapse">后台管理系统</span>
      </div>
      <el-menu
        :default-active="route.path"
        :collapse="isCollapse"
        router
        background-color="#304156"
        text-color="#bfcbd9"
        active-text-color="#409EFF"
      >
        <el-menu-item v-for="item in menuItems" :key="item.path" :index="item.path">
          <el-icon><component :is="item.icon" /></el-icon>
          <template #title>{{ item.title }}</template>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header class="header">
        <el-icon class="collapse-btn" @click="appStore.toggleCollapse" size="20">
          <component :is="isCollapse ? 'Expand' : 'Fold'" />
        </el-icon>
        <span class="header-title">{{ route.meta.title }}</span>
      </el-header>

      <Tabs />

      <el-main class="main">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAppStore, useTabStore } from '../stores'
import Tabs from '../components/Tabs.vue'

const route = useRoute()
const router = useRouter()
const appStore = useAppStore()
const tabStore = useTabStore()
const isCollapse = computed(() => appStore.isCollapse)

const menuItems = [
  { path: '/dashboard', title: '总览', icon: 'DataBoard' }
]

function addCurrentTab() {
  const menuItem = menuItems.find(m => m.path === route.path)
  if (menuItem) {
    tabStore.addTab(menuItem)
  }
}

addCurrentTab()

router.afterEach(() => {
  addCurrentTab()
})
</script>

<style scoped>
.layout-container {
  height: 100%;
}

.aside {
  background-color: #304156;
  transition: width 0.3s;
  overflow: hidden;
}

.logo {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  border-bottom: 1px solid #3a4a5c;
}

.el-menu {
  border-right: none;
}

.header {
  display: flex;
  align-items: center;
  background: #fff;
  border-bottom: 1px solid #e6e6e6;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}

.collapse-btn {
  cursor: pointer;
  color: #666;
}
.collapse-btn:hover {
  color: #409EFF;
}

.header-title {
  margin-left: 16px;
  font-size: 18px;
  font-weight: 500;
}

.main {
  background: #f0f2f5;
}
</style>