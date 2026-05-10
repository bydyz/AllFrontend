<template>
  <h2>content-visibility:auto 方案 - 动态高度</h2>
  <!--
    核心思路（与固定高度 content-visibility 方案的区别）：
    1. 动态高度下，contain-intrinsic-size 需要预先计算总高度
    2. 由于高度动态变化，无法精确预知总高度，需要预估或预计算

    工作原理：
    - content-visibility:auto 仍然让浏览器自动跳过视口外的元素
    - contain-intrinsic-size 告诉浏览器预估的总高度（从 positions 数组获取）
    - 浏览器根据预估高度计算滚动条位置

    注意：动态高度下，浏览器仍然会自动测量实际渲染的 item 高度
    但因为每项高度不同，contain-intrinsic-size 只是初始预估
  -->
  <div class="viewport" ref="viewportRef">
    <div
      v-for="item in list"
      :key="item.id"
      class="item"
      :style="{ height: item.height + 'px' }"
    >
      {{ item.id }} - {{ item.text }} - 高度: {{ item.height }}px
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

/* --------------------------------------------------
   响应式状态
   -------------------------------------------------- */
const viewportRef = ref(null)
const scrollTop = ref(0)

/* --------------------------------------------------
   原始数据（动态高度）
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
   预计算总高度（用于 contain-intrinsic-size）
   实际生产中，这应该在数据加载完成后预先计算
   -------------------------------------------------- */
const totalHeight = computed(() => {
  let total = 0
  for (let i = 0; i < list.value.length; i++) {
    total += list.value[i].height
  }
  return total
})

/* --------------------------------------------------
   调试用：保留滚动监听，实际生产中可省略
   content-visibility 方案不需要手动计算可见范围
   -------------------------------------------------- */
const onScroll = (e) => {
  scrollTop.value = e.target.scrollTop
}

onMounted(() => {
  if (viewportRef.value) {
    viewportRef.value.addEventListener('scroll', onScroll, { passive: true })
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

  /*
   * content-visibility: auto
   * 浏览器自动跳过视口外元素的渲染
   * 动态高度下同样适用，浏览器会自动处理不同高度的 item
   */
  content-visibility: auto;

  /*
   * contain-intrinsic-size
   * 动态高度下，预计算的总高度用于初始滚动条计算
   * 浏览器会根据实际渲染的 item 动态调整
   */
  contain-intrinsic-size: v-bind("totalHeight + 'px'");

  /*
   * contain: layout
   * 布局隔离，优化性能
   */
  contain: layout;
}

.item {
  display: flex;
  align-items: center;
  padding: 0 16px;
  border-bottom: 1px solid #eee;
  box-sizing: border-box;
}
</style>