/**
 * useFetch 组合式函数
 * 提供数据请求功能，用于演示异步操作的测试
 */
import { ref, watchEffect } from 'vue'

/**
 * 数据请求组合式函数
 * @param {string} url - 请求地址
 * @param {Object} options - 请求配置
 * @returns {Object} 请求状态和数据
 */
export function useFetch(url, options = {}) {
  // 响应数据
  const data = ref(null)
  // 错误信息
  const error = ref(null)
  // 加载状态
  const loading = ref(false)
  
  /**
   * 执行请求
   * @returns {Promise} 请求结果
   */
  async function fetchData() {
    loading.value = true
    error.value = null
    
    try {
      const response = await fetch(url, options)
      
      if (!response.ok) {
        throw new Error(`HTTP错误: ${response.status}`)
      }
      
      const result = await response.json()
      data.value = result
      return result
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }
  
  /**
   * 重新请求
   * @returns {Promise} 请求结果
   */
  function refetch() {
    return fetchData()
  }
  
  // 自动请求（如果URL存在）
  if (url) {
    fetchData()
  }
  
  return {
    data,
    error,
    loading,
    refetch,
    fetchData
  }
}
