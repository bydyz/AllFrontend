/**
 * useCounter 组合式函数
 * 提供计数器功能，用于演示组合式函数的测试
 */
import { ref, computed } from 'vue'

/**
 * 计数器组合式函数
 * @param {number} initialValue - 初始值
 * @param {number} step - 步长
 * @returns {Object} 计数器状态和方法
 */
export function useCounter(initialValue = 0, step = 1) {
  // 响应式计数
  const count = ref(initialValue)
  
  // 计算属性：是否为偶数
  const isEven = computed(() => count.value % 2 === 0)
  
  // 计算属性：是否为正数
  const isPositive = computed(() => count.value > 0)
  
  // 增加计数
  function increment() {
    count.value += step
  }
  
  // 减少计数
  function decrement() {
    count.value -= step
  }
  
  // 重置计数
  function reset() {
    count.value = initialValue
  }
  
  // 设置特定值
  function set(value) {
    count.value = value
  }
  
  return {
    count,
    isEven,
    isPositive,
    increment,
    decrement,
    reset,
    set
  }
}
