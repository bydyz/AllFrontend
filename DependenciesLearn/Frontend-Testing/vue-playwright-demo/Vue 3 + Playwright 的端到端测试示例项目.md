# Vue Playwright Demo

基于 Vue 3 + Playwright 的端到端测试示例项目，演示如何使用 Playwright 进行前端应用的 E2E 测试。

## 项目功能

这是一个多页面 Vue 3 应用，包含：
- **首页**：计数器、展开/折叠、模态框等交互组件
- **表单页**：完整的表单验证、提交、重置功能
- **列表页**：用户列表的搜索、过滤、CRUD 操作

## 技术栈

- **前端框架**：Vue 3 (Composition API)
- **构建工具**：Vite 8
- **测试框架**：Playwright Test 1.53
- **浏览器支持**：Chromium、Firefox、WebKit（含移动端模拟）

## 核心 API

### Playwright Test API
- `test()` / `test.describe()` - 定义测试用例和测试组
- `test.beforeEach()` / `test.afterEach()` - 测试前后钩子
- `expect()` - 断言库
- `page.goto()` - 页面导航
- `page.click()` - 点击元素
- `page.fill()` - 输入文本
- `page.selectOption()` - 选择下拉选项
- `page.check()` / `page.uncheck()` - 勾选/取消勾选
- `page.locator()` - 元素定位器
- `page.route()` - 拦截网络请求
- `page.screenshot()` - 截图
- `page.setViewportSize()` - 设置视口大小

### 断言 API
- `toBeVisible()` / `not.toBeVisible()` - 可见性断言
- `toHaveText()` - 文本内容断言
- `toHaveValue()` - 输入值断言
- `toBeChecked()` - 勾选状态断言
- `toBeDisabled()` - 禁用状态断言
- `toHaveAttribute()` - 属性断言
- `toHaveClass()` - CSS 类断言
- `toContainText()` - 包含文本断言

## 项目结构

```
vue-playwright-demo/
├── e2e/                          # E2E 测试文件
│   ├── home.spec.js              # 首页测试（导航、计数器、模态框）
│   ├── form.spec.js              # 表单测试（输入、验证、提交）
│   ├── list.spec.js              # 列表测试（搜索、过滤、CRUD）
│   └── advanced.spec.js          # 高级测试（API 拦截、截图、多标签页）
├── src/
│   ├── components/               # Vue 组件
│   │   ├── HomePage.vue          # 首页组件
│   │   ├── FormPage.vue          # 表单页组件
│   │   ├── ListPage.vue          # 列表页组件
│   │   └── Navigation.vue        # 导航组件
│   ├── App.vue                   # 根组件
│   └── main.js                   # 入口文件
├── playwright.config.js          # Playwright 配置
├── vite.config.js                # Vite 配置
└── package.json
```

## 使用方法

### 安装依赖

```bash
npm install
```

### 运行测试

```bash
# 运行所有测试
npm test

# 带浏览器界面运行
npm run test:headed

# 调试模式运行
npm run test:debug

# UI 模式运行
npm run test:ui

# 查看测试报告
npm run report
```

### 开发模式

```bash
npm run dev
```

## 测试示例

### 基础测试
```javascript
test('页面应该正确加载', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/Playwright/)
  await expect(page.locator('[data-testid="navigation"]')).toBeVisible()
})
```

### 表单测试
```javascript
test('应该可以输入文本', async ({ page }) => {
  await page.fill('[data-testid="input-name"]', '张三')
  await expect(page.locator('[data-testid="input-name"]')).toHaveValue('张三')
})
```

### API 拦截
```javascript
test('应该可以拦截 API 请求', async ({ page }) => {
  await page.route('**/api/**', route => {
    route.abort('connectionrefused')
  })
})
```

## Playwright 配置说明

```javascript
// playwright.config.js
export default defineConfig({
  testDir: './e2e',                    // 测试目录
  timeout: 30000,                      // 测试超时时间
  retries: process.env.CI ? 2 : 0,    // 失败重试次数
  use: {
    baseURL: 'http://localhost:5173',  // 基础 URL
    trace: 'on-first-retry',          // 追踪信息
    screenshot: 'only-on-failure',    // 截图配置
    video: 'retain-on-failure',       // 视频录制
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
  webServer: {
    command: 'npm run dev',           // 自动启动开发服务器
    url: 'http://localhost:5173',
  }
})
```

## 测试最佳实践

1. **使用 data-testid**：为测试元素添加 `data-testid` 属性
2. **测试隔离**：每个测试独立运行，不依赖其他测试状态
3. **等待策略**：使用 Playwright 内置的自动等待机制
4. **并行测试**：充分利用 Playwright 的并行执行能力
5. **失败调试**：使用 `--debug` 或 `--ui` 模式调试失败测试

## 常见问题

### 测试运行慢
- 检查 `webServer` 配置是否正确
- 确保开发服务器正常启动
- 考虑减少并行工作进程数

### 元素定位失败
- 使用 `data-testid` 而非 CSS 选择器
- 使用 Playwright Inspector 调试定位器
- 检查元素是否在 DOM 中存在

### 跨浏览器测试失败
- 检查浏览器兼容性问题
- 使用条件跳过不支持的功能
- 针对特定浏览器编写测试
