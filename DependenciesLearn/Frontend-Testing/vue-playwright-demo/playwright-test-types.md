# Playwright 测试类型完整指南

## 目录

1. [Playwright 测试能力总览](#playwright-测试能力总览)
2. [页面导航测试](#1-页面导航测试)
3. [元素交互测试](#2-元素交互测试)
4. [表单测试](#3-表单测试)
5. [网络请求测试](#4-网络请求测试)
6. [截图和视觉测试](#5-截图和视觉测试)
7. [多标签页测试](#6-多标签页测试)
8. [响应式设计测试](#7-响应式设计测试)
9. [文件上传测试](#8-文件上传测试)
10. [认证测试](#9-认证测试)
11. [测试文件书写规范](#测试文件书写规范)
12. [常用断言 API 速查表](#常用断言-api-速查表)

---

## Playwright 测试能力总览

| 测试类型 | 说明 | 测试文件命名 | 适用场景 |
|---------|------|-------------|---------|
| 页面导航测试 | 测试页面跳转和加载 | `*.spec.js` | 多页面应用 |
| 元素交互测试 | 测试点击、输入等操作 | `*.spec.js` | 用户交互 |
| 表单测试 | 测试表单验证和提交 | `*.spec.js` | 表单功能 |
| 网络请求测试 | 测试 API 调用和拦截 | `*.spec.js` | 前后端交互 |
| 截图测试 | 测试页面视觉效果 | `*.spec.js` | UI 回归测试 |
| 多标签页测试 | 测试多窗口场景 | `*.spec.js` | 多窗口应用 |
| 响应式测试 | 测试不同屏幕尺寸 | `*.spec.js` | 移动端适配 |
| 文件上传测试 | 测试文件上传功能 | `*.spec.js` | 文件处理 |
| 认证测试 | 测试登录和权限 | `*.spec.js` | 用户认证 |

---

## 1. 页面导航测试

### 什么是页面导航测试

页面导航测试是测试应用的页面跳转、URL 变化和页面加载状态。

### 适用场景

- 多页面应用
- 路由切换
- 页面加载状态

### 示例代码

```javascript
import { test, expect } from '@playwright/test'

test.describe('页面导航测试', () => {
  test('应该正确加载首页', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Playwright/)
    await expect(page.locator('[data-testid="home-page"]')).toBeVisible()
  })

  test('应该可以切换页面', async ({ page }) => {
    await page.goto('/')
    
    // 点击导航到表单页
    await page.click('[data-testid="nav-form"]')
    await expect(page).toHaveURL(/.*form/)
    await expect(page.locator('[data-testid="form-page"]')).toBeVisible()
    
    // 点击导航到列表页
    await page.click('[data-testid="nav-list"]')
    await expect(page).toHaveURL(/.*list/)
    await expect(page.locator('[data-testid="list-page"]')).toBeVisible()
  })

  test('应该处理页面加载状态', async ({ page }) => {
    await page.goto('/')
    
    // 等待页面加载完成
    await page.waitForLoadState('networkidle')
    
    // 验证页面内容
    await expect(page.locator('[data-testid="navigation"]')).toBeVisible()
  })
})
```

---

## 2. 元素交互测试

### 什么是元素交互测试

元素交互测试是测试用户与页面元素的交互行为，如点击、输入、悬停等。

### 适用场景

- 按钮点击
- 输入框输入
- 键盘和鼠标操作

### 示例代码

```javascript
import { test, expect } from '@playwright/test'

test.describe('元素交互测试', () => {
  test('应该支持点击操作', async ({ page }) => {
    await page.goto('/')
    
    // 点击按钮
    await page.click('[data-testid="counter-increment"]')
    await expect(page.locator('[data-testid="counter-value"]')).toHaveText('1')
  })

  test('应该支持输入操作', async ({ page }) => {
    await page.goto('/')
    await page.click('[data-testid="nav-form"]')
    
    // 输入文本
    await page.fill('[data-testid="input-name"]', '张三')
    await expect(page.locator('[data-testid="input-name"]')).toHaveValue('张三')
  })

  test('应该支持键盘操作', async ({ page }) => {
    await page.goto('/')
    
    // 聚焦到元素
    await page.focus('[data-testid="counter-increment"]')
    
    // 按回车键
    await page.keyboard.press('Enter')
    await expect(page.locator('[data-testid="counter-value"]')).toHaveText('1')
  })

  test('应该支持鼠标悬停', async ({ page }) => {
    await page.goto('/')
    
    // 鼠标悬停
    await page.hover('[data-testid="counter-increment"]')
  })
})
```

---

## 3. 表单测试

### 什么是表单测试

表单测试是测试表单元素的输入、验证、提交和重置功能。

### 适用场景

- 表单验证
- 表单提交
- 错误处理

### 示例代码

```javascript
import { test, expect } from '@playwright/test'

test.describe('表单测试', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.click('[data-testid="nav-form"]')
  })

  test('应该验证表单输入', async ({ page }) => {
    // 直接提交空表单
    await page.click('[data-testid="submit-btn"]')
    
    // 验证错误信息
    await expect(page.locator('[data-testid="error-name"]')).toContainText('请输入姓名')
    await expect(page.locator('[data-testid="error-email"]')).toContainText('请输入邮箱')
  })

  test('应该支持下拉选择', async ({ page }) => {
    // 选择下拉选项
    await page.selectOption('[data-testid="select-role"]', 'admin')
    await expect(page.locator('[data-testid="select-role"]')).toHaveValue('admin')
  })

  test('应该支持复选框', async ({ page }) => {
    // 勾选复选框
    await page.check('[data-testid="checkbox-terms"]')
    await expect(page.locator('[data-testid="checkbox-terms"]')).toBeChecked()
    
    // 取消勾选
    await page.uncheck('[data-testid="checkbox-terms"]')
    await expect(page.locator('[data-testid="checkbox-terms"]')).not.toBeChecked()
  })

  test('应该支持表单提交', async ({ page }) => {
    // 填写有效表单
    await page.fill('[data-testid="input-name"]', '张三')
    await page.fill('[data-testid="input-email"]', 'zhangsan@example.com')
    await page.fill('[data-testid="input-password"]', 'password123')
    await page.check('[data-testid="checkbox-terms"]')
    
    // 提交表单
    await page.click('[data-testid="submit-btn"]')
    
    // 验证提交结果
    await expect(page.locator('[data-testid="submit-result"]')).toBeVisible()
  })
})
```

---

## 4. 网络请求测试

### 什么是网络请求测试

网络请求测试是测试应用的 API 调用、请求拦截和响应处理。

### 适用场景

- API 调用测试
- 网络错误模拟
- 请求拦截

### 示例代码

```javascript
import { test, expect } from '@playwright/test'

test.describe('网络请求测试', () => {
  test('应该可以拦截 API 请求', async ({ page }) => {
    // 监听请求
    const requests = []
    page.on('request', request => {
      requests.push(request)
    })
    
    await page.goto('/')
    
    // 验证请求被记录
    expect(requests.length).toBeGreaterThan(0)
  })

  test('应该可以模拟网络错误', async ({ page }) => {
    // 模拟网络请求失败
    await page.route('**/api/**', route => {
      route.abort('connectionrefused')
    })
    
    await page.goto('/')
  })

  test('应该可以 mock API 响应', async ({ page }) => {
    // Mock API 响应
    await page.route('**/api/users', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          { id: 1, name: '张三' },
          { id: 2, name: '李四' }
        ])
      })
    })
    
    await page.goto('/')
  })
})
```

---

## 5. 截图和视觉测试

### 什么是截图测试

截图测试是测试页面的视觉效果，通过对比截图来检测 UI 变化。

### 适用场景

- UI 回归测试
- 视觉效果验证
- 文档生成

### 示例代码

```javascript
import { test, expect } from '@playwright/test'

test.describe('截图测试', () => {
  test('应该可以截取全页面截图', async ({ page }) => {
    await page.goto('/')
    
    // 全页面截图
    await page.screenshot({ 
      path: 'test-results/screenshots/homepage.png',
      fullPage: true 
    })
  })

  test('应该可以截取特定元素截图', async ({ page }) => {
    await page.goto('/')
    
    // 特定元素截图
    const navigation = page.locator('[data-testid="navigation"]')
    await navigation.screenshot({ 
      path: 'test-results/screenshots/navigation.png' 
    })
  })

  test('应该可以生成 PDF', async ({ page }) => {
    await page.goto('/')
    
    // 生成 PDF（仅支持 Chromium）
    const pdf = await page.pdf()
    expect(pdf).toBeTruthy()
  })
})
```

---

## 6. 多标签页测试

### 什么是多标签页测试

多标签页测试是测试应用在多个浏览器标签页中的行为。

### 适用场景

- 多窗口应用
- 跨标签页通信
- 标签页管理

### 示例代码

```javascript
import { test, expect } from '@playwright/test'

test.describe('多标签页测试', () => {
  test('应该支持多标签页', async ({ page, context }) => {
    await page.goto('/')
    
    // 打开新标签页
    const newPage = await context.newPage()
    await newPage.goto('/')
    
    // 验证新标签页
    await expect(newPage.locator('[data-testid="navigation"]')).toBeVisible()
    
    // 关闭新标签页
    await newPage.close()
  })

  test('应该支持标签页切换', async ({ page, context }) => {
    await page.goto('/')
    
    // 打开新标签页
    const newPage = await context.newPage()
    await newPage.goto('/')
    
    // 切换回原标签页
    await page.bringToFront()
    await expect(page.locator('[data-testid="navigation"]')).toBeVisible()
  })
})
```

---

## 7. 响应式设计测试

### 什么是响应式设计测试

响应式设计测试是测试应用在不同屏幕尺寸下的显示效果。

### 适用场景

- 移动端适配
- 平板适配
- 桌面端适配

### 示例代码

```javascript
import { test, expect } from '@playwright/test'

test.describe('响应式设计测试', () => {
  test('应该支持桌面视图', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 })
    await page.goto('/')
    await expect(page.locator('[data-testid="navigation"]')).toBeVisible()
  })

  test('应该支持平板视图', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 })
    await page.goto('/')
    await expect(page.locator('[data-testid="navigation"]')).toBeVisible()
  })

  test('应该支持手机视图', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
    await expect(page.locator('[data-testid="navigation"]')).toBeVisible()
  })
})
```

---

## 8. 文件上传测试

### 什么是文件上传测试

文件上传测试是测试应用的文件上传功能。

### 适用场景

- 文件上传
- 图片上传
- 文档上传

### 示例代码

```javascript
import { test, expect } from '@playwright/test'

test.describe('文件上传测试', () => {
  test('应该支持文件上传', async ({ page }) => {
    await page.goto('/')
    
    // 创建文件
    const fileContent = 'test file content'
    const fileName = 'test.txt'
    
    // 上传文件
    // await page.setInputFiles('input[type="file"]', {
    //   name: fileName,
    //   mimeType: 'text/plain',
    //   buffer: Buffer.from(fileContent)
    // })
  })
})
```

---

## 9. 认证测试

### 什么是认证测试

认证测试是测试应用的登录、登出和权限控制功能。

### 适用场景

- 用户登录
- 权限控制
- 会话管理

### 示例代码

```javascript
import { test, expect } from '@playwright/test'

test.describe('认证测试', () => {
  test('应该支持用户登录', async ({ page }) => {
    await page.goto('/login')
    
    // 输入用户名和密码
    await page.fill('[data-testid="username"]', 'admin')
    await page.fill('[data-testid="password"]', 'password123')
    
    // 点击登录
    await page.click('[data-testid="login-btn"]')
    
    // 验证登录成功
    await expect(page.locator('[data-testid="user-info"]')).toBeVisible()
  })

  test('应该支持用户登出', async ({ page }) => {
    await page.goto('/')
    
    // 点击登出
    await page.click('[data-testid="logout-btn"]')
    
    // 验证登出成功
    await expect(page.locator('[data-testid="login-btn"]')).toBeVisible()
  })
})
```

---

## 测试文件书写规范

### 1. 文件命名规范

```
测试文件：e2e/home.spec.js
测试文件：e2e/form.spec.js
测试文件：e2e/list.spec.js
```

### 2. 文件结构规范

```javascript
import { test, expect } from '@playwright/test'

describe('模块名称', () => {
  // 测试前准备
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  // ========== 功能点1测试 ==========
  test('功能点1描述', async ({ page }) => {
    // 测试代码
    await expect(page.locator('selector')).toBeVisible()
  })

  // ========== 功能点2测试 ==========
  test('功能点2描述', async ({ page }) => {
    // 测试代码
  })
})
```

### 3. 测试描述规范

```javascript
// ✅ 好的描述
test('页面应该正确加载', async ({ page }) => { ... })
test('应该可以切换页面', async ({ page }) => { ... })
test('计数器应该正确工作', async ({ page }) => { ... })

// ❌ 不好的描述
test('测试加载', async ({ page }) => { ... })
test('测试切换', async ({ page }) => { ... })
test('测试计数器', async ({ page }) => { ... })
```

### 4. 断言规范

```javascript
// ✅ 好的断言
await expect(page.locator('selector')).toBeVisible()
await expect(page.locator('selector')).toHaveText('内容')
await expect(page.locator('selector')).toHaveValue('值')
await expect(page.locator('selector')).toBeChecked()

// ❌ 不好的断言
const text = await page.locator('selector').textContent()
expect(text === '内容').toBe(true)
```

---

## 常用断言 API 速查表

### 可见性断言

| API | 说明 | 示例 |
|-----|------|------|
| `toBeVisible` | 元素可见 | `await expect(locator).toBeVisible()` |
| `not.toBeVisible` | 元素不可见 | `await expect(locator).not.toBeVisible()` |
| `toBeHidden` | 元素隐藏 | `await expect(locator).toBeHidden()` |

### 文本断言

| API | 说明 | 示例 |
|-----|------|------|
| `toHaveText` | 文本内容完全匹配 | `await expect(locator).toHaveText('内容')` |
| `toContainText` | 文本内容包含 | `await expect(locator).toContainText('内容')` |
| `toHaveValue` | 输入值匹配 | `await expect(locator).toHaveValue('值')` |

### 状态断言

| API | 说明 | 示例 |
|-----|------|------|
| `toBeChecked` | 勾选状态 | `await expect(locator).toBeChecked()` |
| `toBeDisabled` | 禁用状态 | `await expect(locator).toBeDisabled()` |
| `toBeEnabled` | 启用状态 | `await expect(locator).toBeEnabled()` |
| `toBeSelected` | 选中状态 | `await expect(locator).toBeSelected()` |

### 属性断言

| API | 说明 | 示例 |
|-----|------|------|
| `toHaveAttribute` | 属性值 | `await expect(locator).toHaveAttribute('href', '/url')` |
| `toHaveClass` | CSS 类 | `await expect(locator).toHaveClass(/active/)` |
| `toHaveId` | ID 属性 | `await expect(locator).toHaveId('my-id')` |
| `toHaveCSS` | CSS 属性 | `await expect(locator).toHaveCSS('color', 'rgb(0, 0, 0)')` |

### 页面断言

| API | 说明 | 示例 |
|-----|------|------|
| `toHaveTitle` | 页面标题 | `await expect(page).toHaveTitle(/Playwright/)` |
| `toHaveURL` | 页面 URL | `await expect(page).toHaveURL(/.*form/)` |
| `toHaveScreenshot` | 截图对比 | `await expect(page).toHaveScreenshot()` |

---

## 总结

Playwright Test 是一个功能强大的端到端测试框架，支持以下测试类型：

1. **页面导航测试**：测试页面跳转和加载
2. **元素交互测试**：测试点击、输入等操作
3. **表单测试**：测试表单验证和提交
4. **网络请求测试**：测试 API 调用和拦截
5. **截图测试**：测试页面视觉效果
6. **多标签页测试**：测试多窗口场景
7. **响应式测试**：测试不同屏幕尺寸
8. **文件上传测试**：测试文件上传功能
9. **认证测试**：测试登录和权限

通过合理的测试策略和规范的测试代码，可以有效保证应用质量和用户体验。
