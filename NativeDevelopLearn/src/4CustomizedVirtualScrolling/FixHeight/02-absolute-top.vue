<template>
  <h2 style="margin-top: 20px;">absolute + top 定位方案</h2>
  <!--
    核心思路（与 transform 方案的本质区别）：
    1. sizer 同样用于骗滚动条高度
    2. list 是绝对定位容器，但整体不偏移
    3. 每项 item 独立设置 position:absolute + top 定位到自己的位置
       top = item._index * ITEM_HEIGHT

    对比 transform 方案：
    - transform: list 整体偏移，item 按文档流排列，transform 做位置修正
    - absolute-top: item 各自独立绝对定位，top 值由计算属性注入

    性能差异：
    两者都由 GPU 合成，差异极小。
    absolute-top 每项多一次 top style 计算，数据量大时略繁。
  -->
  <div class="viewport" @scroll="onScroll" ref="viewportRef">
    <div class="sizer" :style="{ height: totalHeight + 'px' }"></div>
    <div class="list">
      <div
        v-for="item in visibleItems"
        :key="item.id"
        class="item"
        :style="{ top: (item._index * ITEM_HEIGHT) + 'px' }"
      >
        {{ item.id }} - {{ item.text }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

/* --------------------------------------------------
   配置常量
   -------------------------------------------------- */
const ITEM_HEIGHT = 60    // 每行高度
const ITEM_COUNT = 10000  // 总数据量
const OVERSCAN = 5         // 上下各缓冲 5 行

/* --------------------------------------------------
   响应式状态
   -------------------------------------------------- */
const viewportRef = ref(null)
const scrollTop = ref(0)
const viewportHeight = ref(600)

/* --------------------------------------------------
   原始数据列表
   -------------------------------------------------- */
const list = Array.from({ length: ITEM_COUNT }, (_, i) => ({
  id: i + 1,
  text: `这是第 ${i + 1} 条数据`
}))

/* --------------------------------------------------
   计算属性
   -------------------------------------------------- */
const totalHeight = computed(() => ITEM_COUNT * ITEM_HEIGHT)

const startIndex = computed(() =>
  Math.max(0, Math.floor(scrollTop.value / ITEM_HEIGHT) - OVERSCAN)
)

const endIndex = computed(() =>
  Math.min(
    ITEM_COUNT - 1,
    Math.ceil((scrollTop.value + viewportHeight.value) / ITEM_HEIGHT) + OVERSCAN
  )
)

// offsetTop 没用上，每项直接用 item._index*ITEM_HEIGHT 定位
// _index 是原始列表中的绝对索引，top 值 = _index * ITEM_HEIGHT
// 示例：scrollTop=1000，floor(1000/60)=16，第 16 行 top=16*60=960px
// 第 11 行（overscan 后第一个可见项）top=11*60=660px ✓
const visibleItems = computed(() =>
  list.slice(startIndex.value, endIndex.value + 1).map((item, i) => ({
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
  position: relative; /* 关键：给 sizer 和 list 提供定位上下文 */
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
  position: absolute; /* list 容器不设置 top/left，保持在容器左上角 */
  top: 0;
  left: 0;
  width: 100%;
  /* 注意：这里没有 transform，item 的位置完全由每个 item 的 top 决定 */
}

.item {
  position: absolute; /* 每项独立绝对定位 */
  left: 0;
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  border-bottom: 1px solid #eee;
  box-sizing: border-box;
}
</style>
