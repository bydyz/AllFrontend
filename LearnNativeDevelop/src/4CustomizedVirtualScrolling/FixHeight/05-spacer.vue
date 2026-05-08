<template>
  <div class="viewport" @scroll="onScroll" ref="viewportRef">
    <div class="sizer" :style="{ height: totalHeight + 'px' }"></div>
    <div class="above-spacer" :style="{ height: offsetTop + 'px' }"></div>
    <div
      v-for="item in visibleItems"
      :key="item.id"
      class="item"
    >
      {{ item.id }} - {{ item.text }}
    </div>
    <div class="below-spacer" :style="{ height: (totalHeight - offsetTop - visibleHeight) + 'px' }"></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const ITEM_HEIGHT = 60
const ITEM_COUNT = 10000
const OVERSCAN = 5

const viewportRef = ref(null)
const scrollTop = ref(0)
const viewportHeight = ref(600)

const list = Array.from({ length: ITEM_COUNT }, (_, i) => ({
  id: i + 1,
  text: `这是第 ${i + 1} 条数据`
}))

const totalHeight = computed(() => ITEM_COUNT * ITEM_HEIGHT)
const visibleHeight = computed(() => viewportHeight.value + (OVERSCAN * 2 + 1) * ITEM_HEIGHT)

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

const offsetTop = computed(() => startIndex.value * ITEM_HEIGHT)

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

.above-spacer,
.below-spacer {
  width: 100%;
  pointer-events: none;
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
