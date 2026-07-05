<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

const isMobile = ref(false)
const isSidebarCollapsed = ref(false)
const sidebarWidth = ref(300) // 默认宽度
const isDragging = ref(false)
const minWidth = 200
const maxWidth = 480
const mediaQuery = ref(null)

// 从 LocalStorage 读取用户偏好
const loadPreferences = () => {
  const savedWidth = localStorage.getItem('sidebarWidth')
  if (savedWidth) {
    sidebarWidth.value = parseInt(savedWidth, 10)
  }
}

// 保存用户偏好到 LocalStorage
const saveCollapsedPreference = () => {
  localStorage.setItem('sidebarCollapsed', isSidebarCollapsed.value.toString())
}

const saveWidthPreference = () => {
  localStorage.setItem('sidebarWidth', sidebarWidth.value.toString())
}

// 处理媒体查询变化
const handleMediaChange = (e) => {
  isMobile.value = e.matches
  if (isMobile.value) {
    // 进入移动端：自动折叠侧边栏（完全隐藏）
    isSidebarCollapsed.value = true
  } else {
    // 进入桌面端：恢复 LocalStorage 中的偏好
    const savedCollapsed = localStorage.getItem('sidebarCollapsed')
    if (savedCollapsed !== null) {
      isSidebarCollapsed.value = savedCollapsed === 'true'
    } else {
      isSidebarCollapsed.value = false
    }
  }
}

onMounted(() => {
  // 加载用户宽度偏好
  loadPreferences()
  
  // 初始化媒体查询
  mediaQuery.value = window.matchMedia('(max-width: 992px)')
  mediaQuery.value.addEventListener('change', handleMediaChange)
  
  // 初始检查：设置移动端状态
  isMobile.value = mediaQuery.value.matches
  
  // 初始折叠状态：移动端默认折叠，桌面端默认展开
  if (isMobile.value) {
    isSidebarCollapsed.value = true
  } else {
    // 桌面端：检查 LocalStorage 中的用户偏好
    const savedCollapsed = localStorage.getItem('sidebarCollapsed')
    if (savedCollapsed !== null) {
      // 只在桌面端尊重用户的 LocalStorage 偏好
      isSidebarCollapsed.value = savedCollapsed === 'true'
    } else {
      isSidebarCollapsed.value = false
    }
  }
})

onUnmounted(() => {
  if (mediaQuery.value) {
    mediaQuery.value.removeEventListener('change', handleMediaChange)
  }
})

// 监听折叠状态变化，保存到 LocalStorage（仅桌面端）
watch(isSidebarCollapsed, (newVal) => {
  if (!isMobile.value) {
    saveCollapsedPreference()
  }
})

// 拖拽调整宽度
const startDrag = (e) => {
  isDragging.value = true
  document.addEventListener('mousemove', onDrag)
  document.addEventListener('mouseup', stopDrag)
}

const onDrag = (e) => {
  if (!isDragging.value) return
  const newWidth = e.clientX
  if (newWidth >= minWidth && newWidth <= maxWidth) {
    sidebarWidth.value = newWidth
  }
}

const stopDrag = () => {
  isDragging.value = false
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
  // 保存到 LocalStorage
  localStorage.setItem('sidebarWidth', sidebarWidth.value.toString())
}

const toggleSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value
  // 仅桌面端保存到 LocalStorage
  if (!isMobile.value) {
    localStorage.setItem('sidebarCollapsed', isSidebarCollapsed.value.toString())
  }
}
</script>

