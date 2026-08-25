<template>
  <div class="form-page" data-testid="form-page">
    <h1>表单示例</h1>
    <p class="description">演示各种表单元素的 E2E 测试。</p>
    
    <!-- 用户信息表单 -->
    <section class="form-section" data-testid="user-form-section">
      <h2>用户信息表单</h2>
      <form @submit.prevent="handleSubmit" class="user-form" data-testid="user-form">
        <!-- 文本输入 -->
        <div class="form-group">
          <label for="name">姓名 *</label>
          <input
            id="name"
            v-model="form.name"
            type="text"
            placeholder="请输入姓名"
            required
            data-testid="input-name"
          />
          <span v-if="errors.name" class="error" data-testid="error-name">
            {{ errors.name }}
          </span>
        </div>
        
        <!-- 邮箱输入 -->
        <div class="form-group">
          <label for="email">邮箱 *</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            placeholder="请输入邮箱"
            required
            data-testid="input-email"
          />
          <span v-if="errors.email" class="error" data-testid="error-email">
            {{ errors.email }}
          </span>
        </div>
        
        <!-- 密码输入 -->
        <div class="form-group">
          <label for="password">密码 *</label>
          <input
            id="password"
            v-model="form.password"
            type="password"
            placeholder="请输入密码"
            required
            data-testid="input-password"
          />
          <span v-if="errors.password" class="error" data-testid="error-password">
            {{ errors.password }}
          </span>
        </div>
        
        <!-- 下拉选择 -->
        <div class="form-group">
          <label for="role">角色</label>
          <select id="role" v-model="form.role" data-testid="select-role">
            <option value="">请选择角色</option>
            <option value="admin">管理员</option>
            <option value="user">普通用户</option>
            <option value="guest">访客</option>
          </select>
        </div>
        
        <!-- 多行文本 -->
        <div class="form-group">
          <label for="bio">个人简介</label>
          <textarea
            id="bio"
            v-model="form.bio"
            placeholder="请输入个人简介"
            rows="4"
            data-testid="textarea-bio"
          ></textarea>
          <span class="char-count" data-testid="char-count">
            {{ form.bio.length }}/500
          </span>
        </div>
        
        <!-- 复选框 -->
        <div class="form-group checkbox-group">
          <label class="checkbox-label">
            <input
              type="checkbox"
              v-model="form.agreeTerms"
              data-testid="checkbox-terms"
            />
            我已阅读并同意<a href="#">服务条款</a>
          </label>
          <span v-if="errors.agreeTerms" class="error" data-testid="error-terms">
            {{ errors.agreeTerms }}
          </span>
        </div>
        
        <!-- 单选按钮 -->
        <div class="form-group">
          <label>通知方式</label>
          <div class="radio-group">
            <label class="radio-label">
              <input
                type="radio"
                v-model="form.notification"
                value="email"
                data-testid="radio-email"
              />
              邮件通知
            </label>
            <label class="radio-label">
              <input
                type="radio"
                v-model="form.notification"
                value="sms"
                data-testid="radio-sms"
              />
              短信通知
            </label>
            <label class="radio-label">
              <input
                type="radio"
                v-model="form.notification"
                value="none"
                data-testid="radio-none"
              />
              不接收通知
            </label>
          </div>
        </div>
        
        <!-- 提交按钮 -->
        <div class="form-actions">
          <button 
            type="submit" 
            class="submit-btn"
            data-testid="submit-btn"
            :disabled="isSubmitting"
          >
            {{ isSubmitting ? '提交中...' : '提交' }}
          </button>
          <button 
            type="button" 
            class="reset-btn"
            @click="resetForm"
            data-testid="reset-form-btn"
          >
            重置
          </button>
        </div>
      </form>
      
      <!-- 提交结果 -->
      <div v-if="submitResult" class="submit-result" data-testid="submit-result">
        <h3>提交结果</h3>
        <pre>{{ JSON.stringify(submitResult, null, 2) }}</pre>
      </div>
    </section>
  </div>
</template>

