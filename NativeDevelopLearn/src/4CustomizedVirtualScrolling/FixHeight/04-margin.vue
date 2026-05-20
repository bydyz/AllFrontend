<template>
  <h2>margin 撑高方案</h2>
  <!--
    核心思路（与 padding 方案的对比）：

    padding 方案：用 padding-top/padding-bottom 撑开 sizer 高度
    margin 方案：用 margin-top/margin-bottom 撑开 sizer 高度

    关键区别——Margin Collapse（外边距折叠）：

    CSS 中垂直方向的相邻 margin 会发生折叠：
    - 父元素的第一个子元素的 margin-top 会与父元素的 margin-top 折叠
    - 父元素的最后一个子元素的 margin-bottom 会与父元素的 margin-bottom 折叠
    - 相邻两个元素的 margin-top 和 margin-bottom 也会折叠

    这会导致 margin 撑高的效果不可靠，所以：
    1. 给 sizer 添加 overflow: hidden 阻止 margin collapse（子元素的 margin 不再传出父元素）
    2. 或者让 margin 和 padding 配合使用

    性能上与 padding 基本一致，都依赖浏览器布局重排，不推荐大数据量使用。
  -->
  <div class="viewport" @scroll="onScroll" ref="viewportRef">
    <div
      class="sizer"
      :style="{
        marginTop: offsetTop + 'px',
        marginBottom: (totalHeight - offsetTop - visibleHeight) + 'px'
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

/* --------------------------------------------------
   示例：margin collapse 的问题场景
   --------------------------------------------------
   如果 sizer 没有 overflow:hidden：

   <div class="viewport">
     <div class="sizer" style="margin-top: 660px;">
       <div class="item" style="margin-top: 10px;">第 11 条</div>
       ...
     </div>
   </div>

   此时 sizer 的 margin-top:660px 会和第一个 item 的 margin-top:10px 折叠
   结果：sizer 实际只获得了 max(660, 10) = 660px 的偏移，而非预期的 670px
   导致滚动位置计算错误，列表内容与滚动条不同步

   解决方案：overflow:hidden 触发 BFC（块级格式化上下文），
   BFC 中的 margin 不会与外部元素折叠
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
}

.sizer {
  width: 100%;
  /* 关键：overflow:hidden 触发 BFC，阻止 margin collapse
     没有这行，sizer 的 margin 与子元素的 margin 会折叠，
     导致滚动高度计算错误 */
  overflow: hidden;
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
