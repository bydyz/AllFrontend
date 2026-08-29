/**
 * 异步操作测试
 * 演示 Vitest 异步测试：Promise、async/await、Mock
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

// 模拟的异步函数
function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: 1, name: '测试数据' })
    }, 100)
  })
}

function fetchWithError() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('请求失败'))
    }, 100)
  })
}

// 模拟的API模块
const api = {
  async getUser(id) {
    const response = await fetch(`/api/users/${id}`)
    return response.json()
  },
  
  async createUser(data) {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    return response.json()
  }
}

describe('异步操作测试', () => {
  // ========== Promise测试 ==========
  describe('Promise 测试', () => {
    it('应该正确处理Promise resolve', async () => {
      const data = await fetchData()
      expect(data).toEqual({ id: 1, name: '测试数据' })
    })

    it('应该正确处理Promise reject', async () => {
      try {
        await fetchWithError()
      } catch (error) {
        expect(error.message).toBe('请求失败')
      }
    })

    it('应该使用rejects处理Promise reject', async () => {
      await expect(fetchWithError()).rejects.toThrow('请求失败')
    })
  })

  // ========== async/await测试 ==========
  describe('async/await 测试', () => {
    it('应该正确使用async/await', async () => {
      const result = await Promise.resolve(42)
      expect(result).toBe(42)
    })

    it('应该正确处理多个异步操作', async () => {
      const results = await Promise.all([
        Promise.resolve(1),
        Promise.resolve(2),
        Promise.resolve(3)
      ])
      expect(results).toEqual([1, 2, 3])
    })

    it('应该正确处理Promise.race', async () => {
      const result = await Promise.race([
        new Promise(resolve => setTimeout(() => resolve('慢'), 200)),
        new Promise(resolve => setTimeout(() => resolve('快'), 100))
      ])
      expect(result).toBe('快')
    })
  })

  // ========== Mock测试 ==========
  describe('Mock 测试', () => {
    // 保存原始实现
    const originalFetch = global.fetch

    afterEach(() => {
      // 恢复原始实现
      global.fetch = originalFetch
    })

    it('应该正确mock异步函数', async () => {
      // 创建mock函数
      const mockFetchData = vi.fn().mockResolvedValue({ id: 1, name: 'Mock数据' })
      
      const data = await mockFetchData()
      expect(data).toEqual({ id: 1, name: 'Mock数据' })
      expect(mockFetchData).toHaveBeenCalledTimes(1)
    })

    it('应该正确mock fetch', async () => {
      // Mock fetch
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ id: 1, name: '用户' })
      })
      
      const user = await api.getUser(1)
      expect(user).toEqual({ id: 1, name: '用户' })
      expect(fetch).toHaveBeenCalledWith('/api/users/1')
    })

    it('应该正确mock带延迟的函数', async () => {
      vi.useFakeTimers()
      
      const mockFn = vi.fn()
      setTimeout(() => mockFn('延迟调用'), 1000)
      
      // 时间未到，不应该调用
      expect(mockFn).not.toHaveBeenCalled()
      
      // 快进时间
      vi.advanceTimersByTime(1000)
      
      // 时间到了，应该调用
      expect(mockFn).toHaveBeenCalledWith('延迟调用')
      
      vi.useRealTimers()
    })

    it('应该正确mock模块', async () => {
      // 动态导入模块（使用命名导出）
      const mathModule = await import('../utils/math.js')
      
      // Mock模块中的函数
      vi.spyOn(mathModule, 'add').mockReturnValue(100)
      
      // 调用被mock的函数
      const result = mathModule.add(1, 2)
      expect(result).toBe(100)
      expect(mathModule.add).toHaveBeenCalledWith(1, 2)
      
      // 恢复原始实现
      mathModule.add.mockRestore()
    })
  })

  // ========== 定时器Mock测试 ==========
  describe('定时器Mock测试', () => {
    beforeEach(() => {
      vi.useFakeTimers()
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    it('应该正确mock setTimeout', () => {
      const callback = vi.fn()
      
      setTimeout(callback, 1000)
      
      // 时间未到
      expect(callback).not.toHaveBeenCalled()
      
      // 快进时间
      vi.advanceTimersByTime(1000)
      
      // 时间到了
      expect(callback).toHaveBeenCalled()
    })

    it('应该正确mock setInterval', () => {
      const callback = vi.fn()
      
      setInterval(callback, 1000)
      
      // 第一次调用
      vi.advanceTimersByTime(1000)
      expect(callback).toHaveBeenCalledTimes(1)
      
      // 第二次调用
      vi.advanceTimersByTime(1000)
      expect(callback).toHaveBeenCalledTimes(2)
    })

    it('应该正确使用vi.runAllTimers()', () => {
      const callback1 = vi.fn()
      const callback2 = vi.fn()
      
      setTimeout(callback1, 1000)
      setTimeout(callback2, 2000)
      
      // 运行所有定时器
      vi.runAllTimers()
      
      expect(callback1).toHaveBeenCalled()
      expect(callback2).toHaveBeenCalled()
    })
  })
})
