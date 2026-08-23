<script setup>
import { ref, computed, watch } from 'vue'
import DragHandle from './DragHandle.vue'
import PdfPreviewer from './previewers/PdfPreviewer.vue'
import DocPreviewer from './previewers/DocPreviewer.vue'
import ExcelPreviewer from './previewers/ExcelPreviewer.vue'
import MarkdownPreviewer from './previewers/MarkdownPreviewer.vue'
import TextPreviewer from './previewers/TextPreviewer.vue'
import ImagePreviewer from './previewers/ImagePreviewer.vue'

const props = defineProps({
  fileData: {
    type: Object,
    required: true,
  },
})

const scale = ref(100)
const searchText = ref('')
const showSearch = ref(false)
const containerHeight = ref(500)

const previewerComponent = computed(() => {
  const typeMap = {
    pdf: PdfPreviewer,
    doc: DocPreviewer,
    excel: ExcelPreviewer,
    markdown: MarkdownPreviewer,
    text: TextPreviewer,
    image: ImagePreviewer,
  }
  return typeMap[props.fileData.fileType] || null
})

const contentOverflow = computed(() => {
  return props.fileData.fileType === 'pdf' ? 'hidden' : 'auto'
})

function zoomIn() {
  scale.value = Math.min(scale.value + 10, 200)
}

function zoomOut() {
  scale.value = Math.max(scale.value - 10, 50)
}

function resetZoom() {
  scale.value = 100
}

function toggleSearch() {
  showSearch.value = !showSearch.value
}

function handleSearch() {
  if (searchText.value) {
    window.find(searchText.value)
  }
}

function handleSearchKeydown(event) {
  if (event.key === 'Enter') {
    handleSearch()
  }
}

function handleHeightChange(height) {
  containerHeight.value = height
}

watch(() => props.fileData, () => {
  scale.value = 100
  showSearch.value = false
  searchText.value = ''
})
</script>

<template>
  <div class="preview-area">
    <div class="toolbar">
      <div class="zoom-controls">
        <button @click="zoomOut">-</button>
        <span class="zoom-value">{{ scale }}%</span>
        <button @click="zoomIn">+</button>
        <button @click="resetZoom">重置</button>
      </div>
      <div class="search-controls">
        <button @click="toggleSearch">搜索</button>
        <input
          v-if="showSearch"
          v-model="searchText"
          type="text"
          placeholder="输入搜索内容..."
          @keydown="handleSearchKeydown"
        />
      </div>
    </div>
    <div
      class="preview-content"
      :style="{ height: containerHeight + 'px', overflow: contentOverflow }"
    >
      <div
        class="content-wrapper"
        :style="{ transform: `scale(${scale / 100})`, transformOrigin: 'top left' }"
      >
        <component
          :is="previewerComponent"
          :file-data="fileData"
        />
      </div>
    </div>
    <DragHandle
      :initial-height="containerHeight"
      @height-change="handleHeightChange"
    />
  </div>
</template>

<style scoped>
.preview-area {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
}

.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #ddd;
}

.zoom-controls,
.search-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.toolbar button {
  padding: 5px 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  cursor: pointer;
}

.toolbar button:hover {
  background-color: #f0f0f0;
}

.zoom-value {
  min-width: 50px;
  text-align: center;
}

.search-controls input {
  padding: 5px 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.preview-content {
  background-color: #fff;
}

.content-wrapper {
  height: 100%;
  min-height: 100%;
}
</style>
