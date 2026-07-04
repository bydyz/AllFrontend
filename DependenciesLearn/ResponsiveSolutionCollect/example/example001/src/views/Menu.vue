<template>
  <div class="menu-page">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>菜单管理</span>
          <el-button type="primary" @click="handleAdd">添加菜单</el-button>
        </div>
      </template>

      <el-table :data="menuList" style="width: 100%" row-key="id">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="name" label="菜单名称" />
        <el-table-column prop="path" label="路由路径" />
        <el-table-column prop="icon" label="图标" width="100">
          <template #default="{ row }">
            <el-tag>{{ row.icon || '-' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template #default="{ row }">
            <el-button size="small" @click="handleEdit(row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="500px">
      <el-form :model="form" label-width="80px">
        <el-form-item label="菜单名称">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="路由路径">
          <el-input v-model="form.path" />
        </el-form-item>
        <el-form-item label="图标">
          <el-input v-model="form.icon" placeholder="Element Plus 图标名" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSave">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { menus } from '../mock/data.js'
import { ElMessage, ElMessageBox } from 'element-plus'

const menuList = ref([...menus])
const dialogVisible = ref(false)
const dialogTitle = ref('添加菜单')
const isEdit = ref(false)

const form = reactive({
  id: null,
  name: '',
  path: '',
  icon: ''
})

const resetForm = () => {
  form.id = null
  form.name = ''
  form.path = ''
  form.icon = ''
}

const handleAdd = () => {
  resetForm()
  dialogTitle.value = '添加菜单'
  isEdit.value = false
  dialogVisible.value = true
}

const handleEdit = (row) => {
  Object.assign(form, row)
  dialogTitle.value = '编辑菜单'
  isEdit.value = true
  dialogVisible.value = true
}

const handleDelete = (row) => {
  ElMessageBox.confirm('确定删除该菜单吗？', '提示', {
    type: 'warning'
  }).then(() => {
    const index = menuList.value.findIndex(item => item.id === row.id)
    if (index !== -1) {
      menuList.value.splice(index, 1)
      ElMessage.success('删除成功')
    }
  }).catch(() => {})
}

const handleSave = () => {
  if (!form.name || !form.path) {
    ElMessage.warning('请填写完整信息')
    return
  }

  if (isEdit.value) {
    const index = menuList.value.findIndex(item => item.id === form.id)
    if (index !== -1) {
      menuList.value[index] = { ...form }
      ElMessage.success('编辑成功')
    }
  } else {
    const newId = Math.max(...menuList.value.map(item => item.id), 0) + 1
    menuList.value.push({ ...form, id: newId })
    ElMessage.success('添加成功')
  }
  dialogVisible.value = false
}
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.menu-page {
  width: 100%;
}

@media screen and (max-width: 768px) {
  :deep(.el-table) {
    font-size: 12px;
  }
  
  :deep(.el-button) {
    padding: 8px 12px;
  }
}
</style>
