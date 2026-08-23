<script setup>
import { ref } from 'vue'

const emit = defineEmits(['file-selected'])

const isDragOver = ref(false)

const FILE_TYPE_MAP = {
  '.pdf': 'pdf',
  '.doc': 'doc',
  '.docx': 'doc',
  '.xls': 'excel',
  '.xlsx': 'excel',
  '.md': 'markdown',
  '.markdown': 'markdown',
  '.txt': 'text',
  '.log': 'text',
  '.json': 'text',
  '.js': 'text',
  '.ts': 'text',
  '.vue': 'text',
  '.css': 'text',
  '.html': 'text',
  '.png': 'image',
  '.jpg': 'image',
  '.jpeg': 'image',
  '.gif': 'image',
  '.bmp': 'image',
  '.webp': 'image',
}

function getFileType(fileName) {
  const ext = fileName.slice(fileName.lastIndexOf('.')).toLowerCase()
  return FILE_TYPE_MAP[ext] || 'unknown'
}

function handleFile(file) {
  const fileType = getFileType(file.name)
  const fileUrl = URL.createObjectURL(file)
  emit('file-selected', {
    file,
    fileUrl,
    fileType,
    fileName: file.name,
  })
}

function handleInputChange(event) {
  const file = event.target.files[0]
  if (file) {
    handleFile(file)
  }
}

function handleDrop(event) {
  event.preventDefault()
  isDragOver.value = false
  const file = event.dataTransfer.files[0]
  if (file) {
    handleFile(file)
  }
}

function handleDragOver(event) {
  event.preventDefault()
  isDragOver.value = true
}

function handleDragLeave() {
  isDragOver.value = false
}
</script>

<template>
  <div class="file-selector">
    <div
      class="drop-zone"
      :class="{ 'drag-over': isDragOver }"
      @drop="handleDrop"
      @dragover="handleDragOver"
      @dragleave="handleDragLeave"
    >
      <p>将文件拖拽到此处</p>
      <p class="separator">或</p>
      <label class="select-btn">
        选择文件
        <input
          type="file"
          accept=".pdf,.doc,.docx,.xls,.xlsx,.md,.markdown,.txt,.log,.json,.js,.ts,.vue,.css,.html,.png,.jpg,.jpeg,.gif,.bmp,.webp"
          @change="handleInputChange"
        />
      </label>
    </div>
  </div>
</template>

<style scoped>
.file-selector {
  margin-bottom: 20px;
}

.drop-zone {
  border: 2px dashed #ccc;
  border-radius: 8px;
  padding: 40px;
  text-align: center;
  transition: all 0.3s ease;
}

.drop-zone.drag-over {
  border-color: #409eff;
  background-color: #ecf5ff;
}

.separator {
  color: #999;
  margin: 10px 0;
}

.select-btn {
  display: inline-block;
  padding: 10px 20px;
  background-color: #409eff;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.select-btn:hover {
  background-color: #66b1ff;
}

.select-btn input {
  display: none;
}
</style>
