/**
 * 列表页面 E2E 测试
 * 演示 Playwright 列表测试：搜索、过滤、CRUD操作
 */
import { test, expect } from '@playwright/test'

// 测试.describe 用于组织相关测试
test.describe('列表测试', () => {
  // 每个测试前导航到列表页面
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.click('[data-testid="nav-list"]')
    await expect(page.locator('[data-testid="list-page"]')).toBeVisible()
  })

  // ========== 页面加载测试 ==========
  test('列表页面应该正确加载', async ({ page }) => {
    // 验证页面元素存在
    await expect(page.locator('[data-testid="search-input"]')).toBeVisible()
    await expect(page.locator('[data-testid="filter-role"]')).toBeVisible()
    await expect(page.locator('[data-testid="user-list"]')).toBeVisible()
    
    // 验证用户数量
    await expect(page.locator('[data-testid="result-count"]')).toContainText('5')
  })

  // ========== 搜索功能测试 ==========
  test('应该可以搜索用户', async ({ page }) => {
    // 输入搜索关键词
    await page.fill('[data-testid="search-input"]', '张三')
    
    // 验证过滤结果
    await expect(page.locator('[data-testid="result-count"]')).toContainText('1')
    await expect(page.locator('[data-testid="user-item-1"]')).toBeVisible()
    
    // 清空搜索
    await page.fill('[data-testid="search-input"]', '')
    await expect(page.locator('[data-testid="result-count"]')).toContainText('5')
  })

  test('搜索邮箱也应该有效', async ({ page }) => {
    // 输入邮箱搜索
    await page.fill('[data-testid="search-input"]', 'lisi@example.com')
    
    // 验证过滤结果
    await expect(page.locator('[data-testid="result-count"]')).toContainText('1')
    await expect(page.locator('[data-testid="user-item-2"]')).toBeVisible()
  })

  test('搜索不匹配的内容应该显示空状态', async ({ page }) => {
    // 输入不匹配的搜索词
    await page.fill('[data-testid="search-input"]', '不存在的用户')
    
    // 验证空状态
    await expect(page.locator('[data-testid="result-count"]')).toContainText('0')
    await expect(page.locator('[data-testid="empty-state"]')).toBeVisible()
  })

  // ========== 角色过滤测试 ==========
  test('应该可以按角色过滤', async ({ page }) => {
    // 选择管理员角色
    await page.selectOption('[data-testid="filter-role"]', 'admin')
    
    // 验证过滤结果
    await expect(page.locator('[data-testid="result-count"]')).toContainText('2')
    
    // 选择普通用户角色
    await page.selectOption('[data-testid="filter-role"]', 'user')
    
    // 验证过滤结果
    await expect(page.locator('[data-testid="result-count"]')).toContainText('2')
    
    // 选择访客角色
    await page.selectOption('[data-testid="filter-role"]', 'guest')
    
    // 验证过滤结果
    await expect(page.locator('[data-testid="result-count"]')).toContainText('1')
    
    // 恢复显示所有
    await page.selectOption('[data-testid="filter-role"]', '')
    await expect(page.locator('[data-testid="result-count"]')).toContainText('5')
  })

  // ========== 添加用户测试 ==========
  test('应该可以添加新用户', async ({ page }) => {
    // 填写新用户信息
    await page.fill('[data-testid="new-user-name"]', '新用户')
    await page.fill('[data-testid="new-user-email"]', 'newuser@example.com')
    
    // 点击添加按钮
    await page.click('[data-testid="add-user-btn"]')
    
    // 验证用户已添加
    await expect(page.locator('[data-testid="result-count"]')).toContainText('6')
    
    // 验证新用户显示在列表中
    const newUserItem = page.locator('.user-item').filter({ hasText: '新用户' })
    await expect(newUserItem).toBeVisible()
  })

  test('添加按钮在表单为空时应该禁用', async ({ page }) => {
    // 验证添加按钮禁用
    await expect(page.locator('[data-testid="add-user-btn"]')).toBeDisabled()
    
    // 填写用户名
    await page.fill('[data-testid="new-user-name"]', '用户')
    await expect(page.locator('[data-testid="add-user-btn"]')).toBeDisabled()
    
    // 填写邮箱
    await page.fill('[data-testid="new-user-email"]', 'user@example.com')
    await expect(page.locator('[data-testid="add-user-btn"]')).not.toBeDisabled()
  })

  // ========== 选择用户测试 ==========
  test('应该可以选中用户', async ({ page }) => {
    // 点击第一个用户
    await page.click('[data-testid="user-item-1"]')
    
    // 验证用户被选中
    await expect(page.locator('[data-testid="user-item-1"]')).toHaveClass(/selected/)
    
    // 验证详情显示
    await expect(page.locator('[data-testid="user-detail-section"]')).toBeVisible()
    await expect(page.locator('[data-testid="detail-name"]')).toContainText('张三')
    
    // 再次点击取消选中
    await page.click('[data-testid="user-item-1"]')
    await expect(page.locator('[data-testid="user-detail-section"]')).not.toBeVisible()
  })

  // ========== 编辑用户测试 ==========
  test('应该可以编辑用户', async ({ page }) => {
    // 点击编辑按钮
    await page.click('[data-testid="edit-user-1"]')
    
    // 验证编辑模态框显示
    await expect(page.locator('[data-testid="edit-modal"]')).toBeVisible()
    
    // 修改姓名
    await page.fill('[data-testid="edit-name"]', '张三（已修改）')
    
    // 点击保存
    await page.click('[data-testid="save-edit"]')
    
    // 验证模态框关闭
    await expect(page.locator('[data-testid="edit-modal"]')).not.toBeVisible()
    
    // 验证姓名已更新
    await expect(page.locator('[data-testid="user-name-1"]')).toContainText('张三（已修改）')
  })

  test('编辑后取消应该不保存更改', async ({ page }) => {
    // 点击编辑按钮
    await page.click('[data-testid="edit-user-2"]')
    
    // 修改姓名
    await page.fill('[data-testid="edit-name"]', '李四（不应该保存）')
    
    // 点击取消
    await page.click('[data-testid="cancel-edit"]')
    
    // 验证姓名未更改
    await expect(page.locator('[data-testid="user-name-2"]')).toContainText('李四')
  })

  // ========== 删除用户测试 ==========
  test('应该可以删除用户', async ({ page }) => {
    // 验证初始用户数量
    await expect(page.locator('[data-testid="result-count"]')).toContainText('5')
    
    // 点击删除按钮
    await page.click('[data-testid="delete-user-5"]')
    
    // 验证用户已删除
    await expect(page.locator('[data-testid="result-count"]')).toContainText('4')
    await expect(page.locator('[data-testid="user-item-5"]')).not.toBeVisible()
  })

  // ========== 组合过滤测试 ==========
  test('搜索和角色过滤应该可以同时使用', async ({ page }) => {
    // 输入搜索关键词
    await page.fill('[data-testid="search-input"]', '张')
    
    // 选择管理员角色
    await page.selectOption('[data-testid="filter-role"]', 'admin')
    
    // 验证过滤结果
    await expect(page.locator('[data-testid="result-count"]')).toContainText('1')
    await expect(page.locator('[data-testid="user-item-1"]')).toBeVisible()
  })

  // ========== 角色标签测试 ==========
  test('用户角色标签应该正确显示', async ({ page }) => {
    // 验证管理员标签
    await expect(page.locator('[data-testid="user-role-1"]')).toContainText('管理员')
    await expect(page.locator('[data-testid="user-role-1"]')).toHaveClass(/admin/)
    
    // 验证普通用户标签
    await expect(page.locator('[data-testid="user-role-2"]')).toContainText('普通用户')
    await expect(page.locator('[data-testid="user-role-2"]')).toHaveClass(/user/)
    
    // 验证访客标签
    await expect(page.locator('[data-testid="user-role-3"]')).toContainText('访客')
    await expect(page.locator('[data-testid="user-role-3"]')).toHaveClass(/guest/)
  })

  // ========== 键盘交互测试 ==========
  test('应该支持键盘交互', async ({ page }) => {
    // 聚焦到搜索输入框
    await page.focus('[data-testid="search-input"]')
    
    // 输入搜索关键词
    await page.keyboard.type('张三')
    
    // 验证搜索结果
    await expect(page.locator('[data-testid="result-count"]')).toContainText('1')
  })
})
