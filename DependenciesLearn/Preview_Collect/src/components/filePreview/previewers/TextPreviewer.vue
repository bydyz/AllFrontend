<script setup>
import { ref, computed, onMounted } from 'vue'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'

const props = defineProps({
  fileData: {
    type: Object,
    required: true,
  },
})

const content = ref('')
const isLoading = ref(true)
const error = ref(null)

const LANGUAGE_MAP = {
  '.js': 'javascript',
  '.ts': 'typescript',
  '.vue': 'xml',
  '.css': 'css',
  '.html': 'html',
  '.htm': 'html',
  '.json': 'json',
  '.md': 'markdown',
  '.markdown': 'markdown',
  '.py': 'python',
  '.java': 'java',
  '.c': 'c',
  '.cpp': 'cpp',
  '.go': 'go',
  '.rs': 'rust',
  '.sql': 'sql',
  '.sh': 'bash',
  '.yaml': 'yaml',
  '.yml': 'yaml',
  '.xml': 'xml',
}

const language = computed(() => {
  const fileName = props.fileData.fileName.toLowerCase()
  for (const [ext, lang] of Object.entries(LANGUAGE_MAP)) {
    if (fileName.endsWith(ext)) {
      return lang
    }
  }
  return null
})

const highlightedContent = computed(() => {
  if (!content.value) return ''
  
  if (language.value) {
    try {
      return hljs.highlight(content.value, { language: language.value }).value
    } catch {
      // 如果识别失败，尝试自动检测
      try {
        return hljs.highlightAuto(content.value).value
      } catch {
        return content.value
      }
    }
  }
  
  // 非代码文件，直接返回转义后的内容
  return content.value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
})

onMounted(async () => {
  try {
    content.value = await props.fileData.file.text()
  } catch (e) {
    error.value = e.message
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="text-previewer">
    <div v-if="isLoading" class="loading">加载中...</div>
    <div v-else-if="error" class="error">加载失败: {{ error }}</div>
    <pre v-else class="content"><code v-html="highlightedContent" /></pre>
  </div>
</template>

<style scoped>
.text-previewer {
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
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  white-space: pre-wrap;
  word-wrap: break-word;
  line-height: 1.5;
  margin: 0;
  background-color: #f8f8f8;
  padding: 15px;
  border-radius: 5px;
}

.content :deep(code) {
  font-family: inherit;
}
</style>
