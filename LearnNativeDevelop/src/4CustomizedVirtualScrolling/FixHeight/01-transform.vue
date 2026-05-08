<template>
  <h2>transform 定位方案</h2>
  <!--
    核心思路：
    1. sizer: 绝对定位的空 div，高度 = 总高度 10000 * 60 = 600000px
       作用：让浏览器认为容器内有 60 万像素的内容，从而生成正确的滚动条
    2. list: 绝对定位的 wrapper，整体通过 translateY(-offsetTop) 向上偏移
       offsetTop = startIndex * ITEM_HEIGHT = 已滚过的高度
       通过 transform 把"可见窗口"对齐到当前滚动位置
    3. visibleItems: 只渲染 startIndex ~ endIndex 区间的数据
  -->
  <div class="viewport" @scroll="onScroll" ref="viewportRef">
    <!-- sizer：骗滚动条高度，绝对定位且 pointer-events: none 不影响交互
         top:0 固定，给 viewport 提供完整的 scrollHeight（600000px）
         滚动时 sizer 不会随 scrollTop 移动，浏览器自动处理 -->
    <div class="sizer" :style="{ height: totalHeight + 'px' }"></div>
    <!-- list：整体偏移，transform 直接用 scrollTop 而非 offsetTop
         scrollTop = 实际滚动距离（如 1000px）
         list 通过 translateY(-1000px) 将第 17 行（1000/60）精确对齐到容器顶部
         offsetTop = startIndex * ITEM_HEIGHT，仅用于计算 slice 范围，不参与 transform -->
    <div class="list" :style="{ transform: `translateY(${scrollTop}px)` }">
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
   配置常量（固定高度场景可直接使用）
   -------------------------------------------------- */
const ITEM_HEIGHT = 60    // 每行高度（px），固定高度是关键前提
const ITEM_COUNT = 10000  // 总数据条数
const OVERSCAN = 5         // 缓冲行数，上下各多渲染 5 行，防止快速滚动时白屏

/* --------------------------------------------------
   响应式状态
   -------------------------------------------------- */
const viewportRef = ref(null)  // 滚动容器的 DOM 引用
const scrollTop = ref(0)        // 当前滚动位置（px）
const viewportHeight = ref(600) // 可视区域高度（px），默认 600，后面动态取 clientHeight

/* --------------------------------------------------
   原始数据列表（10,000 条，固定高度 60px）
   数据总量: 10000 * 60 = 600000px
   浏览器只需渲染 ~21 个 DOM 节点（600/60 ≈ 10 条可见 + 上下各 5 条缓冲）
   -------------------------------------------------- */
const list = Array.from({ length: ITEM_COUNT }, (_, i) => ({
  id: i + 1,
  text: `这是第 ${i + 1} 条数据`
}))

/* --------------------------------------------------
   计算属性
   -------------------------------------------------- */
// 总高度 = 条数 × 每条高度，用于设置 sizer 的 height
const totalHeight = computed(() => ITEM_COUNT * ITEM_HEIGHT)

// 起始索引 = 滚动距离 / 每条高度，向下取整
// Math.floor(scrollTop / ITEM_HEIGHT) 得到当前"第几行"在顶部
// 减 OVERSCAN 向前多渲染几行作为缓冲
// Math.max(0, ...) 防止 scrollTop=0 时 startIndex 变成负数
const startIndex = computed(() =>
  Math.max(0, Math.floor(scrollTop.value / ITEM_HEIGHT) - OVERSCAN)
)

// 终止索引 = (滚动距离 + 可视高度) / 每条高度，向上取整
// Math.min(ITEM_COUNT - 1, ...) 防止越界
// 加 OVERSCAN 向后多渲染几行
const endIndex = computed(() =>
  Math.min(
    ITEM_COUNT - 1,
    Math.ceil((scrollTop.value + viewportHeight.value) / ITEM_HEIGHT) + OVERSCAN
  )
)

// slice 范围通过 startIndex/endIndex 控制，transform 直接用 scrollTop 对齐
const visibleItems = computed(() =>
  list.slice(startIndex.value, endIndex.value + 1)
)

/* --------------------------------------------------
   事件处理
   -------------------------------------------------- */
const onScroll = (e) => {
  // 每次滚动更新 scrollTop，触发所有依赖它的 computed 自动重算
  // 性能注意点：scroll 事件触发频率很高（每帧可能多次）
  // Vue 3 的响应式系统配合 computed 天然防抖，但复杂场景建议用 requestAnimationFrame
  scrollTop.value = e.target.scrollTop
}

/* --------------------------------------------------
   生命周期
   -------------------------------------------------- */
onMounted(() => {
  // 挂载后读取容器的实际 clientHeight（如果 CSS 中 height 是 % 或 auto）
  // 本例 CSS 中 height: 600px 是固定值，这里写出来是演示动态获取场景
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
  position: relative;  /* 关键：给 sizer 和 list 提供定位上下文 */
  background: #fff;
}

.sizer {
  position: absolute; /* 绝对定位脱离文档流，不占位 */
  top: 0;
  left: 0;
  width: 100%;
  pointer-events: none; /* 防止 sizer 阻挡滚动区域的点击事件 */
}

.list {
  position: absolute; /* list 本身也是绝对定位，由 transform 控制位置 */
  top: 0;
  left: 0;
  width: 100%;
  /* transform: translateY() 放在内联 style 中动态计算，不写死在 CSS */
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