<template>
  <div class="app-container">
    <!-- 顶部通栏 -->
    <header class="top-bar">
      <button class="hamburger-menu" @click="toggleSidebar">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 6H21M3 12H21M3 18H21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
      <div class="logo">响应式布局示例</div>
    </header>

    <div class="main-layout">
      <!-- 遮罩层（移动端侧边栏展开时显示） -->
      <div 
        class="sidebar-overlay" 
        :class="{ active: isMobile && !isSidebarCollapsed }"
        @click="toggleSidebar"
      ></div>
      
      <!-- 左侧侧边栏 -->
      <aside 
        class="sidebar" 
        :class="{ collapsed: isSidebarCollapsed }"
        :style="isMobile ? {} : { width: isSidebarCollapsed ? '80px' : sidebarWidth + 'px' }"
      >
        <div class="sidebar-content">
          <div class="sidebar-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 12L12 3L21 12M5 10V19C5 19.5 5.5 20 6 20H9M15 20H18C18.5 20 19 19.5 19 19V10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span v-if="!isSidebarCollapsed">首页</span>
          </div>
          <div class="sidebar-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 6H20M4 12H20M4 18H12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
            <span v-if="!isSidebarCollapsed">菜单</span>
          </div>
          <div class="sidebar-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" stroke-width="2"/>
              <path d="M19.4 15C19.1277 15.6171 19.2583 16.3378 19.73 16.82L19.79 16.88C20.1656 17.2551 20.3766 17.7642 20.3766 18.295C20.3766 18.8258 20.1656 19.3349 19.79 19.71C19.4149 20.0856 18.9058 20.2966 18.375 20.2966C17.8442 20.2966 17.3351 20.0856 16.96 19.71L16.9 19.65C16.4178 19.1783 15.6971 19.0477 15.08 19.32C14.4755 19.5791 14.0826 20.1724 14.08 20.81V21C14.08 22.1046 13.1846 23 12.08 23C10.9754 23 10.08 22.1046 10.08 21V20.91C10.0642 20.2778 9.64367 19.6909 9 19.44C8.38291 19.1677 7.66219 19.2983 7.18 19.78L7.12 19.84C6.74493 20.2156 6.23584 20.4266 5.705 20.4266C5.17416 20.4266 4.66507 20.2156 4.29 19.84C3.91445 19.4649 3.70343 18.9558 3.70343 18.425C3.70343 17.8942 3.91445 17.3851 4.29 17.01L4.35 16.95C4.82167 16.4678 4.95231 15.7471 4.68 15.13C4.42093 14.5255 3.82764 14.1326 3.19 14.13H3C1.89543 14.13 1 13.2346 1 12.13C1 11.0254 1.89543 10.13 3 10.13H3.09C3.72236 10.1142 4.30924 9.69367 4.56 9.05C4.83231 8.43291 4.70167 7.71219 4.22 7.23L4.16 7.17C3.78445 6.79493 3.57343 6.28584 3.57343 5.755C3.57343 5.22416 3.78445 4.71507 4.16 4.34C4.53507 3.96445 5.04416 3.75343 5.575 3.75343C6.10584 3.75343 6.61493 3.96445 6.99 4.34L7.05 4.4C7.53219 4.87167 8.25291 5.00231 8.87 4.73C9.47453 4.47093 9.86741 3.87764 9.87 3.24V3C9.87 1.89543 10.7654 1 11.87 1C12.9746 1 13.87 1.89543 13.87 3V3.09C13.8758 3.72236 14.2963 4.30924 14.94 4.56C15.5571 4.83231 16.2778 4.70167 16.76 4.22L16.82 4.16C17.1951 3.78445 17.7042 3.57343 18.235 3.57343C18.7658 3.57343 19.2749 3.78445 19.65 4.16C20.0256 4.53507 20.2366 5.04416 20.2366 5.575C20.2366 6.10584 20.0256 6.61493 19.65 6.99L19.59 7.05C19.1183 7.53219 18.9877 8.25291 19.26 8.87C19.5191 9.47453 20.1124 9.86741 20.75 9.87H21C22.1046 9.87 23 10.7654 23 11.87C23 12.9746 22.1046 13.87 21 13.87H20.91C20.2778 13.8758 19.6909 14.2963 19.44 14.94" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span v-if="!isSidebarCollapsed">设置</span>
          </div>
        </div>
        <!-- 拖拽手柄 -->
        <div 
          v-if="!isSidebarCollapsed" 
          class="drag-handle"
          @mousedown="startDrag"
        ></div>
      </aside>

      <!-- 右侧主要内容区 -->
      <main class="main-content">
        <div class="content-wrapper">
          <h1>响应式布局示例</h1>
          <p class="text-block">
            这是一个响应式布局示例，展示了顶部通栏、左侧固定侧边栏和右侧自适应内容区域的实现。
            侧边栏支持折叠和拖拽调整宽度，浏览器会记住用户的偏好。
          </p>
          
          <div class="card-grid">
            <div class="card" v-for="i in 6" :key="i">
              <div class="card-header">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" stroke-width="2"/>
                  <path d="M3 9H21M9 21V9" stroke="currentColor" stroke-width="2"/>
                </svg>
                <h3>卡片 {{ i }}</h3>
              </div>
              <p>这是一个响应式卡片组件，使用了 CSS Grid 布局，可以根据屏幕宽度自动调整列数。</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<style>
/* 全局样式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: 62.5%; /* 10px = 1rem */
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 1.6rem;
  line-height: 1.5;
  color: #333;
  background-color: #f5f5f5;
}