<script setup>
/**
 * FormPage 组件
 * 演示表单测试：输入验证、表单提交、错误处理
 */
import { ref, reactive, watch } from 'vue'

// 表单数据
const form = reactive({
  name: '',
  email: '',
  password: '',
  role: '',
  bio: '',
  agreeTerms: false,
  notification: 'email'
})

// 错误信息
const errors = reactive({
  name: '',
  email: '',
  password: '',
  agreeTerms: ''
})

// 提交状态
const isSubmitting = ref(false)
const submitResult = ref(null)

// 监听字数限制
watch(() => form.bio, (newVal) => {
  if (newVal.length > 500) {
    form.bio = newVal.slice(0, 500)
  }
})

// 验证表单
function validateForm() {
  let isValid = true
  
  // 清空错误
  errors.name = ''
  errors.email = ''
  errors.password = ''
  errors.agreeTerms = ''
  
  // 验证姓名
  if (!form.name.trim()) {
    errors.name = '请输入姓名'
    isValid = false
  } else if (form.name.length < 2) {
    errors.name = '姓名至少2个字符'
    isValid = false
  }
  
  // 验证邮箱
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!form.email.trim()) {
    errors.email = '请输入邮箱'
    isValid = false
  } else if (!emailRegex.test(form.email)) {
    errors.email = '请输入有效的邮箱地址'
    isValid = false
  }
  
  // 验证密码
  if (!form.password) {
    errors.password = '请输入密码'
    isValid = false
  } else if (form.password.length < 6) {
    errors.password = '密码至少6位'
    isValid = false
  }
  
  // 验证服务条款
  if (!form.agreeTerms) {
    errors.agreeTerms = '请同意服务条款'
    isValid = false
  }
  
  return isValid
}

// 提交表单
async function handleSubmit() {
  if (!validateForm()) {
    return
  }
  
  isSubmitting.value = true
  
  // 模拟API请求
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  submitResult.value = {
    success: true,
    message: '提交成功！',
    data: { ...form }
  }
  
  isSubmitting.value = false
}

// 重置表单
function resetForm() {
  form.name = ''
  form.email = ''
  form.password = ''
  form.role = ''
  form.bio = ''
  form.agreeTerms = false
  form.notification = 'email'
  
  errors.name = ''
  errors.email = ''
  errors.password = ''
  errors.agreeTerms = ''
  
  submitResult.value = null
}
</script>

<style scoped>
.form-page {
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

.form-section {
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h2 {
  color: #333;
  margin-bottom: 20px;
  font-size: 18px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #333;
  font-weight: 500;
}

input[type="text"],
input[type="email"],
input[type="password"],
select,
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.3s;
}

input:focus,
select:focus,
textarea:focus {
  outline: none;
  border-color: #2196f3;
}

.error {
  color: #f44336;
  font-size: 12px;
  margin-top: 5px;
  display: block;
}

.char-count {
  color: #999;
  font-size: 12px;
  margin-top: 5px;
  display: block;
}

.checkbox-group {
  margin-bottom: 20px;
}

.checkbox-label,
.radio-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-weight: normal;
}

.radio-group {
  display: flex;
  gap: 20px;
  margin-top: 10px;
}

.form-actions {
  display: flex;
  gap: 10px;
  margin-top: 30px;
}

.submit-btn,
.reset-btn {
  padding: 12px 24px;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
}

.submit-btn {
  background: #4caf50;
  color: white;
}

.submit-btn:hover:not(:disabled) {
  background: #45a049;
}

.submit-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.reset-btn {
  background: #9e9e9e;
  color: white;
}

.reset-btn:hover {
  background: #757575;
}

.submit-result {
  margin-top: 30px;
  padding: 20px;
  background: #f5f5f5;
  border-radius: 8px;
}

.submit-result h3 {
  margin-bottom: 10px;
  color: #4caf50;
}

.submit-result pre {
  background: #333;
  color: #fff;
  padding: 15px;
  border-radius: 4px;
  overflow-x: auto;
  font-size: 12px;
}

a {
  color: #2196f3;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>
