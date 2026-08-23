<script setup>
import { ref } from 'vue'
import FileSelector from '@/components/filePreview/FileSelector.vue'
import PreviewArea from '@/components/filePreview/PreviewArea.vue'

const fileData = ref(null)

function handleFileSelected(data) {
  fileData.value = data
}
</script>

<template>
  <div class="file-preview-page">
    <h1>文件预览</h1>
    <FileSelector @file-selected="handleFileSelected" />
    <PreviewArea
      v-if="fileData"
      :file-data="fileData"
    />
  </div>
</template>

<style scoped>
.file-preview-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  margin-bottom: 20px;
  color: #333;
}
</style>
