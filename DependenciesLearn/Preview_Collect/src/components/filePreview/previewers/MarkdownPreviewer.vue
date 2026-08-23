<script setup>
import { ref, onMounted } from 'vue'
import { marked } from 'marked'

const props = defineProps({
  fileData: {
    type: Object,
    required: true,
  },
})

const htmlContent = ref('')
const isLoading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    const text = await props.fileData.file.text()
    htmlContent.value = marked.parse(text)
  } catch (e) {
    error.value = e.message
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="markdown-previewer">
    <div v-if="isLoading" class="loading">加载中...</div>
    <div v-else-if="error" class="error">加载失败: {{ error }}</div>
    <div v-else class="content markdown-body" v-html="htmlContent" />
  </div>
</template>

<style scoped>
.markdown-previewer {
  padding: 20px;
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
  line-height: 1.6;
}

.markdown-body :deep(h1),
.markdown-body :deep(h2),
.markdown-body :deep(h3) {
  margin-top: 20px;
  margin-bottom: 10px;
}

.markdown-body :deep(code) {
  background-color: #f5f5f5;
  padding: 2px 6px;
  border-radius: 3px;
  font-family: monospace;
}

.markdown-body :deep(pre) {
  background-color: #f5f5f5;
  padding: 15px;
  border-radius: 5px;
  overflow-x: auto;
}

.markdown-body :deep(blockquote) {
  border-left: 4px solid #ddd;
  padding-left: 15px;
  color: #666;
}
</style>
