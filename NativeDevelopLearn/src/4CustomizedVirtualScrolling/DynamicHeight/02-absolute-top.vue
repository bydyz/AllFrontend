<template>
  <h2 style="margin-top: 20px;">absolute + top 定位方案 - 动态高度</h2>
  <!--
    核心思路（与 transform 方案的区别）：
    1. transform: list 整体偏移，item 按文档流排列
    2. absolute-top: 每个 item 独立绝对定位，top 值从 positions 数组获取

    动态高度下的关键变化：
    - 每项的 top 不再是 index * ITEM_HEIGHT，而是 positions[index].top
    - 需要在 visibleItems 中携带 _index 用于计算 top 值
  -->
  <div class="viewport" @scroll="onScroll" ref="viewportRef">
    <div class="sizer" :style="{ height: totalHeight + 'px' }"></div>
    <div class="list">
      <div
        v-for="item in visibleItems"
        :key="item.id"
        class="item"
        :style="{ top: positions[item._index].top + 'px', height: item.height + 'px' }"
      >
        {{ item.id }} - {{ item.text }} - 高度: {{ item.height }}px
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

/* --------------------------------------------------
   配置常量
   -------------------------------------------------- */
const ITEM_COUNT = 10000
const MIN_HEIGHT = 40
const MAX_HEIGHT = 120
const OVERSCAN = 5

/* --------------------------------------------------
   响应式状态
   -------------------------------------------------- */
const viewportRef = ref(null)
const scrollTop = ref(0)
const viewportHeight = ref(600)

/* --------------------------------------------------
   原始数据列表
   -------------------------------------------------- */
const list = computed(() => {
  const arr = []
  for (let i = 0; i < ITEM_COUNT; i++) {
    const height = Math.floor(Math.random() * (MAX_HEIGHT - MIN_HEIGHT + 1)) + MIN_HEIGHT
    arr.push({
      id: i + 1,
      text: `这是第 ${i + 1} 条数据，动态高度测试`,
      height
    })
  }
  return arr
})

/* --------------------------------------------------
   位置映射表
   -------------------------------------------------- */
const positions = computed(() => {
  const pos = [{ top: 0, bottom: 0 }]
  let cumulativeTop = 0
  for (let i = 0; i < list.value.length; i++) {
    cumulativeTop += list.value[i].height
    pos.push({ top: cumulativeTop, bottom: cumulativeTop })
  }
  return pos
})

/* --------------------------------------------------
   计算属性
   -------------------------------------------------- */
const totalHeight = computed(() => {
  const pos = positions.value
  return pos[pos.length - 1].top
})

const startIndex = computed(() => {
  const pos = positions.value
  const target = scrollTop.value

  let left = 0
  let right = pos.length - 1

  while (left < right) {
    const mid = Math.floor((left + right) / 2)
    if (pos[mid].top < target) {
      left = mid + 1
    } else {
      right = mid
    }
  }

  return Math.max(0, left - OVERSCAN)
})

const endIndex = computed(() => {
  const pos = positions.value
  const target = scrollTop.value + viewportHeight.value

  let end = startIndex.value
  while (end < pos.length - 1 && pos[end + 1].top < target) {
    end++
  }

  return Math.min(ITEM_COUNT - 1, end + OVERSCAN)
})

// 携带 _index 用于计算 top 值
const visibleItems = computed(() =>
  list.value.slice(startIndex.value, endIndex.value + 1).map((item, i) => ({
    ...item,
    _index: startIndex.value + i
  }))
)

const onScroll = (e) => {
  scrollTop.value = e.target.scrollTop
}

onMounted(() => {
  if (viewportRef.value) {
    viewportHeight.value = viewportRef.value.clientHeight
  }
})
</script>

<style scoped lang="scss">
.viewport {
  margin-top: 8px;
  height: 600px;
  overflow-y: auto;
  border: 1px solid #ccc;
  position: relative;
  background: #fff;
}

.sizer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  pointer-events: none;
}

.list {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

.item {
  position: absolute;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 16px;
  border-bottom: 1px solid #eee;
  box-sizing: border-box;
}
</style>