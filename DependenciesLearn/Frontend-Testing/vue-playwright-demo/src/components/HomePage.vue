<template>
  <div class="home-page" data-testid="home-page">
    <h1>欢迎来到 Playwright 测试示例</h1>
    <p class="description">
      这是一个用于演示 Playwright 端到端测试的 Vue 应用。
    </p>
    
    <!-- 计数器示例 -->
    <section class="counter-section" data-testid="counter-section">
      <h2>计数器示例</h2>
      <div class="counter">
        <button 
          @click="decrement" 
          class="counter-btn decrement"
          data-testid="counter-decrement"
        >
          -
        </button>
        <span class="counter-value" data-testid="counter-value">{{ count }}</span>
        <button 
          @click="increment" 
          class="counter-btn increment"
          data-testid="counter-increment"
        >
          +
        </button>
      </div>
      <button 
        @click="reset" 
        class="reset-btn"
        data-testid="counter-reset"
      >
        重置
      </button>
      <p class="counter-status" data-testid="counter-status">
        当前状态: {{ count > 0 ? '正数' : count < 0 ? '负数' : '零' }}
      </p>
    </section>
    
    <!-- 展开/折叠示例 -->
    <section class="toggle-section" data-testid="toggle-section">
      <h2>展开/折叠示例</h2>
      <button 
        @click="showContent = !showContent"
        class="toggle-btn"
        data-testid="toggle-btn"
      >
        {{ showContent ? '收起内容' : '展开内容' }}
      </button>
      <div 
        v-show="showContent" 
        class="toggle-content"
        data-testid="toggle-content"
      >
        <p>这是可以展开和折叠的内容区域。</p>
        <p>Playwright 可以测试这种交互效果。</p>
      </div>
    </section>
    
    <!-- 模态框示例 -->
    <section class="modal-section" data-testid="modal-section">
      <h2>模态框示例</h2>
      <button 
        @click="showModal = true" 
        class="modal-btn"
        data-testid="open-modal"
      >
        打开模态框
      </button>
      
      <!-- 模态框 -->
      <div v-if="showModal" class="modal-overlay" data-testid="modal-overlay">
        <div class="modal" data-testid="modal">
          <h3>这是一个模态框</h3>
          <p>点击关闭按钮或遮罩层可以关闭模态框。</p>
          <div class="modal-actions">
            <button 
              @click="showModal = false" 
              class="modal-close"
              data-testid="close-modal"
            >
              关闭
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
/**
 * HomePage 组件
 * 演示各种交互组件的 E2E 测试
 */
import { ref } from 'vue'

// 计数器状态
const count = ref(0)

// 展开/折叠状态
const showContent = ref(false)

// 模态框状态
const showModal = ref(false)

// 增加计数
function increment() {
  count.value++
}

// 减少计数
function decrement() {
  count.value--
}

// 重置计数
function reset() {
  count.value = 0
}
</script>

<style scoped>
.home-page {
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

/* 计数器样式 */
.counter {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 10px;
}

.counter-btn {
  width: 40px;
  height: 40px;
  font-size: 20px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  transition: background 0.3s;
}

.counter-btn.increment {
  background: #4caf50;
  color: white;
}

.counter-btn.increment:hover {
  background: #45a049;
}

.counter-btn.decrement {
  background: #f44336;
  color: white;
}

.counter-btn.decrement:hover {
  background: #da190b;
}

.counter-value {
  font-size: 24px;
  font-weight: bold;
  min-width: 60px;
  text-align: center;
}

.reset-btn {
  padding: 8px 16px;
  background: #2196f3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 10px;
}

.reset-btn:hover {
  background: #0b7dda;
}

.counter-status {
  color: #666;
  font-style: italic;
}

/* 展开/折叠样式 */
.toggle-btn {
  padding: 10px 20px;
  background: #9c27b0;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 15px;
}

.toggle-btn:hover {
  background: #7b1fa2;
}

.toggle-content {
  padding: 15px;
  background: #f5f5f5;
  border-radius: 4px;
  margin-top: 10px;
}

.toggle-content p {
  margin: 5px 0;
  color: #666;
}

/* 模态框样式 */
.modal-btn {
  padding: 10px 20px;
  background: #ff9800;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.modal-btn:hover {
  background: #f57c00;
}

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
  min-width: 300px;
  max-width: 90%;
}

.modal h3 {
  margin-bottom: 15px;
  color: #333;
}

.modal p {
  color: #666;
  margin-bottom: 20px;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
}

.modal-close {
  padding: 10px 20px;
  background: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.modal-close:hover {
  background: #da190b;
}
</style>