/* 顶部通栏 */
.top-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 6rem;
  background-color: #2c3e50;
  color: white;
  display: flex;
  align-items: center;
  padding: 0 2rem;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.hamburger-menu {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0.5rem;
  margin-right: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
  border-radius: 4px;
}

.hamburger-menu:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.logo {
  font-size: 2rem;
  font-weight: bold;
}

/* 主布局 */
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-layout {
  display: flex;
  margin-top: 6rem; /* 顶部通栏高度 */
  flex: 1;
}

/* 侧边栏 */
.sidebar {
  position: fixed;
  top: 6rem;
  left: 0;
  bottom: 0;
  background-color: #34495e;
  color: white;
  overflow-y: auto;
  overflow-x: hidden;
  transition: width 0.3s ease, transform 0.3s ease;
  display: flex;
  flex-direction: column;
  z-index: 900;
}

.sidebar.collapsed {
  width: 80px;
}

/* 桌面端：侧边栏宽度由 style 绑定控制 */
@media (min-width: 993px) {
  .sidebar {
    width: 300px; /* 默认宽度，会被 style 覆盖 */
  }
}

.sidebar-content {
  flex: 1;
  padding: 1rem 0;
  min-width: 0;
}

.sidebar-item {
  display: flex;
  align-items: center;
  padding: 1.2rem 2rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.sidebar-item:hover {
  background-color: #2c3e50;
}

.sidebar-item span {
  margin-left: 1.2rem;
  font-size: 1.4rem;
  white-space: nowrap;
}

/* 拖拽手柄 */
.drag-handle {
  width: 4px;
  cursor: col-resize;
  background-color: transparent;
  transition: background-color 0.2s;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
}

.drag-handle:hover {
  background-color: #3498db;
}

/* 主要内容区 */
.main-content {
  flex: 1;
  margin-left: 300px; /* 默认侧边栏宽度 */
  padding: 3rem 2rem;
  transition: margin-left 0.3s ease;
}

.sidebar.collapsed ~ .main-content {
  margin-left: 80px;
}

/* 遮罩层（移动端侧边栏展开时显示） */
.sidebar-overlay {
  display: none;
}

.content-wrapper {
  max-width: min(1440px, 90%);
  margin: 0 auto;
}

/* 文本块 */
.text-block {
  max-width: 100%;
  margin-bottom: 3rem;
  font-size: 1.6rem;
  line-height: 1.6;
}

/* 卡片网格 */
.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: clamp(1rem, 2vw, 2rem);
}

.card {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 0.8rem;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s, box-shadow 0.2s;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  align-items: center;
  margin-bottom: 1.2rem;
}

.card-header h3 {
  margin-left: 1rem;
  font-size: 1.8rem;
}

.card p {
  color: #666;
  font-size: 1.4rem;
}

/* 宽屏增强（>= 2560px） */
@media screen and (min-width: 2560px) {
  .content-wrapper {
    max-width: min(1600px, 85%);
  }

  .text-block {
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
  }

  .card-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: clamp(1.5rem, 2vw, 2.5rem);
  }
}

/* 超大屏巨幕（>= 3840px） */
@media screen and (min-width: 3840px) {
  .content-wrapper {
    max-width: min(1800px, 80%);
  }

  .text-block {
    max-width: 900px;
    margin-left: auto;
    margin-right: auto;
  }

  .card-grid {
    grid-template-columns: repeat(6, 1fr);
    gap: clamp(2rem, 2.5vw, 3.5rem);
  }

  body {
    font-size: clamp(18px, 1.2vw, 24px);
  }
}

/* 响应式调整 */
@media (max-width: 992px) {
  .main-content {
    margin-left: 0;
    padding: 3rem 1rem;
  }

  /* 移动端：侧边栏默认隐藏在左侧 */
  .sidebar {
    transform: translateX(-100%);
    width: 280px !important;
  }

  /* 移动端：侧边栏展开时显示在内容上方 */
  .sidebar:not(.collapsed) {
    transform: translateX(0);
    z-index: 1100;
    box-shadow: 4px 0 20px rgba(0, 0, 0, 0.3);
  }

  /* 遮罩层 */
  .sidebar-overlay {
    display: block;
    position: fixed;
    top: 6rem;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1050;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0.3s ease;
  }

  .sidebar-overlay.active {
    opacity: 1;
    visibility: visible;
  }

  .content-wrapper {
    max-width: 100%;
    padding: 0 1rem;
  }

  .card-grid {
    grid-template-columns: 1fr;
  }
}
</style>
