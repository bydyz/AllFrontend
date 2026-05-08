<template>
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
  position: absolute;
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
