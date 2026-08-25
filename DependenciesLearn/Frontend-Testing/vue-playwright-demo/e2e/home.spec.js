/**
 * 首页 E2E 测试
 * 演示 Playwright 基础测试：导航、元素交互、状态验证
 */
import { test, expect } from '@playwright/test'

// 测试.describe 用于组织相关测试
test.describe('首页测试', () => {
  // 每个测试前导航到首页
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  // ========== 页面加载测试 ==========
  test('页面应该正确加载', async ({ page }) => {
    // 验证页面标题
    await expect(page).toHaveTitle(/Playwright/)
    
    // 验证导航存在
    await expect(page.locator('[data-testid="navigation"]')).toBeVisible()
    
    // 验证首页内容存在
    await expect(page.locator('[data-testid="home-page"]')).toBeVisible()
  })

  // ========== 导航测试 ==========
  test('应该可以切换页面', async ({ page }) => {
    // 点击表单导航
    await page.click('[data-testid="nav-form"]')
    await expect(page.locator('[data-testid="form-page"]')).toBeVisible()
    
    // 点击列表导航
    await page.click('[data-testid="nav-list"]')
    await expect(page.locator('[data-testid="list-page"]')).toBeVisible()
    
    // 点击首页导航
    await page.click('[data-testid="nav-home"]')
    await expect(page.locator('[data-testid="home-page"]')).toBeVisible()
  })

  // ========== 计数器测试 ==========
  test('计数器应该正确工作', async ({ page }) => {
    // 验证初始值
    await expect(page.locator('[data-testid="counter-value"]')).toHaveText('0')
    
    // 点击增加按钮
    await page.click('[data-testid="counter-increment"]')
    await expect(page.locator('[data-testid="counter-value"]')).toHaveText('1')
    
    // 再次点击增加按钮
    await page.click('[data-testid="counter-increment"]')
    await expect(page.locator('[data-testid="counter-value"]')).toHaveText('2')
    
    // 点击减少按钮
    await page.click('[data-testid="counter-decrement"]')
    await expect(page.locator('[data-testid="counter-value"]')).toHaveText('1')
    
    // 点击重置按钮
    await page.click('[data-testid="counter-reset"]')
    await expect(page.locator('[data-testid="counter-value"]')).toHaveText('0')
  })

  test('计数器状态应该正确显示', async ({ page }) => {
    // 初始状态应该是"零"
    await expect(page.locator('[data-testid="counter-status"]')).toContainText('零')
    
    // 增加后应该是"正数"
    await page.click('[data-testid="counter-increment"]')
    await expect(page.locator('[data-testid="counter-status"]')).toContainText('正数')
    
    // 重置后应该是"零"
    await page.click('[data-testid="counter-reset"]')
    await expect(page.locator('[data-testid="counter-status"]')).toContainText('零')
    
    // 减少后应该是"负数"
    await page.click('[data-testid="counter-decrement"]')
    await expect(page.locator('[data-testid="counter-status"]')).toContainText('负数')
  })

  // ========== 展开/折叠测试 ==========
  test('展开/折叠应该正确工作', async ({ page }) => {
    // 内容应该默认隐藏
    await expect(page.locator('[data-testid="toggle-content"]')).not.toBeVisible()
    
    // 点击展开按钮
    await page.click('[data-testid="toggle-btn"]')
    await expect(page.locator('[data-testid="toggle-content"]')).toBeVisible()
    
    // 按钮文本应该改变
    await expect(page.locator('[data-testid="toggle-btn"]')).toHaveText('收起内容')
    
    // 再次点击收起
    await page.click('[data-testid="toggle-btn"]')
    await expect(page.locator('[data-testid="toggle-content"]')).not.toBeVisible()
    
    // 按钮文本应该恢复
    await expect(page.locator('[data-testid="toggle-btn"]')).toHaveText('展开内容')
  })

  // ========== 模态框测试 ==========
  test('模态框应该正确打开和关闭', async ({ page }) => {
    // 模态框应该默认隐藏
    await expect(page.locator('[data-testid="modal-overlay"]')).not.toBeVisible()
    
    // 点击打开模态框按钮
    await page.click('[data-testid="open-modal"]')
    await expect(page.locator('[data-testid="modal-overlay"]')).toBeVisible()
    await expect(page.locator('[data-testid="modal"]')).toBeVisible()
    
    // 点击关闭按钮
    await page.click('[data-testid="close-modal"]')
    await expect(page.locator('[data-testid="modal-overlay"]')).not.toBeVisible()
  })

  // ========== 键盘交互测试 ==========
  test('应该支持键盘交互', async ({ page }) => {
    // 聚焦到计数器增加按钮
    await page.focus('[data-testid="counter-increment"]')
    
    // 按回车键
    await page.keyboard.press('Enter')
    await expect(page.locator('[data-testid="counter-value"]')).toHaveText('1')
  })

  // ========== 元素属性测试 ==========
  test('应该验证元素属性', async ({ page }) => {
    // 验证导航按钮存在
    const homeBtn = page.locator('[data-testid="nav-home"]')
    await expect(homeBtn).toBeEnabled()
    
    // 验证计数器按钮存在
    const incrementBtn = page.locator('[data-testid="counter-increment"]')
    await expect(incrementBtn).toBeEnabled()
    
    // 验证输入框属性
    const searchInput = page.locator('[data-testid="search-input"]')
    await expect(searchInput).toHaveAttribute('type', 'text')
  })
})
