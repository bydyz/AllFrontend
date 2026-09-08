<template>
  <div class="tabs-container">
    <div class="tabs-wrapper">
      <div
        v-for="tab in tabs"
        :key="tab.path"
        class="tab-item"
        :class="{ active: route.path === tab.path }"
        @click="router.push(tab.path)"
        @contextmenu.prevent="openContextMenu($event, tab)"
      >
        <span class="tab-title">{{ tab.title }}</span>
        <el-icon
          v-if="tab.closable"
          class="tab-close"
          @click.stop="handleCloseTab(tab)"
        >
          <Close />
        </el-icon>
      </div>
    </div>
    <div v-if="tabs.length > 1" class="tabs-actions">
      <el-tooltip content="关闭所有标签页" placement="bottom">
        <el-icon class="tabs-close-all" @click="handleCloseAll"><Close /></el-icon>
      </el-tooltip>
    </div>

    <div
      v-show="contextMenu.visible"
      class="context-menu"
      :style="{ left: contextMenu.x + 'px', top: contextMenu.y + 'px' }"
    >
      <div class="context-menu-item" @click="handleCloseOther">关闭其它标签页</div>
      <div class="context-menu-item" @click="handleCloseRight">关闭右侧标签页</div>
      <div class="context-menu-item" @click="handleCloseAll">关闭全部标签页</div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTabStore } from '../stores'

const route = useRoute()
const router = useRouter()
const tabStore = useTabStore()
const tabs = computed(() => tabStore.tabs)

const contextMenu = ref({ visible: false, x: 0, y: 0, tab: null })

function handleCloseTab(tab) {
  const nextTab = tabStore.removeTab(tab.path)
  if (nextTab) {
    router.push(nextTab.path)
  } else if (route.path === tab.path) {
    const lastTab = tabs.value[tabs.value.length - 1]
    router.push(lastTab.path)
  }
}

function openContextMenu(e, tab) {
  contextMenu.value = { visible: true, x: e.clientX, y: e.clientY, tab }
}

function closeContextMenu() {
  contextMenu.value.visible = false
}

function handleCloseOther() {
  tabStore.removeOtherTabs(contextMenu.value.tab.path)
  closeContextMenu()
}

function handleCloseRight() {
  tabStore.removeRightTabs(contextMenu.value.tab.path)
  closeContextMenu()
}

function handleCloseAll() {
  tabStore.removeAllTabs()
  router.push('/dashboard')
  closeContextMenu()
}

onMounted(() => {
  document.addEventListener('click', closeContextMenu)
})

onUnmounted(() => {
  document.removeEventListener('click', closeContextMenu)
})
</script>

<style scoped>
.tabs-container {
  display: flex;
  align-items: center;
  background: #fff;
  border-bottom: 1px solid #e6e6e6;
  padding: 0 10px;
  height: 34px;
}

.tabs-wrapper {
  display: flex;
  align-items: center;
  flex: 1;
  overflow-x: auto;
  gap: 2px;
}

.tabs-wrapper::-webkit-scrollbar {
  display: none;
}

.tab-item {
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 0 8px;
  height: 24px;
  border: 1px solid #d9d9d9;
  border-radius: 3px;
  cursor: pointer;
  white-space: nowrap;
  font-size: 12px;
  color: #606266;
  background: #fff;
  transition: all 0.2s;
}

.tab-item:hover {
  color: #409EFF;
  border-color: #b3d8ff;
}

.tab-item.active {
  color: #409EFF;
  border-color: #409EFF;
  background: #ecf5ff;
}

.tab-close {
  font-size: 10px;
  border-radius: 50%;
  padding: 1px;
}

.tab-close:hover {
  background: #c0c4cc;
  color: #fff;
}

.tabs-actions {
  display: flex;
  align-items: center;
  margin-left: 8px;
}

.tabs-close-all {
  cursor: pointer;
  color: #606266;
  font-size: 14px;
  padding: 2px;
}

.tabs-close-all:hover {
  color: #F56C6C;
}

.context-menu {
  position: fixed;
  background: #fff;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  z-index: 3000;
  padding: 5px 0;
  min-width: 140px;
}

.context-menu-item {
  padding: 8px 16px;
  font-size: 13px;
  color: #606266;
  cursor: pointer;
}

.context-menu-item:hover {
  background: #ecf5ff;
  color: #409EFF;
}
</style>