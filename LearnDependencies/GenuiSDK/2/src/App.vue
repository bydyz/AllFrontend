<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElButton, ElTable, ElTableColumn, ElDialog, ElForm, ElFormItem, ElInput } from 'element-plus'
import SmartAddDialog from './SmartAddDialog.vue'

interface Person {
  id: number
  name: string
  city: string
  address: string
}

const STORAGE_KEY = 'person-data'

const tableData = ref<Person[]>([])
const dialogVisible = ref(false)
const isEdit = ref(false)
const form = ref<Person>({ id: 0, name: '', city: '', address: '' })

const initData = () => {
  const defaultData: Person[] = [
    { id: 1, name: '张三', city: '北京', address: '朝阳区建国路88号' },
    { id: 2, name: '李四', city: '上海', address: '浦东新区世纪大道100号' },
    { id: 3, name: '王五', city: '广州', address: '天河区天河路385号' },
  ]
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData))
  }
  loadData()
}

const loadData = () => {
  const data = localStorage.getItem(STORAGE_KEY)
  tableData.value = data ? JSON.parse(data) : []
}

const saveData = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tableData.value))
}

onMounted(() => {
  initData()
})

const handleAdd = () => {
  isEdit.value = false
  form.value = { id: 0, name: '', city: '', address: '' }
  dialogVisible.value = true
}

const smartAddDialogRef = ref()
const smartHandleAdd = () => {
  smartAddDialogRef.value.open()
}

const handleEdit = (row: Person) => {
  isEdit.value = true
  form.value = { ...row }
  dialogVisible.value = true
}

const handleDelete = (row: Person) => {
  tableData.value = tableData.value.filter(item => item.id !== row.id)
  saveData()
}

const handleConfirm = () => {
  if (isEdit.value) {
    const index = tableData.value.findIndex(item => item.id === form.value.id)
    if (index !== -1) {
      tableData.value[index] = { ...form.value }
    }
  } else {
    form.value.id = Date.now()
    tableData.value.push({ ...form.value })
  }
  saveData()
  dialogVisible.value = false
}
</script>

<template>
  <div class="container">
    <div class="toolbar">
      <el-button type="primary" @click="handleAdd">新增</el-button>
      <el-button type="success" @click="smartHandleAdd">智能生成</el-button>
    </div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="city" label="城市" />
      <el-table-column prop="address" label="地址" />
      <el-table-column label="操作" width="180">
        <template #default="{ row }">
          <el-button size="small" @click="handleEdit(row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogVisible" :title="isEdit ? '编辑' : '新增'" width="500px">
      <el-form :model="form" label-width="80px">
        <el-form-item label="姓名">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="城市">
          <el-input v-model="form.city" />
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.address" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确定</el-button>
      </template>
    </el-dialog>

    <SmartAddDialog ref="smartAddDialogRef"></SmartAddDialog>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  padding: 30px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}
.toolbar {
  margin-bottom: 20px;
}
:deep(.el-table) {
  font-size: 16px;
}
:deep(.el-table th) {
  background: #f5f7fa !important;
  font-weight: 600;
}
:deep(.el-table td) {
  padding: 16px 0;
}
:deep(.el-table) {
  height: calc(100vh - 128px);
}
</style>