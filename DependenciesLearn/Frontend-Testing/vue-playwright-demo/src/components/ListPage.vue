<template>
  <div class="list-page" data-testid="list-page">
    <h1>列表示例</h1>
    <p class="description">演示列表操作的 E2E 测试。</p>
    
    <!-- 搜索和过滤 -->
    <section class="filter-section" data-testid="filter-section">
      <h2>搜索和过滤</h2>
      <div class="filter-bar">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="搜索用户..."
          class="search-input"
          data-testid="search-input"
        />
        <select v-model="filterRole" class="filter-select" data-testid="filter-role">
          <option value="">所有角色</option>
          <option value="admin">管理员</option>
          <option value="user">普通用户</option>
          <option value="guest">访客</option>
        </select>
      </div>
      <p class="result-count" data-testid="result-count">
        找到 {{ filteredUsers.length }} 个用户
      </p>
    </section>
    
    <!-- 用户列表 -->
    <section class="list-section" data-testid="user-list-section">
      <h2>用户列表</h2>
      
      <!-- 添加用户表单 -->
      <div class="add-user-form" data-testid="add-user-form">
        <input
          v-model="newUser.name"
          type="text"
          placeholder="用户名"
          data-testid="new-user-name"
        />
        <input
          v-model="newUser.email"
          type="email"
          placeholder="邮箱"
          data-testid="new-user-email"
        />
        <select v-model="newUser.role" data-testid="new-user-role">
          <option value="user">普通用户</option>
          <option value="admin">管理员</option>
          <option value="guest">访客</option>
        </select>
        <button 
          @click="addUser" 
          class="add-btn"
          data-testid="add-user-btn"
          :disabled="!newUser.name || !newUser.email"
        >
          添加用户
        </button>
      </div>
      
      <!-- 用户列表 -->
      <ul class="user-list" data-testid="user-list">
        <li 
          v-for="user in filteredUsers" 
          :key="user.id" 
          class="user-item"
          :class="{ selected: selectedUser?.id === user.id }"
          :data-testid="`user-item-${user.id}`"
          @click="selectUser(user)"
        >
          <div class="user-info">
            <span class="user-name" :data-testid="`user-name-${user.id}`">
              {{ user.name }}
            </span>
            <span class="user-email" :data-testid="`user-email-${user.id}`">
              {{ user.email }}
            </span>
            <span 
              class="user-role" 
              :class="user.role"
              :data-testid="`user-role-${user.id}`"
            >
              {{ roleLabels[user.role] }}
            </span>
          </div>
          <div class="user-actions">
            <button 
              @click.stop="editUser(user)" 
              class="edit-btn"
              :data-testid="`edit-user-${user.id}`"
            >
              编辑
            </button>
            <button 
              @click.stop="deleteUser(user.id)" 
              class="delete-btn"
              :data-testid="`delete-user-${user.id}`"
            >
              删除
            </button>
          </div>
        </li>
      </ul>
      
      <!-- 空状态 -->
      <div v-if="filteredUsers.length === 0" class="empty-state" data-testid="empty-state">
        <p>没有找到匹配的用户</p>
      </div>
    </section>
    
    <!-- 用户详情 -->
    <section v-if="selectedUser" class="detail-section" data-testid="user-detail-section">
      <h2>用户详情</h2>
      <div class="user-detail" data-testid="user-detail">
        <p><strong>姓名:</strong> <span data-testid="detail-name">{{ selectedUser.name }}</span></p>
        <p><strong>邮箱:</strong> <span data-testid="detail-email">{{ selectedUser.email }}</span></p>
        <p><strong>角色:</strong> <span data-testid="detail-role">{{ roleLabels[selectedUser.role] }}</span></p>
        <p><strong>创建时间:</strong> <span data-testid="detail-created">{{ selectedUser.createdAt }}</span></p>
      </div>
    </section>
    
    <!-- 编辑模态框 -->
    <div v-if="editingUser" class="modal-overlay" data-testid="edit-modal-overlay">
      <div class="modal" data-testid="edit-modal">
        <h3>编辑用户</h3>
        <form @submit.prevent="saveUser" class="edit-form">
          <div class="form-group">
            <label>姓名</label>
            <input
              v-model="editingUser.name"
              type="text"
              data-testid="edit-name"
            />
          </div>
          <div class="form-group">
            <label>邮箱</label>
            <input
              v-model="editingUser.email"
              type="email"
              data-testid="edit-email"
            />
          </div>
          <div class="form-group">
            <label>角色</label>
            <select v-model="editingUser.role" data-testid="edit-role">
              <option value="user">普通用户</option>
              <option value="admin">管理员</option>
              <option value="guest">访客</option>
            </select>
          </div>
          <div class="modal-actions">
            <button 
              type="button" 
              @click="editingUser = null"
              class="cancel-btn"
              data-testid="cancel-edit"
            >
              取消
            </button>
            <button 
              type="submit" 
              class="save-btn"
              data-testid="save-edit"
            >
              保存
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * ListPage 组件
 * 演示列表测试：搜索、过滤、CRUD操作
 */
