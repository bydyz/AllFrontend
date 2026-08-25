/**
 * 高级 E2E 测试
 * 演示 Playwright 高级功能：API拦截、截图、并行测试等
 */
import { test, expect } from '@playwright/test'

// 测试.describe 用于组织相关测试
test.describe('高级测试', () => {
  // ========== API 拦截测试 ==========
  test('应该可以拦截 API 请求', async ({ page }) => {
    // 监听所有请求
    const requests = []
    page.on('request', request => {
      requests.push(request)
    })
    
    // 监听所有响应
    const responses = []
    page.on('response', response => {
      responses.push(response)
    })
    
    // 导航到页面
    await page.goto('/')
    
    // 验证请求被记录
    expect(requests.length).toBeGreaterThan(0)
    
    // 验证有主页的请求
    const mainRequest = requests.find(r => r.url().includes('/'))
    expect(mainRequest).toBeDefined()
  })

  // ========== 网络错误模拟测试 ==========
  test('应该可以模拟网络错误', async ({ page }) => {
    // 模拟网络请求失败
    await page.route('**/api/**', route => {
      route.abort('connectionrefused')
    })
    
    // 这个测试展示了如何模拟网络错误
    // 在实际应用中，可以测试错误处理UI
  })

  // ========== 响应式设计测试 ==========
  test('应该支持不同的视口大小', async ({ page }) => {
    // 测试桌面视图
    await page.setViewportSize({ width: 1920, height: 1080 })
    await page.goto('/')
    await expect(page.locator('[data-testid="navigation"]')).toBeVisible()
    
    // 测试平板视图
    await page.setViewportSize({ width: 768, height: 1024 })
    await expect(page.locator('[data-testid="navigation"]')).toBeVisible()
    
    // 测试手机视图
    await page.setViewportSize({ width: 375, height: 667 })
    await expect(page.locator('[data-testid="navigation"]')).toBeVisible()
  })

  // ========== 截图测试 ==========
  test('应该可以截图', async ({ page }) => {
    await page.goto('/')
    
    // 全页面截图
    await page.screenshot({ 
      path: 'test-results/screenshots/homepage.png',
      fullPage: true 
    })
    
    // 特定元素截图
    const navigation = page.locator('[data-testid="navigation"]')
    await navigation.screenshot({ 
      path: 'test-results/screenshots/navigation.png' 
    })
  })

  // ========== PDF 生成测试 ==========
  test('应该可以生成 PDF', async ({ page }) => {
    await page.goto('/')
    
    // 生成 PDF（仅支持 Chromium）
    const pdf = await page.pdf()
    expect(pdf).toBeTruthy()
  })

  // ========== 多标签页测试 ==========
  test('应该支持多标签页', async ({ page, context }) => {
    // 打开新标签页
    const newPage = await context.newPage()
    await newPage.goto('/')
    
    // 验证新标签页
    await expect(newPage.locator('[data-testid="navigation"]')).toBeVisible()
    
    // 关闭新标签页
    await newPage.close()
  })

  // ========== 本地存储测试 ==========
  test('应该可以操作 localStorage', async ({ page }) => {
    await page.goto('/')
    
    // 设置 localStorage
    await page.evaluate(() => {
      localStorage.setItem('testKey', 'testValue')
    })
    
    // 获取 localStorage
    const value = await page.evaluate(() => {
      return localStorage.getItem('testKey')
    })
    expect(value).toBe('testValue')
    
    // 清除 localStorage
    await page.evaluate(() => {
      localStorage.clear()
    })
  })

  // ========== Cookie 测试 ==========
  test('应该可以操作 Cookie', async ({ page, context }) => {
    await page.goto('/')
    
    // 设置 Cookie
    await context.addCookies([{
      name: 'testCookie',
      value: 'testValue',
      domain: 'localhost',
      path: '/'
    }])
    
    // 获取 Cookie
    const cookies = await context.cookies()
    const testCookie = cookies.find(c => c.name === 'testCookie')
    expect(testCookie).toBeTruthy()
    expect(testCookie.value).toBe('testValue')
  })

  // ========== 等待策略测试 ==========
  test('应该支持多种等待策略', async ({ page }) => {
    await page.goto('/')
    
    // 等待元素可见
    await page.waitForSelector('[data-testid="counter-section"]', { state: 'visible' })
    
    // 等待元素隐藏
    await page.click('[data-testid="toggle-btn"]')
    await page.waitForSelector('[data-testid="toggle-content"]', { state: 'visible' })
    
    // 等待网络空闲
    await page.waitForLoadState('networkidle')
    
    // 等待特定时间
    await page.waitForTimeout(100)
  })

  // ========== 鼠标操作测试 ==========
  test('应该支持鼠标操作', async ({ page }) => {
    await page.goto('/')
    
    // 鼠标悬停
    await page.hover('[data-testid="counter-increment"]')
    
    // 鼠标点击
    await page.click('[data-testid="counter-increment"]')
    
    // 右键点击
    await page.click('[data-testid="counter-section"]', { button: 'right' })
    
    // 双击
    await page.dblclick('[data-testid="counter-reset"]')
  })

  // ========== 手势模拟测试 ==========
  test('应该支持手势模拟', async ({ page }) => {
    await page.goto('/')
    
    // 模拟触摸事件
    const element = page.locator('[data-testid="counter-increment"]')
    await element.tap()
    
    // 验证计数增加
    await expect(page.locator('[data-testid="counter-value"]')).toHaveText('1')
  })

  // ========== 文件上传测试 ==========
  test('应该支持文件上传', async ({ page }) => {
    // 这个测试展示了如何测试文件上传功能
    // 在实际应用中，需要有文件上传的UI元素
    
    // 创建一个文件
    const fileContent = 'test file content'
    const fileName = 'test.txt'
    
    // 注意：这个测试需要页面上有文件上传元素
    // await page.setInputFiles('input[type="file"]', {
    //   name: fileName,
    //   mimeType: 'text/plain',
    //   buffer: Buffer.from(fileContent)
    // })
  })

  // ========== 条件测试 ==========
  test('应该可以根据条件跳过测试', async ({ page }) => {
    // 这个测试只在 Chromium 中运行
    test.skip(({ browserName }) => browserName !== 'chromium', '仅在 Chromium 中运行')
    
    await page.goto('/')
    await expect(page.locator('[data-testid="navigation"]')).toBeVisible()
  })

  // ========== 重试测试 ==========
  test('应该支持重试', async ({ page }) => {
    // 这个测试会自动重试
    await page.goto('/')
    
    // 使用 expect 的重试机制
    await expect(async () => {
      await expect(page.locator('[data-testid="counter-value"]')).toHaveText('0')
    }).toPass()
  })
})
