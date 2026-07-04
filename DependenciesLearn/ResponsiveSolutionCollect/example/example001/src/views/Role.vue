<template>
  <div class="role-page">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>角色管理</span>
          <el-button type="primary" @click="handleAdd">添加角色</el-button>
        </div>
      </template>

      <el-table :data="roleList" style="width: 100%">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="name" label="角色名称" />
        <el-table-column prop="description" label="角色描述" />
        <el-table-column label="权限数量" width="120">
          <template #default="{ row }">
            <el-tag type="info">{{ row.menuIds.length }} 个权限</el-tag>
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
        <el-form-item label="角色名称">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="form.description" type="textarea" />
        </el-form-item>
        <el-form-item label="菜单权限">
          <el-checkbox-group v-model="form.menuIds">
            <el-checkbox v-for="menu in allMenus" :key="menu.id" :label="menu.id">
              {{ menu.name }}
            </el-checkbox>
          </el-checkbox-group>
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
import { roles, menus } from '../mock/data.js'
import { ElMessage, ElMessageBox } from 'element-plus'

const roleList = ref([...roles])
const allMenus = ref(menus)
const dialogVisible = ref(false)
const dialogTitle = ref('添加角色')
const isEdit = ref(false)

const form = reactive({
  id: null,
  name: '',
  description: '',
  menuIds: []
})

const resetForm = () => {
  form.id = null
  form.name = ''
  form.description = ''
  form.menuIds = []
}

const handleAdd = () => {
  resetForm()
  dialogTitle.value = '添加角色'
  isEdit.value = false
  dialogVisible.value = true
}

const handleEdit = (row) => {
  Object.assign(form, { ...row, menuIds: [...row.menuIds] })
  dialogTitle.value = '编辑角色'
  isEdit.value = true
  dialogVisible.value = true
}

const handleDelete = (row) => {
  ElMessageBox.confirm('确定删除该角色吗？', '提示', {
    type: 'warning'
  }).then(() => {
    const index = roleList.value.findIndex(item => item.id === row.id)
    if (index !== -1) {
      roleList.value.splice(index, 1)
      ElMessage.success('删除成功')
    }
  }).catch(() => {})
}

const handleSave = () => {
  if (!form.name) {
    ElMessage.warning('请填写角色名称')
    return
  }

  if (isEdit.value) {
    const index = roleList.value.findIndex(item => item.id === form.id)
    if (index !== -1) {
      roleList.value[index] = { ...form }
      ElMessage.success('编辑成功')
    }
  } else {
    const newId = Math.max(...roleList.value.map(item => item.id), 0) + 1
    roleList.value.push({ ...form, id: newId })
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

.role-page {
  width: 100%;
}

@media screen and (max-width: 768px) {
  :deep(.el-table) {
    font-size: 12px;
  }
  
  :deep(.el-checkbox-group) {
    display: flex;
    flex-direction: column;
  }
}
</style>