import { ref, computed, reactive } from 'vue'

// 角色标签映射
const roleLabels = {
  admin: '管理员',
  user: '普通用户',
  guest: '访客'
}

// 初始用户数据
const users = ref([
  { id: 1, name: '张三', email: 'zhangsan@example.com', role: 'admin', createdAt: '2024-01-15' },
  { id: 2, name: '李四', email: 'lisi@example.com', role: 'user', createdAt: '2024-02-20' },
  { id: 3, name: '王五', email: 'wangwu@example.com', role: 'guest', createdAt: '2024-03-10' },
  { id: 4, name: '赵六', email: 'zhaoliu@example.com', role: 'user', createdAt: '2024-04-05' },
  { id: 5, name: '钱七', email: 'qianqi@example.com', role: 'admin', createdAt: '2024-05-12' }
])

// 搜索查询
const searchQuery = ref('')

// 角色过滤
const filterRole = ref('')

// 选中的用户
const selectedUser = ref(null)

// 编辑中的用户
const editingUser = ref(null)

// 新用户表单
const newUser = reactive({
  name: '',
  email: '',
  role: 'user'
})

// 过滤后的用户列表
const filteredUsers = computed(() => {
  return users.value.filter(user => {
    // 搜索匹配
    const matchesSearch = !searchQuery.value || 
      user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    // 角色匹配
    const matchesRole = !filterRole.value || user.role === filterRole.value
    
    return matchesSearch && matchesRole
  })
})

// 选择用户
function selectUser(user) {
  selectedUser.value = selectedUser.value?.id === user.id ? null : user
}

// 添加用户
function addUser() {
  if (!newUser.name || !newUser.email) return
  
  const user = {
    id: Date.now(),
    name: newUser.name,
    email: newUser.email,
    role: newUser.role,
    createdAt: new Date().toISOString().split('T')[0]
  }
  
  users.value.push(user)
  
  // 清空表单
  newUser.name = ''
  newUser.email = ''
  newUser.role = 'user'
}

// 编辑用户
function editUser(user) {
  editingUser.value = { ...user }
}

// 保存编辑
function saveUser() {
  if (!editingUser.value) return
  
  const index = users.value.findIndex(u => u.id === editingUser.value.id)
  if (index !== -1) {
    users.value[index] = { ...editingUser.value }
  }
  
  editingUser.value = null
}

// 删除用户
function deleteUser(id) {
  users.value = users.value.filter(u => u.id !== id)
  
  if (selectedUser.value?.id === id) {
    selectedUser.value = null
  }
}
</script>

<style scoped>
.list-page {
  padding: 20px;
}

h1 {
  color: #333;
  margin-bottom: 10px;
}

.description {
  color: #666;
  margin-bottom: 30px;
}

section {
  background: white;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h2 {
  color: #333;
  margin-bottom: 15px;
  font-size: 18px;
}

/* 过滤栏样式 */
.filter-bar {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

.search-input,
.filter-select {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.search-input {
  flex: 1;
}

.result-count {
  color: #666;
  font-size: 14px;
}

/* 添加用户表单 */
.add-user-form {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
}

.add-user-form input,
.add-user-form select {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.add-user-form input[type="text"],
.add-user-form input[type="email"] {
  flex: 1;
}

.add-btn {
  padding: 10px 20px;
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.add-btn:hover:not(:disabled) {
  background: #45a049;
}

.add-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

/* 用户列表样式 */
.user-list {
  list-style: none;
}

.user-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 4px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: all 0.3s;
}

.user-item:hover {
  background: #f5f5f5;
}

.user-item.selected {
  border-color: #2196f3;
  background: #e3f2fd;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

.user-name {
  font-weight: bold;
  min-width: 80px;
}

.user-email {
  color: #666;
}

.user-role {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  color: white;
}

.user-role.admin {
  background: #f44336;
}

.user-role.user {
  background: #2196f3;
}

.user-role.guest {
  background: #9e9e9e;
}

.user-actions {
  display: flex;
  gap: 10px;
}

.edit-btn,
.delete-btn {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}

.edit-btn {
  background: #ff9800;
  color: white;
}

.edit-btn:hover {
  background: #f57c00;
}

.delete-btn {
  background: #f44336;
  color: white;
}

.delete-btn:hover {
  background: #da190b;
}

/* 空状态 */
.empty-state {
  text-align: center;
  padding: 40px;
  color: #999;
}

/* 用户详情 */
.user-detail {
  padding: 20px;
  background: #f5f5f5;
  border-radius: 4px;
}

.user-detail p {
  margin: 10px 0;
}

/* 模态框样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: white;
  padding: 30px;
  border-radius: 8px;
  min-width: 400px;
  max-width: 90%;
}

.modal h3 {
  margin-bottom: 20px;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  color: #333;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.cancel-btn,
.save-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.cancel-btn {
  background: #9e9e9e;
  color: white;
}

.cancel-btn:hover {
  background: #757575;
}

.save-btn {
  background: #2196f3;
  color: white;
}

.save-btn:hover {
  background: #0b7dda;
}
</style>
