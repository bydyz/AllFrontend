<template>
  <h2>padding 撑高方案</h2>
  <!--
    核心思路（与前两方案的对比）：
    前两种方案：依靠 absolute 定位 + sizer 撑滚动条高度
    padding 方案：利用浏览器原生布局，通过 padding-top/bottom 撑开内容高度
                   滚动条由浏览器根据 padding + 子元素高度自动生成

    工作原理：
    - sizer 不再是空 div，而是包裹可见项的父容器
    - padding-top  = startIndex * ITEM_HEIGHT   → 把可见项推到"滚动位置"对应的偏移处
    - padding-bottom = totalHeight - offsetTop - visibleHeight → 下方剩余高度

    优点：
    - 滚动条由浏览器原生计算，精度最高（不会出现计算误差）
    - 子元素完全按文档流排列，无需任何定位

    缺点：
    - padding 变化触发 sizer 的布局重排（Layout），滚动时持续重排是性能瓶颈
    - 滚动时频繁更新 padding 值（每帧都变），比 transform/absolute 的 GPU 合成代价高
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

// visibleHeight：渲染区域的总高度（含 overscan）
// 用于计算 padding-bottom：下方还有多少"未渲染但存在"的高度
// 示例：viewportHeight=600, ITEM_HEIGHT=60, OVERSCAN=5
//   visibleHeight = 600 + (5*2+1)*60 = 600 + 660 = 1260px
//   这 1260px 中：10 条真实可见 + 11 条缓冲（共 21 条 * 60）
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

// offsetTop = 已滚过的总高度，用于设置 padding-top
// 示例：滚动到第 20 行 → offsetTop = 20 * 60 = 1200px
const offsetTop = computed(() => Math.floor(scrollTop.value / ITEM_HEIGHT) * ITEM_HEIGHT)

/* --------------------------------------------------
   示例数据演算（scrollTop = 1000px 时）：

    Math.floor(1000/60) = 16 → offsetTop = 16 * 60 = 960px（精确已滚距离）
    startIndex = 16 - 5 = 11（第 11 行是第一个可见项，加上 overscan）
    endIndex = ceil(1600/60) + 5 = 27 + 5 = 32
    visibleItems = list.slice(11, 33) → 22 条

    paddingTop = 960px
    visibleHeight = 600 + 660 = 1260px
    paddingBottom = 600000 - 960 - 1260 = 597780px

    DOM 结构：
    <div class="sizer" style="padding-top:960px; padding-bottom:597780px">
      <div class="item">第 11 条</div>
      ...（22 条可见项）
    </div>

    滚动条：sizer.offsetHeight = 960 + 22*60 + 597780 = 600000px ✓
    内容区可见部分：padding-top 向下推 960px，正好对齐到第 16 行（scrollTop=1000px）
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
  background: #fff;
  /* 注意：viewport 不需要 position:relative，sizer 在普通文档流中 */
}

.sizer {
  width: 100%;
  /* padding 撑开高度，不需要 position:absolute */
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
