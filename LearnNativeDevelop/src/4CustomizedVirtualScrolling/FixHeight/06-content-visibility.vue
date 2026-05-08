<template>
  <div class="viewport" ref="viewportRef">
    <div
      v-for="item in visibleItems"
      :key="item.id"
      class="item"
    >
      {{ item.id }} - {{ item.text }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUpdated } from 'vue'

const ITEM_HEIGHT = 60
const ITEM_COUNT = 10000
const OVERSCAN = 5

const viewportRef = ref(null)
const scrollTop = ref(0)

const list = Array.from({ length: ITEM_COUNT }, (_, i) => ({
  id: i + 1,
  text: `这是第 ${i + 1} 条数据`
}))

const totalHeight = computed(() => ITEM_COUNT * ITEM_HEIGHT)

const startIndex = computed(() =>
  Math.max(0, Math.floor(scrollTop.value / ITEM_HEIGHT) - OVERSCAN)
)

const endIndex = computed(() =>
  Math.min(
    ITEM_COUNT - 1,
    Math.ceil((scrollTop.value + 600) / ITEM_HEIGHT) + OVERSCAN
  )
)

const visibleItems = computed(() =>
  list.slice(startIndex.value, endIndex.value + 1)
)

const onScroll = (e) => {
  scrollTop.value = e.target.scrollTop
}

onMounted(() => {
  if (viewportRef.value) {
    viewportRef.value.addEventListener('scroll', onScroll, { passive: true })
  }
})

onUpdated(() => {
  if (viewportRef.value) {
    viewportRef.value.style.setProperty('--scroll-top', scrollTop.value + 'px')
  }
})
</script>

<style scoped lang="scss">
.viewport {
  height: 600px;
  overflow-y: auto;
  border: 1px solid #ccc;
  background: #fff;
  content-visibility: auto;
  contain-intrinsic-size: v-bind("totalHeight + 'px'");
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
