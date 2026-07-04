<template>
  <div class="user-page">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>用户管理</span>
          <el-button type="primary" @click="handleAdd">添加用户</el-button>
        </div>
      </template>

      <el-table :data="userList" style="width: 100%">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="username" label="用户名" />
        <el-table-column prop="role" label="角色" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.status === 1 ? 'success' : 'danger'">
              {{ row.status === 1 ? '启用' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" />
        <el-table-column label="操作" width="250">
          <template #default="{ row }">
            <el-button size="small" @click="handleEdit(row)">编辑</el-button>
            <el-button size="small" :type="row.status === 1 ? 'warning' : 'success'" @click="handleToggleStatus(row)">
              {{ row.status === 1 ? '禁用' : '启用' }}
            </el-button>
            <el-button size="small" type="danger" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="500px">
      <el-form :model="form" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item label="密码" v-if="!isEdit">
          <el-input v-model="form.password" type="password" show-password />
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="form.roleId" placeholder="请选择角色" @change="handleRoleChange">
            <el-option v-for="role in roleList" :key="role.id" :label="role.name" :value="role.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="0" />
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
import { users, roles } from '../mock/data.js'
import { ElMessage, ElMessageBox } from 'element-plus'

const userList = ref([...users])
const roleList = ref(roles)
const dialogVisible = ref(false)
const dialogTitle = ref('添加用户')
const isEdit = ref(false)

const form = reactive({
  id: null,
  username: '',
  password: '',
  roleId: null,
  role: '',
  status: 1
})

const resetForm = () => {
  form.id = null
  form.username = ''
  form.password = ''
  form.roleId = null
  form.role = ''
  form.status = 1
}

const handleRoleChange = (roleId) => {
  const role = roles.find(r => r.id === roleId)
  if (role) {
    form.role = role.name
  }
}

const handleAdd = () => {
  resetForm()
  dialogTitle.value = '添加用户'
  isEdit.value = false
  dialogVisible.value = true
}

const handleEdit = (row) => {
  Object.assign(form, { ...row })
  dialogTitle.value = '编辑用户'
  isEdit.value = true
  dialogVisible.value = true
}

const handleToggleStatus = (row) => {
  const index = userList.value.findIndex(item => item.id === row.id)
  if (index !== -1) {
    userList.value[index].status = userList.value[index].status === 1 ? 0 : 1
    ElMessage.success('状态更新成功')
  }
}

const handleDelete = (row) => {
  ElMessageBox.confirm('确定删除该用户吗？', '提示', {
    type: 'warning'
  }).then(() => {
    const index = userList.value.findIndex(item => item.id === row.id)
    if (index !== -1) {
      userList.value.splice(index, 1)
      ElMessage.success('删除成功')
    }
  }).catch(() => {})
}

const handleSave = () => {
  if (!form.username) {
    ElMessage.warning('请填写用户名')
    return
  }

  if (isEdit.value) {
    const index = userList.value.findIndex(item => item.id === form.id)
    if (index !== -1) {
      userList.value[index] = { ...form }
      ElMessage.success('编辑成功')
    }
  } else {
    if (!form.password) {
      ElMessage.warning('请填写密码')
      return
    }
    const newId = Math.max(...userList.value.map(item => item.id), 0) + 1
    const now = new Date().toISOString().split('T')[0]
    userList.value.push({ ...form, id: newId, createTime: now })
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

.user-page {
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
