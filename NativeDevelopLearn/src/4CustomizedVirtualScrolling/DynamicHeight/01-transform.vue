<template>
  <h2>transform 定位方案 - 动态高度</h2>
  <!--
    核心思路（与固定高度方案的区别）：
    1. 固定高度：offsetTop = startIndex * ITEM_HEIGHT（直接计算）
    2. 动态高度：需要预计算每项的累积位置，用位置映射表确定可见范围

    工作原理：
    1. positions 数组：预先计算每个item的顶部累积位置（_top）和底部位置（_bottom）
       例如：[0, 60, 110, 180, 180, 260...] 表示第1项top=0 height=60，第2项top=60 height=50...
    2. 使用二分查找找到 scrollTop 对应的 startIndex
    3. 继续向下遍历直到找到 endIndex（累计高度超过 scrollTop + viewportHeight）
    4. transform 依然使用 scrollTop 偏移，与固定高度一致
  -->
  <div class="viewport" @scroll="onScroll" ref="viewportRef">
    <!-- sizer：动态高度下，总高度来自所有item高度的累积 -->
    <div class="sizer" :style="{ height: totalHeight + 'px' }"></div>
    <div class="list" :style="{ transform: `translateY(${scrollTop}px)` }">
      <div
        v-for="item in visibleItems"
        :key="item.id"
        class="item"
        :style="{ height: `${item.height}px` }"
      >
        {{ item.id }} - {{ item.text }} - 高度: {{ item.height }}px
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

/* --------------------------------------------------
   配置常量（动态高度场景）
   -------------------------------------------------- */
const ITEM_COUNT = 10000
const MIN_HEIGHT = 40   // 每项最小高度
const MAX_HEIGHT = 120  // 每项最大高度
const OVERSCAN = 5      // 缓冲行数

/* --------------------------------------------------
   响应式状态
   -------------------------------------------------- */
const viewportRef = ref(null)
const scrollTop = ref(0)
const viewportHeight = ref(600)

/* --------------------------------------------------
   原始数据列表（动态高度：每项高度随机）
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
   关键：位置映射表
   预先计算每个item的顶部和底部位置，用于二分查找
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
// 总高度 = 最后一个位置的 top 值
const totalHeight = computed(() => {
  const pos = positions.value
  return pos[pos.length - 1].top
})

// 二分查找：找到 scrollTop 对应的起始索引
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

  // 减 OVERSCAN 向前多渲染几行作为缓冲
  return Math.max(0, left - OVERSCAN)
})

// 从 startIndex 开始向下遍历，找到 endIndex
const endIndex = computed(() => {
  const pos = positions.value
  const target = scrollTop.value + viewportHeight.value

  let end = startIndex.value
  while (end < pos.length - 1 && pos[end + 1].top < target) {
    end++
  }

  // 加 OVERSCAN 向后多渲染几行
  return Math.min(ITEM_COUNT - 1, end + OVERSCAN)
})

const visibleItems = computed(() =>
  list.value.slice(startIndex.value, endIndex.value + 1)
)

/* --------------------------------------------------
   事件处理
   -------------------------------------------------- */
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
  display: flex;
  align-items: center;
  padding: 0 16px;
  border-bottom: 1px solid #eee;
  box-sizing: border-box;
}
</style>