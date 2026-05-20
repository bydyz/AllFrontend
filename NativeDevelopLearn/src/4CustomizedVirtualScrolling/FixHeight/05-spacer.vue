<template>
  <h2>spacer 撑高方案</h2>
  <!--
    核心思路（与前四种方案的对比）：

    前四种方案中，滚动条高度的"欺骗"机制：
    - transform / absolute-top：靠 sizer div 的 height 属性
    - padding / margin：靠 sizer 的 padding / margin 属性

    spacer 方案：使用两个独立的 div 元素（above-spacer / below-spacer）
                 代替一个 wrapper 上的 padding/margin

    工作原理：
    - above-spacer：高度 = offsetTop（已滚过的距离），放在可见项上方
    - below-spacer：高度 = totalHeight - offsetTop - visibleHeight（剩余高度），放在可见项下方
    - 两个 spacer 合计高度 = 总高度，滚动条正确显示
    - 可见项在两个 spacer 之间，按文档流自然排列

    优点：
    - 结构最清晰：上下撑高各一个 div，一目了然
    - 没有 margin collapse 问题（不需要 overflow:hidden）
    - 便于在 spacer 位置插入其他元素（如吸顶标题、固定底部栏）

    缺点：
    - DOM 多两个节点（对极大数据量场景有轻微影响）
    - 滚动时两个 spacer 同时变化，计算量略多于单 sizer 方案

    数据演算（scrollTop=1000px）：
      Math.floor(1000/60) = 16 → offsetTop = 16*60 = 960px
      above-spacer.height = 960px
      visibleHeight = 600 + 660 = 1260px
      below-spacer.height = 600000 - 960 - 1260 = 597780px

    DOM 结构：
      <div class="sizer" style="height:600000px"></div>  ← 滚动条基准
      <div class="above-spacer" style="height:960px"></div>  ← 已滚过的空白
      <div class="item">第 11 条</div>  ← 第一条可见项（overscan 后的第1个）
      ...
      <div class="item">第 32 条</div>  ← 最后一条可见项
      <div class="below-spacer" style="height:597780px"></div>  ← 剩余空白
  -->
  <div class="viewport" @scroll="onScroll" ref="viewportRef">
    <!-- sizer：绝对定位，提供滚动条基准高度（透明，不占 DOM 布局空间） -->
    <div class="sizer" :style="{ height: totalHeight + 'px' }"></div>
    <!-- above-spacer：上方撑高 div，占据已滚过的空间 -->
    <div class="above-spacer" :style="{ height: offsetTop + 'px' }"></div>
    <!-- 可见项：在两个 spacer 之间，自然文档流排列 -->
    <div
      v-for="item in visibleItems"
      :key="item.id"
      class="item"
    >
      {{ item.id }} - {{ item.text }}
    </div>
    <!-- below-spacer：下方撑高 div，占据未滚到的剩余空间 -->
    <div class="below-spacer" :style="{ height: (totalHeight - offsetTop - visibleHeight) + 'px' }"></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

/* --------------------------------------------------
   配置常量
   -------------------------------------------------- */
const ITEM_HEIGHT = 60
const ITEM_COUNT = 10000
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
const list = Array.from({ length: ITEM_COUNT }, (_, i) => ({
  id: i + 1,
  text: `这是第 ${i + 1} 条数据`
}))

/* --------------------------------------------------
   计算属性
   -------------------------------------------------- */
const totalHeight = computed(() => ITEM_COUNT * ITEM_HEIGHT)

const visibleHeight = computed(() =>
  viewportHeight.value + (OVERSCAN * 2 + 1) * ITEM_HEIGHT
)

const startIndex = computed(() =>
  Math.max(0, Math.floor(scrollTop.value / ITEM_HEIGHT) - OVERSCAN)
)

const endIndex = computed(() =>
  Math.min(
    ITEM_COUNT - 1,
    Math.ceil((scrollTop.value + viewportHeight.value) / ITEM_HEIGHT) + OVERSCAN
  )
)

const visibleItems = computed(() =>
  list.slice(startIndex.value, endIndex.value + 1)
)

const offsetTop = computed(() => Math.floor(scrollTop.value / ITEM_HEIGHT) * ITEM_HEIGHT)

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
  position: relative; /* 为 sizer absolute 提供定位上下文 */
  background: #fff;
}

.sizer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  pointer-events: none; /* 不阻挡事件，视觉上透明 */
}

.above-spacer,
.below-spacer {
  width: 100%;
  pointer-events: none; /* spacer 不应响应任何交互事件 */
}

.item {
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  border-bottom: 1px solid #eee;
  box-sizing: border-box;
}
</style>
