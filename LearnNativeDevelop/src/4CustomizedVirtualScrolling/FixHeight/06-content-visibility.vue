<template>
  <h2>content-visibility:auto 方案</h2>
  <!--
    核心思路（与其他五种方案的对比）：

    前五种方案：纯 JS 实现虚拟滚动
    - 手动计算 startIndex / endIndex
    - 手动 slice 出可见项
    - 手动用 sizer / spacer / padding 骗滚动条

    content-visibility:auto：浏览器原生虚拟化，一行 CSS 搞定
    - 浏览器自动跳过视口外的元素，不渲染它们
    - 无需 JS 计算起止索引，无需 slice，无需 spacer

    工作原理：
    - content-visibility: auto
      元素在视口外时，浏览器跳过其渲染（layout/paint/composite）
      仅保留其布局空间（类似 spacer 的作用）
      当元素即将进入视口时，浏览器恢复渲染
    - contain-intrinsic-size
      告诉浏览器该元素的"固有高度"（estimated total height）
      用于在元素被跳过渲染时，浏览器仍能正确计算滚动条
      如果不设置，浏览器会尝试测量实际内容高度，可能导致滚动条跳动

    优点：
    - 代码量最少（约 3 行 CSS），实现最简单
    - 浏览器内部实现，滚动完全由合成线程处理，无 JS 开销
    - 无需 overscan 配置，浏览器自动管理

    缺点：
    - 兼容性：仅 Chrome 85+、Edge 85+，Safari/Firefox 不支持或支持有限
    - 无法精确控制渲染边界，无法自定义 overscan 策略
    - 与 Intersection Observer 配合时行为不完全可预测
    - 不适合复杂交互场景（如虚拟列表中嵌套虚拟列表）

    注意：本例中 scrollTop / startIndex / endIndex 等计算逻辑
    仍然写在 JS 中，是为了与其他方案保持代码结构一致。
    实际上 content-visibility 方案完全可以省略这些计算，
    直接 v-for 渲染全部数据，靠浏览器自动虚拟化。
  -->
  <div class="viewport" ref="viewportRef">
    <!-- content-visibility:auto 告诉浏览器：不在视口内的 item 自动跳过渲染 -->
    <div
      v-for="item in list"
      :key="item.id"
      class="item"
    >
      {{ item.id }} - {{ item.text }}
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

/* --------------------------------------------------
   响应式状态
   -------------------------------------------------- */
const viewportRef = ref(null)
const scrollTop = ref(0)

/* --------------------------------------------------
   原始数据（content-visibility 场景下可以全部传给 DOM，
   浏览器会自动跳过不在视口内的 item）
   -------------------------------------------------- */
const list = Array.from({ length: ITEM_COUNT }, (_, i) => ({
  id: i + 1,
  text: `这是第 ${i + 1} 条数据`
}))

/* --------------------------------------------------
   计算属性
   -------------------------------------------------- */
const totalHeight = computed(() => ITEM_COUNT * ITEM_HEIGHT)

/* --------------------------------------------------
   与其他方案的关键差异：
   01-05 的 JS 逻辑（startIndex / endIndex / slice）在 content-visibility 方案中
   可以完全省略。content-visibility: auto 让浏览器自动管理渲染边界：

   - 浏览器只渲染当前视口内及其附近的 item（内部机制，类似 overscan）
   - 当用户滚动时，浏览器自动挂载/卸载 item
   - 无需 JS 手动 slice，无需 computed 计算 visibleItems

   下方保留的计算逻辑仅用于调试和结构一致性，实际生产中可删除：
   -------------------------------------------------- */
const OVERSCAN = 5
const viewportHeight = 600

const startIndex = computed(() =>
  Math.max(0, Math.floor(scrollTop.value / ITEM_HEIGHT) - OVERSCAN)
)

const endIndex = computed(() =>
  Math.min(
    ITEM_COUNT - 1,
    Math.ceil((scrollTop.value + viewportHeight) / ITEM_HEIGHT) + OVERSCAN
  )
)

// content-visibility 场景下不再需要 slice，直接渲染全部 list
// const visibleItems = computed(() => list.slice(startIndex.value, endIndex.value + 1))
// const visibleItems = list  // 直接渲染全部，浏览器自动虚拟化

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
   * 核心属性：浏览器自动跳过视口外元素的渲染
   * - 视口内：正常渲染
   * - 视口外：跳过 layout/paint，只保留布局占位
   * - 接近视口：浏览器自动开始渲染（内部 overscan）
   */
  content-visibility: auto;

  /*
   * contain-intrinsic-size
   * 告诉浏览器该容器在"跳过渲染状态"下的固有尺寸
   * 不设置此属性，浏览器会尝试测量实际内容高度作为 scrollHeight
   * 这会导致滚动条在内容渲染完成前跳动或不准确
   * v-bind 动态绑定 Vue 中的 totalHeight 值（600000px）
   */
  contain-intrinsic-size: v-bind("totalHeight + 'px'");

  /*
   * contain: layout
   * 将该容器标记为独立的布局隔离区域
   * - 容器内部布局变化不会影响外部元素（性能优化）
   * - 配合 content-visibility 使用效果更好
   * 三个可选值：layout / paint / strict
   * layout：只隔离布局影响
   * paint：隔离 paint 影响
   * strict：最严格隔离（包含所有 contain 规则）
   */
  contain: layout;
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
