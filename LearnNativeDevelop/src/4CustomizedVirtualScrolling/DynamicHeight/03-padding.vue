<template>
  <h2>padding 撑高方案 - 动态高度</h2>
  <!--
    核心思路（与固定高度 padding 方案的区别）：
    1. 固定高度：offsetTop = startIndex * ITEM_HEIGHT
    2. 动态高度：offsetTop = positions[startIndex].top（从映射表获取）

    padding-top 仍然把可见项推到"滚动位置"对应的偏移处
    padding-bottom = totalHeight - offsetTop - visibleHeight
  -->
  <div class="viewport" @scroll="onScroll" ref="viewportRef">
    <div
      class="sizer"
      :style="{
        paddingTop: offsetTop + 'px',
        paddingBottom: (totalHeight - offsetTop - visibleHeight) + 'px'
      }"
    >
      <div
        v-for="item in visibleItems"
        :key="item.id"
        class="item"
        :style="{ height: item.height + 'px' }"
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
   原始数据
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

// 动态高度下，可见区域高度需要根据实际渲染的items高度计算
const visibleHeight = computed(() => {
  let height = 0
  for (let i = startIndex.value; i <= endIndex.value; i++) {
    height += list.value[i].height
  }
  return height
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

const visibleItems = computed(() =>
  list.value.slice(startIndex.value, endIndex.value + 1)
)

// 动态高度下，offsetTop 从 positions 数组获取
const offsetTop = computed(() => {
  return positions.value[startIndex.value]?.top || 0
})

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
  background: #fff;
}

.sizer {
  width: 100%;
}

.item {
  display: flex;
  align-items: center;
  padding: 0 16px;
  border-bottom: 1px solid #eee;
  box-sizing: border-box;
}
</style>