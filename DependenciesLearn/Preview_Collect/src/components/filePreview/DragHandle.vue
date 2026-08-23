<script setup>
import { ref } from 'vue'

const props = defineProps({
  initialHeight: {
    type: Number,
    default: 500,
  },
})

const emit = defineEmits(['height-change'])

const isDragging = ref(false)
const startY = ref(0)
const startHeight = ref(0)
const minHeight = 200
const maxHeight = typeof window !== 'undefined' ? window.innerHeight * 0.8 : 800

function handleMouseDown(event) {
  isDragging.value = true
  startY.value = event.clientY
  startHeight.value = props.initialHeight
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)
}

function handleMouseMove(event) {
  if (!isDragging.value) return
  const delta = event.clientY - startY.value
  let newHeight = startHeight.value + delta
  newHeight = Math.max(minHeight, Math.min(maxHeight, newHeight))
  emit('height-change', newHeight)
}

function handleMouseUp() {
  isDragging.value = false
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', handleMouseUp)
}
</script>

<template>
  <div
    class="drag-handle"
    :class="{ dragging: isDragging }"
    @mousedown="handleMouseDown"
  >
    <span class="handle-icon">⋮⋮</span>
  </div>
</template>

<style scoped>
.drag-handle {
  height: 12px;
  background-color: #f5f5f5;
  border-top: 1px solid #ddd;
  cursor: ns-resize;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
}

.drag-handle:hover {
  background-color: #e8e8e8;
}

.drag-handle.dragging {
  background-color: #d9d9d9;
}

.handle-icon {
  color: #999;
  font-size: 12px;
  letter-spacing: 2px;
}
</style>
