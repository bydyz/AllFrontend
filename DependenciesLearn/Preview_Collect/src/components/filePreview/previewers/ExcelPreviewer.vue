<script setup>
import { ref, onMounted, nextTick } from 'vue'
import * as XLSX from 'xlsx'

const props = defineProps({
  fileData: {
    type: Object,
    required: true,
  },
})

const containerRef = ref(null)
const isLoading = ref(true)
const error = ref(null)
const sheetNames = ref([])
const activeSheetIndex = ref(0)
const workbook = ref(null)

onMounted(async () => {
  try {
    const arrayBuffer = await props.fileData.file.arrayBuffer()
    workbook.value = XLSX.read(arrayBuffer, { type: 'array' })
    sheetNames.value = workbook.value.SheetNames
    await nextTick()
    renderSheet()
  } catch (e) {
    error.value = e.message
  } finally {
    isLoading.value = false
  }
})

function renderSheet() {
  if (!workbook.value || !containerRef.value) return
  
  const sheetName = sheetNames.value[activeSheetIndex.value]
  const sheet = workbook.value.Sheets[sheetName]
  
  // 获取表格 HTML
  const html = XLSX.utils.sheet_to_html(sheet, { editable: false })
  containerRef.value.innerHTML = html
  
  // 添加样式
  const table = containerRef.value.querySelector('table')
  if (table) {
    table.style.borderCollapse = 'collapse'
    table.style.width = '100%'
    table.style.border = '1px solid #ddd'
    
    const cells = table.querySelectorAll('td, th')
    cells.forEach(cell => {
      cell.style.border = '1px solid #ddd'
      cell.style.padding = '8px 12px'
      cell.style.textAlign = 'left'
      cell.style.whiteSpace = 'nowrap'
    })
    
    const headers = table.querySelectorAll('th')
    headers.forEach(th => {
      th.style.backgroundColor = '#f5f5f5'
      th.style.fontWeight = 'bold'
      th.style.position = 'sticky'
      th.style.top = '0'
    })
  }
}

function switchSheet(index) {
  activeSheetIndex.value = index
  nextTick(() => renderSheet())
}
</script>

<template>
  <div class="excel-previewer">
    <div v-if="isLoading" class="loading">加载中...</div>
    <div v-else-if="error" class="error">加载失败: {{ error }}</div>
    <template v-else>
      <div v-if="sheetNames.length > 1" class="sheet-tabs">
        <button
          v-for="(name, index) in sheetNames"
          :key="name"
          :class="{ active: index === activeSheetIndex }"
          @click="switchSheet(index)"
        >
          {{ name }}
        </button>
      </div>
      <div ref="containerRef" class="sheet-content" />
    </template>
  </div>
</template>

<style scoped>
.excel-previewer {
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

.sheet-tabs {
  display: flex;
  gap: 5px;
  margin-bottom: 15px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
}

.sheet-tabs button {
  padding: 5px 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  cursor: pointer;
}

.sheet-tabs button.active {
  background-color: #409eff;
  color: white;
  border-color: #409eff;
}

.sheet-content {
  overflow: auto;
}
</style>
