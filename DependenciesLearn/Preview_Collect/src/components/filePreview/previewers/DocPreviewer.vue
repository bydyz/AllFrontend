<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { renderAsync } from 'docx-preview'

const props = defineProps({
  fileData: {
    type: Object,
    required: true,
  },
})

const containerRef = ref(null)
const isLoading = ref(true)
const error = ref(null)
const rendered = ref(false)

onMounted(async () => {
  try {
    const arrayBuffer = await props.fileData.file.arrayBuffer()
    isLoading.value = false
    rendered.value = true
    await nextTick()
    // 等待 DOM 更新并获取宽度
    await new Promise(resolve => {
      const checkWidth = () => {
        if (containerRef.value && containerRef.value.offsetWidth > 0) {
          resolve()
        } else {
          requestAnimationFrame(checkWidth)
        }
      }
      checkWidth()
    })
    await renderAsync(arrayBuffer, containerRef.value, containerRef.value, {
      className: 'docx-preview',
      inWrapper: true,
      ignoreWidth: false,
      ignoreHeight: false,
      ignoreFonts: false,
      breakPages: true,
      ignoreLastRenderedPageBreak: true,
      experimental: true,
      trimXmlDeclaration: true,
      useBase64URL: true,
    })
  } catch (e) {
    error.value = e.message
  }
})
</script>

<template>
  <div class="doc-previewer">
    <div v-if="isLoading" class="loading">加载中...</div>
    <div v-else-if="error" class="error">加载失败: {{ error }}</div>
    <div v-else-if="rendered" ref="containerRef" class="content" />
  </div>
</template>

<style scoped>
.doc-previewer {
  padding: 20px;
  width: 100%;
}

.loading,
.error {
  text-align: center;
  padding: 40px;
  color: #999;
}

.error {
  color: #f56c6c;
}

.content {
  width: 100%;
  min-height: 200px;
  line-height: 1.6;
}

.content :deep(.docx-preview) {
  width: 100% !important;
}

.content :deep(.docx-preview > section) {
  width: 100% !important;
}

.content :deep(table) {
  border-collapse: collapse;
  width: 100%;
}

.content :deep(td),
.content :deep(th) {
  border: 1px solid #000;
  padding: 4px 8px;
}

.content :deep(img) {
  max-width: 100%;
  height: auto;
}
</style>
