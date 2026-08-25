/**
 * 表单页面 E2E 测试
 * 演示 Playwright 表单测试：输入验证、表单提交、错误处理
 */
import { test, expect } from '@playwright/test'

// 测试.describe 用于组织相关测试
test.describe('表单测试', () => {
  // 每个测试前导航到表单页面
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.click('[data-testid="nav-form"]')
    await expect(page.locator('[data-testid="form-page"]')).toBeVisible()
  })

  // ========== 表单渲染测试 ==========
  test('表单应该正确渲染', async ({ page }) => {
    // 验证所有表单元素存在
    await expect(page.locator('[data-testid="input-name"]')).toBeVisible()
    await expect(page.locator('[data-testid="input-email"]')).toBeVisible()
    await expect(page.locator('[data-testid="input-password"]')).toBeVisible()
    await expect(page.locator('[data-testid="select-role"]')).toBeVisible()
    await expect(page.locator('[data-testid="textarea-bio"]')).toBeVisible()
    await expect(page.locator('[data-testid="checkbox-terms"]')).toBeVisible()
    await expect(page.locator('[data-testid="submit-btn"]')).toBeVisible()
  })

  // ========== 输入交互测试 ==========
  test('应该可以输入文本', async ({ page }) => {
    // 输入姓名
    await page.fill('[data-testid="input-name"]', '张三')
    await expect(page.locator('[data-testid="input-name"]')).toHaveValue('张三')
    
    // 输入邮箱
    await page.fill('[data-testid="input-email"]', 'zhangsan@example.com')
    await expect(page.locator('[data-testid="input-email"]')).toHaveValue('zhangsan@example.com')
    
    // 输入密码
    await page.fill('[data-testid="input-password"]', 'password123')
    await expect(page.locator('[data-testid="input-password"]')).toHaveValue('password123')
  })

  test('应该可以选择下拉选项', async ({ page }) => {
    // 选择角色
    await page.selectOption('[data-testid="select-role"]', 'admin')
    await expect(page.locator('[data-testid="select-role"]')).toHaveValue('admin')
  })

  test('应该可以输入多行文本', async ({ page }) => {
    // 输入个人简介
    await page.fill('[data-testid="textarea-bio"]', '这是一个测试简介')
    await expect(page.locator('[data-testid="textarea-bio"]')).toHaveValue('这是一个测试简介')
    
    // 验证字数统计
    await expect(page.locator('[data-testid="char-count"]')).toContainText('8/500')
  })

  test('应该可以勾选复选框', async ({ page }) => {
    // 勾选服务条款
    await page.check('[data-testid="checkbox-terms"]')
    await expect(page.locator('[data-testid="checkbox-terms"]')).toBeChecked()
    
    // 取消勾选
    await page.uncheck('[data-testid="checkbox-terms"]')
    await expect(page.locator('[data-testid="checkbox-terms"]')).not.toBeChecked()
  })

  test('应该可以选择单选按钮', async ({ page }) => {
    // 选择短信通知
    await page.check('[data-testid="radio-sms"]')
    await expect(page.locator('[data-testid="radio-sms"]')).toBeChecked()
    
    // 选择邮件通知
    await page.check('[data-testid="radio-email"]')
    await expect(page.locator('[data-testid="radio-email"]')).toBeChecked()
    await expect(page.locator('[data-testid="radio-sms"]')).not.toBeChecked()
  })

  // ========== 表单验证测试 ==========
  test('空表单提交应该显示错误', async ({ page }) => {
    // 直接点击提交按钮
    await page.click('[data-testid="submit-btn"]')
    
    // 验证错误信息显示
    await expect(page.locator('[data-testid="error-name"]')).toContainText('请输入姓名')
    await expect(page.locator('[data-testid="error-email"]')).toContainText('请输入邮箱')
    await expect(page.locator('[data-testid="error-password"]')).toContainText('请输入密码')
    await expect(page.locator('[data-testid="error-terms"]')).toContainText('请同意服务条款')
  })

  test('短姓名应该显示错误', async ({ page }) => {
    // 输入单个字符的姓名
    await page.fill('[data-testid="input-name"]', '张')
    
    // 点击提交
    await page.click('[data-testid="submit-btn"]')
    
    // 验证错误信息
    await expect(page.locator('[data-testid="error-name"]')).toContainText('姓名至少2个字符')
  })

  test('无效邮箱应该显示错误', async ({ page }) => {
    // 输入无效邮箱
    await page.fill('[data-testid="input-email"]', 'invalid-email')
    
    // 点击提交
    await page.click('[data-testid="submit-btn"]')
    
    // 验证错误信息
    await expect(page.locator('[data-testid="error-email"]')).toContainText('请输入有效的邮箱地址')
  })

  test('短密码应该显示错误', async ({ page }) => {
    // 输入短密码
    await page.fill('[data-testid="input-password"]', '123')
    
    // 点击提交
    await page.click('[data-testid="submit-btn"]')
    
    // 验证错误信息
    await expect(page.locator('[data-testid="error-password"]')).toContainText('密码至少6位')
  })

  // ========== 表单提交测试 ==========
  test('有效表单应该成功提交', async ({ page }) => {
    // 填写有效表单数据
    await page.fill('[data-testid="input-name"]', '张三')
    await page.fill('[data-testid="input-email"]', 'zhangsan@example.com')
    await page.fill('[data-testid="input-password"]', 'password123')
    await page.selectOption('[data-testid="select-role"]', 'admin')
    await page.fill('[data-testid="textarea-bio"]', '这是一个测试简介')
    await page.check('[data-testid="checkbox-terms"]')
    
    // 点击提交
    await page.click('[data-testid="submit-btn"]')
    
    // 验证提交中状态
    await expect(page.locator('[data-testid="submit-btn"]')).toContainText('提交中...')
    await expect(page.locator('[data-testid="submit-btn"]')).toBeDisabled()
    
    // 等待提交完成
    await expect(page.locator('[data-testid="submit-result"]')).toBeVisible({ timeout: 3000 })
    
    // 验证提交结果
    await expect(page.locator('[data-testid="submit-result"]')).toContainText('提交成功！')
  })

  // ========== 重置表单测试 ==========
  test('重置按钮应该清空表单', async ({ page }) => {
    // 填写表单
    await page.fill('[data-testid="input-name"]', '张三')
    await page.fill('[data-testid="input-email"]', 'zhangsan@example.com')
    await page.fill('[data-testid="input-password"]', 'password123')
    
    // 点击重置
    await page.click('[data-testid="reset-form-btn"]')
    
    // 验证表单已清空
    await expect(page.locator('[data-testid="input-name"]')).toHaveValue('')
    await expect(page.locator('[data-testid="input-email"]')).toHaveValue('')
    await expect(page.locator('[data-testid="input-password"]')).toHaveValue('')
  })

  // ========== 键盘交互测试 ==========
  test('应该支持键盘交互', async ({ page }) => {
    // 使用Tab键导航
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')
    
    // 输入姓名
    await page.keyboard.type('张三')
    
    // 使用Tab键到邮箱
    await page.keyboard.press('Tab')
    await page.keyboard.type('zhangsan@example.com')
    
    // 验证输入
    await expect(page.locator('[data-testid="input-name"]')).toHaveValue('张三')
    await expect(page.locator('[data-testid="input-email"]')).toHaveValue('zhangsan@example.com')
  })

  // ========== 清除错误测试 ==========
  test('输入有效值后错误应该消失', async ({ page }) => {
    // 先触发错误
    await page.click('[data-testid="submit-btn"]')
    await expect(page.locator('[data-testid="error-name"]')).toBeVisible()
    
    // 输入有效姓名
    await page.fill('[data-testid="input-name"]', '张三')
    
    // 错误应该消失（因为watch会清除错误）
    // 注意：这里需要等待一下，因为错误清除是异步的
    await expect(page.locator('[data-testid="error-name"]')).not.toBeVisible()
  })
})
