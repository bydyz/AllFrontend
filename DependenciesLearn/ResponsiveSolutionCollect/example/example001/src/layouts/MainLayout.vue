<template>
  <div class="main-layout" :class="{ 'is-collapse': menuStore.isCollapse }">
    <aside class="sidebar">
      <div class="logo">
        <span v-if="!menuStore.isCollapse">后台管理系统</span>
        <span v-else>BS</span>
      </div>
      <el-menu
        :default-active="route.path"
        :collapse="menuStore.isCollapse"
        router
        background-color="#001529"
        text-color="#ffffffa6"
        active-text-color="#ffffff"
      >
        <el-menu-item index="/overview">
          <el-icon><DataBoard /></el-icon>
          <template #title>总览</template>
        </el-menu-item>
        <el-menu-item index="/menu">
          <el-icon><Menu /></el-icon>
          <template #title>菜单控制</template>
        </el-menu-item>
        <el-menu-item index="/role">
          <el-icon><UserFilled /></el-icon>
          <template #title>角色管理</template>
        </el-menu-item>
        <el-menu-item index="/user">
          <el-icon><User /></el-icon>
          <template #title>用户管理</template>
        </el-menu-item>
        <el-menu-item index="/my-test">
          <el-icon><Document /></el-icon>
          <template #title>MyTest</template>
        </el-menu-item>
      </el-menu>
    </aside>
    <div class="main-content">
      <header class="header">
        <div class="header-left">
          <el-icon class="collapse-btn" @click="menuStore.toggleCollapse">
            <Fold v-if="!menuStore.isCollapse" />
            <Expand v-else />
          </el-icon>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{ route.meta.title }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="header-right">
          <span class="username">{{ userStore.username }}</span>
          <el-dropdown @command="handleCommand">
            <el-icon class="dropdown-icon"><ArrowDown /></el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </header>
      <main class="page-content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'
import { useMenuStore } from '../stores/menu'
import { DataBoard, Menu, UserFilled, User, Fold, Expand, ArrowDown, Document } from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const menuStore = useMenuStore()

const handleCommand = (command) => {
  if (command === 'logout') {
    userStore.logout()
    router.push('/login')
  }
}
</script>

<style scoped>
.main-layout {
  display: flex;
  min-height: 100vh;
  transition: all 0.3s;
}

.sidebar {
  background-color: #001529;
  color: #fff;
  transition: width 0.3s;
  width: 220px;
  flex-shrink: 0;
}

.is-collapse .sidebar {
  width: 64px;
}

.logo {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  background-color: #002140;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.header {
  height: 60px;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  z-index: 1;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 15px;
}

.collapse-btn {
  font-size: 20px;
  cursor: pointer;
  transition: color 0.3s;
}

.collapse-btn:hover {
  color: #409eff;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 10px;
}

.username {
  font-size: 14px;
  color: #606266;
}

.dropdown-icon {
  cursor: pointer;
  font-size: 16px;
}

.page-content {
  flex: 1;
  padding: 20px;
  background-color: #f0f2f5;
  overflow-y: auto;
}

:deep(.el-menu) {
  border-right: none;
}
</style>
