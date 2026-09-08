# Playwright 集成指南 - 快速上手端到端测试

## 目录

1. [快速开始](#1-快速开始)
2. [项目配置](#2-项目配置)
3. [测试类型详解](#3-测试类型详解)
4. [常用断言 API](#4-常用断言-api)
5. [元素定位](#5-元素定位)
6. [网络请求测试](#6-网络请求测试)
7. [截图和视觉测试](#7-截图和视觉测试)
8. [认证测试](#8-认证测试)
9. [最佳实践](#9-最佳实践)
10. [常见问题](#10-常见问题)

---

## 1. 快速开始

### 1.1 安装依赖

```bash
# 安装 Playwright Test
npm install -D @playwright/test

# 安装浏览器（首次使用需要）
npx playwright install
```

### 1.2 配置 package.json

```json
{
  "scripts": {
    "test": "npx playwright test",
    "test:headed": "npx playwright test --headed",
    "test:debug": "npx playwright test --debug",
    "test:ui": "npx playwright test --ui",
    "report": "npx playwright show-report"
  }
}
```

### 1.3 配置 playwright.config.js

```javascript
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  timeout: 30000,
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
  }
})
```

### 1.4 运行测试

```bash
# 运行所有测试
npm test

# 有界面模式运行
npm run test:headed

# 调试模式运行
npm run test:debug

# UI 模式运行
npm run test:ui
```

---

## 2. 项目配置

### 2.1 目录结构

```
project/
├── e2e/                          # 测试文件目录
│   ├── home.spec.js             # 首页测试
│   ├── form.spec.js             # 表单测试
│   ├── list.spec.js             # 列表测试
│   └── advanced.spec.js         # 高级测试
├── src/
│   ├── components/               # Vue 组件
│   ├── App.vue
│   └── main.js
├── playwright.config.js          # Playwright 配置
├── vite.config.js                # Vite 配置
└── package.json
```

### 2.2 关键配置项说明

| 配置项 | 说明 | 常用值 |
|--------|------|--------|
| `testDir` | 测试文件目录 | `'./e2e'` |
| `testMatch` | 测试文件匹配模式 | `'**/*.spec.js'` |
| `timeout` | 测试超时时间 | `30000` |
| `use.baseURL` | 基础 URL | `'http://localhost:5173'` |
| `use.trace` | 追踪信息 | `'on-first-retry'` |
| `use.screenshot` | 截图配置 | `'only-on-failure'` |
| `projects` | 浏览器项目 | Chromium、Firefox、WebKit |
| `webServer` | 开发服务器配置 | `command: 'npm run dev'` |

### 2.3 浏览器项目配置

```javascript
projects: [
  // 桌面浏览器
  {
    name: 'chromium',
    use: { ...devices['Desktop Chrome'] }
  },
  {
    name: 'firefox',
    use: { ...devices['Desktop Firefox'] }
  },
  {
    name: 'webkit',
    use: { ...devices['Desktop Safari'] }
  },
  // 移动端
  {
    name: 'Mobile Chrome',
    use: { ...devices['Pixel 5'] }
  },
  {
    name: 'Mobile Safari',
    use: { ...devices['iPhone 12'] }
  }
]
```

---

## 3. 测试类型详解

### 3.1 页面导航测试

```javascript
import { test, expect } from '@playwright/test'

test('页面应该正确加载', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/Playwright/)
  await expect(page.locator('[data-testid="navigation"]')).toBeVisible()
})

test('应该可以切换页面', async ({ page }) => {
  await page.goto('/')
  await page.click('[data-testid="nav-form"]')
  await expect(page.locator('[data-testid="form-page"]')).toBeVisible()
})
```

### 3.2 元素交互测试

```javascript
import { test, expect } from '@playwright/test'

test('应该支持点击操作', async ({ page }) => {
  await page.goto('/')
  await page.click('[data-testid="counter-increment"]')
  await expect(page.locator('[data-testid="counter-value"]')).toHaveText('1')
})

test('应该支持输入操作', async ({ page }) => {
  await page.goto('/')
  await page.click('[data-testid="nav-form"]')
  await page.fill('[data-testid="input-name"]', '张三')
  await expect(page.locator('[data-testid="input-name"]')).toHaveValue('张三')
})
```

### 3.3 表单测试

```javascript
import { test, expect } from '@playwright/test'

test('应该验证表单输入', async ({ page }) => {
  await page.goto('/')
  await page.click('[data-testid="nav-form"]')
  
  // 提交空表单
  await page.click('[data-testid="submit-btn"]')
  
  // 验证错误信息
  await expect(page.locator('[data-testid="error-name"]')).toContainText('请输入姓名')
})

test('应该支持表单提交', async ({ page }) => {
  await page.goto('/')
  await page.click('[data-testid="nav-form"]')
  
  // 填写表单
  await page.fill('[data-testid="input-name"]', '张三')
  await page.fill('[data-testid="input-email"]', 'zhangsan@example.com')
  await page.fill('[data-testid="input-password"]', 'password123')
  await page.check('[data-testid="checkbox-terms"]')
  
  // 提交表单
  await page.click('[data-testid="submit-btn"]')
  
  // 验证提交结果
  await expect(page.locator('[data-testid="submit-result"]')).toBeVisible()
})
```

### 3.4 网络请求测试

```javascript
import { test, expect } from '@playwright/test'

test('应该可以拦截 API 请求', async ({ page }) => {
  // 监听请求
  const requests = []
  page.on('request', request => {
    requests.push(request)
  })
  
  await page.goto('/')
  expect(requests.length).toBeGreaterThan(0)
})

test('应该可以模拟网络错误', async ({ page }) => {
  await page.route('**/api/**', route => {
    route.abort('connectionrefused')
  })
  
  await page.goto('/')
})
```

### 3.5 截图测试

```javascript
import { test, expect } from '@playwright/test'

test('应该可以截取全页面截图', async ({ page }) => {
  await page.goto('/')
  await page.screenshot({ 
    path: 'test-results/screenshots/homepage.png',
    fullPage: true 
  })
})

test('应该可以截取特定元素截图', async ({ page }) => {
  await page.goto('/')
  const navigation = page.locator('[data-testid="navigation"]')
  await navigation.screenshot({ 
    path: 'test-results/screenshots/navigation.png' 
  })
})
```

---

## 4. 常用断言 API

### 4.1 可见性断言

| API | 说明 | 示例 |
|-----|------|------|
| `toBeVisible` | 元素可见 | `await expect(locator).toBeVisible()` |
| `not.toBeVisible` | 元素不可见 | `await expect(locator).not.toBeVisible()` |
| `toBeHidden` | 元素隐藏 | `await expect(locator).toBeHidden()` |

### 4.2 文本断言

| API | 说明 | 示例 |
|-----|------|------|
| `toHaveText` | 文本内容完全匹配 | `await expect(locator).toHaveText('内容')` |
| `toContainText` | 文本内容包含 | `await expect(locator).toContainText('内容')` |
| `toHaveValue` | 输入值匹配 | `await expect(locator).toHaveValue('值')` |

### 4.3 状态断言

| API | 说明 | 示例 |
|-----|------|------|
| `toBeChecked` | 勾选状态 | `await expect(locator).toBeChecked()` |
| `toBeDisabled` | 禁用状态 | `await expect(locator).toBeDisabled()` |
| `toBeEnabled` | 启用状态 | `await expect(locator).toBeEnabled()` |

### 4.4 属性断言

| API | 说明 | 示例 |
|-----|------|------|
| `toHaveAttribute` | 属性值 | `await expect(locator).toHaveAttribute('href', '/url')` |
| `toHaveClass` | CSS 类 | `await expect(locator).toHaveClass(/active/)` |
| `toHaveCSS` | CSS 属性 | `await expect(locator).toHaveCSS('color', 'rgb(0, 0, 0)')` |

### 4.5 页面断言

| API | 说明 | 示例 |
|-----|------|------|
| `toHaveTitle` | 页面标题 | `await expect(page).toHaveTitle(/Playwright/)` |
| `toHaveURL` | 页面 URL | `await expect(page).toHaveURL(/.*form/)` |

---

## 5. 元素定位

### 5.1 定位器类型

```javascript
// CSS 选择器
page.locator('.class-name')
page.locator('#id')
page.locator('button[type="submit"]')

// data-testid 属性（推荐）
page.locator('[data-testid="submit-btn"]')

// 文本内容
page.locator('text=提交')

// 角色定位
page.locator('role=button[name="提交"]')
```

### 5.2 定位器方法

```javascript
// 查找单个元素
page.locator('.class-name')
page.locator('[data-testid="submit-btn"]')

// 查找多个元素
page.locator('.user-item')
page.locator('[data-testid="user-item"]')

// 过滤元素
page.locator('.user-item').filter({ hasText: '张三' })
page.locator('.user-item').filter({ has: page.locator('.admin') })
```

### 5.3 最佳实践

```javascript
// ✅ 推荐：使用 data-testid
page.locator('[data-testid="submit-btn"]')

// ⚠️ 可以：使用文本内容
page.locator('text=提交')

// ❌ 不推荐：使用 CSS 选择器
page.locator('.btn-primary')
page.locator('button:nth-child(2)')
```

---

## 6. 网络请求测试

### 6.1 请求拦截

```javascript
// 拦截所有请求
page.on('request', request => {
  console.log(request.url())
})

// 拦截所有响应
page.on('response', response => {
  console.log(response.url(), response.status())
})

// 拦截特定请求
await page.route('**/api/**', route => {
  route.abort('connectionrefused')
})
```

### 6.2 Mock 响应

```javascript
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
```

### 6.3 请求验证

```javascript
test('应该发送正确的请求', async ({ page }) => {
  const requests = []
  page.on('request', request => {
    requests.push(request)
  })
  
  await page.goto('/')
  
  // 验证请求
  const apiRequest = requests.find(r => r.url().includes('/api/'))
  expect(apiRequest).toBeDefined()
})
```

---

## 7. 截图和视觉测试

### 7.1 截图类型

```javascript
// 全页面截图
await page.screenshot({ 
  path: 'screenshot.png',
  fullPage: true 
})

// 视口截图
await page.screenshot({ 
  path: 'viewport.png' 
})

// 特定元素截图
const element = page.locator('[data-testid="navigation"]')
await element.screenshot({ 
  path: 'element.png' 
})
```

### 7.2 PDF 生成

```javascript
// 生成 PDF（仅支持 Chromium）
const pdf = await page.pdf()
expect(pdf).toBeTruthy()
```

### 7.3 截图对比

```javascript
// 对比截图
await expect(page).toHaveScreenshot('homepage.png')
```

---

## 8. 认证测试

### 8.1 存储状态

```javascript
// 保存登录状态
test('保存登录状态', async ({ page }) => {
  await page.goto('/login')
  await page.fill('[data-testid="username"]', 'admin')
  await page.fill('[data-testid="password"]', 'password123')
  await page.click('[data-testid="login-btn"]')
  
  // 保存存储状态
  await page.context().storageState({ path: 'auth.json' })
})

// 使用存储状态
test.use({ storageState: 'auth.json' })
test('已登录状态测试', async ({ page }) => {
  await page.goto('/')
  // 已经登录
})
```

### 8.2 认证头

```javascript
// 设置认证头
test.use({
  extraHTTPHeaders: {
    'Authorization': 'Bearer token123'
  }
})
```

---

## 9. 最佳实践

### 9.1 文件组织

- 测试文件统一放在 `e2e/` 目录下
- 测试文件命名与功能模块保持一致（`xxx.spec.js`）
- 使用 `test.describe()` 组织相关测试

### 9.2 元素定位

- 优先使用 `data-testid` 属性
- 避免使用 CSS 选择器
- 使用文本内容作为备选

### 9.3 测试隔离

- 每个测试独立运行
- 使用 `test.beforeEach()` 准备测试环境
- 避免测试间相互依赖

### 9.4 等待策略

- 使用 Playwright 内置的自动等待机制
- 避免使用 `waitForTimeout()`
- 使用 `waitForLoadState()` 等待页面加载

### 9.5 测试描述

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

---

## 10. 常见问题

### 10.1 测试运行慢

**问题**：测试运行速度很慢。

**解决**：
1. 检查 `webServer` 配置是否正确
2. 确保开发服务器正常启动
3. 考虑减少并行工作进程数
4. 使用 `--workers` 参数控制并行数

### 10.2 元素定位失败

**问题**：无法找到元素。

**解决**：
1. 使用 `data-testid` 而非 CSS 选择器
2. 使用 Playwright Inspector 调试定位器
3. 检查元素是否在 DOM 中存在
4. 使用 `waitForSelector()` 等待元素出现

### 10.3 测试不稳定

**问题**：测试时而通过，时而失败。

**解决**：
1. 使用自动等待机制
2. 避免硬编码等待时间
3. 使用 `waitForLoadState()` 等待页面加载
4. 检查测试是否依赖外部状态

### 10.4 跨浏览器测试失败

**问题**：某些浏览器测试失败。

**解决**：
1. 检查浏览器兼容性问题
2. 使用条件跳过不支持的功能
3. 针对特定浏览器编写测试
4. 使用 Playwright 的浏览器兼容性检测

### 10.5 截图测试失败

**问题**：截图对比失败。

**解决**：
1. 更新基准截图
2. 调整截图对比阈值
3. 使用 `toHaveScreenshot()` 的选项
4. 检查是否因为环境差异导致

---

## 快速参考

### 常用命令

```bash
# 运行所有测试
npm test

# 有界面模式
npm run test:headed

# 调试模式
npm run test:debug

# UI 模式
npm run test:ui

# 查看报告
npm run report

# 运行特定测试
npx playwright test home.spec.js

# 运行匹配的测试
npx playwright test -g "计数器应该正确工作"
```

### 导入语句

```javascript
import { test, expect } from '@playwright/test'
```

### 断言速查

| 断言 | 用途 |
|------|------|
| `toBeVisible` | 元素可见 |
| `toHaveText` | 文本内容 |
| `toHaveValue` | 输入值 |
| `toBeChecked` | 勾选状态 |
| `toBeDisabled` | 禁用状态 |
| `toHaveAttribute` | 属性值 |
| `toHaveClass` | CSS 类 |
| `toHaveTitle` | 页面标题 |
| `toHaveURL` | 页面 URL |

---

*最后更新：2024年*
