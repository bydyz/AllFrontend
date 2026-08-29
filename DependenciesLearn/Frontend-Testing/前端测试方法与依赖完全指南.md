# 前端测试方法与依赖完全指南

## 目录

- [测试金字塔模型](#测试金字塔模型)
- [单元测试](#1-单元测试-unit-testing)
- [组件测试](#2-组件测试-component-testing)
- [E2E 测试](#3-e2e-测试-end-to-end-testing)
- [API Mocking](#4-api-mocking网络请求模拟)
- [视觉回归测试](#5-视觉回归测试-visual-regression-testing)
- [无障碍测试](#6-无障碍测试-accessibility-testing)
- [2026 年推荐方案](#7-2026-年推荐方案)
- [工具对比](#8-工具对比)
- [最佳实践](#9-最佳实践)

---

## 测试金字塔模型

```
            ▲
            │  E2E 测试 (~10%)
            │  模拟真实用户，覆盖关键流程
           ├──────────┤
            │  集成/组件测试 (~20%)
            │  组件交互、状态流、API 调用
          ├──────────────┤
            │  单元测试 (~70%)
            │  函数、工具类、业务逻辑
          └──────────────┘
```

**原则：** 底层测试成本低、速度快、多写；顶层测试维护成本高、速度慢，只写关键路径。

---

## 1. 单元测试 (Unit Testing)

验证最小的代码单元（函数、类、组合式函数）是否按预期工作。

### 测试框架

| 工具 | 特点 | 适用场景 |
|------|------|----------|
| **Vitest** | 基于 Vite，速度快 2-10x，原生支持 ESM/TS，Jest API 兼容 | Vite 项目首选，新项目默认 |
| **Jest** | 老牌标准，生态最大，Meta 维护 | 已有项目，React Native |
| **Mocha** | 灵活，需搭配断言库 | 自定义配置需求 |
| **Bun test** | 最快运行时 | 纯 Bun 项目 |
| **uvu** | 轻量，单线程 | 小型项目 |

### 核心依赖

```json
{
  "vitest": "^3.x",
  "@vitest/coverage-v8": "^3.x",
  "happy-dom": "^14.x",
  "jsdom": "^24.x"
}
```

### 配置示例 (vitest.config.ts)

```typescript
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 75,
        statements: 80
      }
    }
  }
})
```

### 适合测试的场景

- 纯函数（输入输出确定，无副作用）
- 业务规则（如 `calculateDiscount(price, level)`）
- 工具函数（`formatDate`、`parseQuery`）
- 复杂算法
- 边界情况和错误处理

### 不适合测试的场景

- 框架内部逻辑（React setState、Vue 响应式）
- 简单的 getter/setter
- 常量定义

---

## 2. 组件测试 (Component Testing)

测试组件是否正常挂载、渲染、交互，以及表现是否符合预期。

### 测试库

| 工具 | 框架 | 说明 |
|------|------|------|
| **@testing-library/react** | React | 官方推荐，"像用户一样测试" |
| **@testing-library/vue** | Vue | 社区维护 |
| **@vue/test-utils** | Vue | Vue 官方工具 |
| **Storybook 9** | 通用 | 组件工作台 + 测试，`play` 函数 |
| **Cypress CT** | 通用 | 浏览器内组件测试 |
| **Playwright CT** | 通用 | 实验阶段 |

### 核心依赖

```json
{
  "@testing-library/react": "^14.x",
  "@testing-library/user-event": "^14.x",
  "@testing-library/jest-dom": "^6.x",
  "@vue/test-utils": "^2.x"
}
```

### 测试原则

1. **测试用户行为，不测试实现细节**
2. 测试组件的公开接口：props、事件、插槽
3. 不要测试内部 state、props、内部方法
4. 使用 `getByRole` > `getByText` > `getByTestId` 的优先级

### React 示例

```typescript
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import { SearchForm } from './SearchForm'

describe('SearchForm', () => {
  it('submits search query', async () => {
    const onSubmit = vi.fn()
    render(<SearchForm onSubmit={onSubmit} />)

    await userEvent.type(screen.getByRole('textbox'), 'vue')
    await userEvent.click(screen.getByRole('button', { name: /search/i }))

    expect(onSubmit).toHaveBeenCalledWith('vue')
  })
})
```

### Vue 示例

```typescript
import { mount } from '@vue/test-utils'
import UserCard from './UserCard.vue'

describe('UserCard', () => {
  it('renders user name', () => {
    const wrapper = mount(UserCard, {
      props: { name: '张三', avatar: '/avatar.jpg' }
    })
    expect(wrapper.text()).toContain('张三')
  })
})
```

---

## 3. E2E 测试 (End-to-End Testing)

模拟真实用户操作，测试整个应用的功能流程。

### 测试工具

| 工具 | 特点 |
|------|------|
| **Playwright** | 2026 默认选择，跨浏览器，免费并行，Trace Viewer |
| **Cypress** | 交互调试体验好，Time-travel，但市场份额下降 |
| **WebdriverIO** | 基于 WebDriver 协议 |
| **Selenium 5** | 老牌，最广浏览器支持 |
| **Puppeteer** | Google Chrome 自动化 |

### Playwright vs Cypress 对比

| 特性 | Playwright | Cypress |
|------|-----------|---------|
| 浏览器支持 | Chromium/Firefox/WebKit 原生 | Chromium 为主，WebKit 实验性 |
| 并行执行 | 原生支持（免费） | 需付费 Cloud |
| 执行速度 | 更快（进程外架构） | 较慢 |
| 调试 | Trace Viewer | Time-travel GUI |
| 多标签/多域名 | 原生支持 | 困难 |
| 移动端模拟 | 原生 device 枚举 | 需插件 |
| npm 周下载 | ~30M | ~6.5M |
| 满意度 (State of JS 2025) | 91% | 72% |

### 核心依赖

```json
{
  "@playwright/test": "^1.50.x"
}
```

### Playwright 配置示例

```typescript
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  reporter: [['html'], ['junit', { outputFile: 'test-results/junit.xml' }]],
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure'
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    { name: 'Mobile Chrome', use: { ...devices['Pixel 5'] } },
    { name: 'Mobile Safari', use: { ...devices['iPhone 12'] } }
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI
  }
})
```

### E2E 测试适合的场景

- 登录/注册流程
- 购物车 → 结算 → 支付
- 多步骤表单提交
- 路由切换和页面导航
- 受保护页面的权限验证

### E2E 测试不适合的场景

- 每个按钮的悬浮效果
- 容易变化的面包屑导航
- 第三方依赖的页面细节

---

## 4. API Mocking（网络请求模拟）

### 核心工具

| 工具 | 说明 |
|------|------|
| **MSW (Mock Service Worker)** | 标准方案，拦截网络层，测试/开发/Storybook 通用 |

### MSW 核心依赖

```json
{
  "msw": "^2.x"
}
```

### MSW 优势

- 使用 Service Worker 拦截浏览器网络请求
- 同一套 mock 可用于单元测试、集成测试、Storybook、E2E
- 比直接 mock `fetch` 更贴近真实
- 测试/开发环境代码一致

### 使用示例

```typescript
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'

const server = setupServer(
  http.get('/api/users', () => {
    return HttpResponse.json([
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' }
    ])
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
```

### `vi.mock()` vs MSW 选择

| 场景 | 使用 |
|------|------|
| Mock 模块（工具函数、SDK、定时器、localStorage） | `vi.mock()` |
| Mock HTTP 请求 | MSW |

---

## 5. 视觉回归测试 (Visual Regression Testing)

检测 UI 像素级变化。

### 工具对比

| 工具 | 类型 | 说明 |
|------|------|------|
| **Chromatic** | SaaS | Storybook 深度集成，最主流 |
| **Percy** | SaaS | BrowserStack 旗下 |
| **Applitools** | SaaS | AI 视觉对比 |
| **Loki** | 开源 | Storybook 集成 |
| **BackstopJS** | 开源 | 独立使用 |
| **Reg-Suit** | 开源 | 轻量 |
| **Playwright 内置** | 内置 | `toHaveScreenshot()` |

### Playwright 视觉测试示例

```typescript
import { test, expect } from '@playwright/test'

test('homepage matches snapshot', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveScreenshot('homepage.png')
})
```

---

## 6. 无障碍测试 (Accessibility Testing)

### 工具

| 工具 | 说明 |
|------|------|
| **axe-core** | 无障碍检测引擎 |
| **@axe-core/playwright** | Playwright 集成 |
| **@axe-core/react** | React 集成 |
| **Storybook a11y addon** | Storybook 内置 |
| **Lighthouse CI** | Google 性能 + A11y |

### 核心依赖

```json
{
  "@axe-core/playwright": "^4.x",
  "lighthouse": "^12.x"
}
```

---

## 7. 2026 年推荐方案

### 完整技术栈

```
单元测试:    Vitest + @testing-library/react (或 vue)
组件测试:    Vitest + @testing-library + Storybook 9
网络 Mock:   MSW 2.x
E2E 测试:    Playwright
视觉回归:    Chromatic + Storybook 9
A11y:       axe-core
类型检查:    TypeScript strict mode
CI:         GitHub Actions
```

### 最小化安装

```bash
npm i -D vitest @testing-library/react @testing-library/user-event @playwright/test msw
```

这四个依赖覆盖 95% 的测试场景。

### 测试比例建议

| 测试类型 | 占比 | 运行频率 | 覆盖率目标 |
|----------|------|----------|-----------|
| 单元测试 | 70% | 每次提交 | 核心逻辑 80%+ |
| 集成/组件测试 | 20% | 每次 PR | 组件 70%+ |
| E2E 测试 | 10% | PR + 每夜 | 关键路径 100% |

---

## 8. 工具对比

### 单元测试框架对比

| 特性 | Jest | Vitest |
|------|------|--------|
| Vite 集成 | 需额外配置 | 原生支持 |
| TypeScript | 需 ts-jest | 原生支持 |
| 执行速度 | 快 | 更快（基于 esbuild） |
| Watch 模式 | 快 | 更快（HMR 级别） |
| ESM 支持 | 需配置 | 原生支持 |
| UI 模式 | 需插件 | 内置 `vitest --ui` |
| Browser 模式 | 无 | 支持（真实浏览器） |
| 生态规模 | 最大 | 快速增长 |

### E2E 测试框架对比

| 特性 | Playwright | Cypress | Selenium |
|------|-----------|---------|----------|
| 浏览器 | Chromium/Firefox/WebKit | Chromium 为主 | 全部 |
| 速度 | 最快 | 中等 | 最慢 |
| 并行 | 原生免费 | 需付费 | 需配置 |
| 调试 | Trace Viewer | Time-travel | 一般 |
| 移动模拟 | 原生 | 需插件 | 需 Appium |
| API 测试 | 内置 | 支持 | 不支持 |
| 维护方 | Microsoft | Cypress.io | Selenium 社区 |

### 组件测试库对比

| 库 | 框架 | 特点 |
|----|------|------|
| @testing-library/react | React | 官方推荐，用户行为导向 |
| @testing-library/vue | Vue | 社区维护 |
| @vue/test-utils | Vue | Vue 官方，白盒/黑盒测试 |
| Storybook 9 | 通用 | 组件工作台，play 函数交互测试 |
| Cypress CT | 通用 | 浏览器内测试，Time-travel |

---

## 9. 最佳实践

### 测试原则

1. **测试行为，不测试实现** — 重构代码不应破坏测试
2. **70-20-10 比例** — 单元测试为主，E2E 只覆盖关键路径
3. **Mock 网络层** — 使用 MSW，不要 mock 组件边界
4. **自动等待** — Playwright 内置 auto-wait，避免 `waitForTimeout`
5. **测试隔离** — 每个测试独立，不依赖其他测试的状态

### CI/CD 集成

```yaml
# GitHub Actions 示例
- name: Unit Tests
  run: npx vitest run

- name: Build
  run: npm run build

- name: E2E Tests
  run: npx playwright test
```

### 覆盖率策略

| 模块 | 目标覆盖率 | 说明 |
|------|-----------|------|
| 工具函数 (utils/) | 90%+ | 纯函数，容易全覆盖 |
| Hooks | 80%+ | 测试状态变化逻辑 |
| 组件 | 70-80% | 重点测试条件渲染和用户交互 |
| 页面 (Pages) | 50-60% | E2E 覆盖主要流程 |
| 集成 API | 60%+ | MSW 模拟关键接口 |

### 常见错误

- ❌ 追求 100% 覆盖率（自欺欺人）
- ❌ 测试实现细节（每次重构都坏）
- ❌ E2E 测试覆盖所有交互（太慢太脆弱）
- ❌ 不运行测试只看覆盖率数字
- ✅ 核心业务逻辑 80%+ 覆盖即可
- ✅ 关键路径 E2E 全覆盖
- ✅ 开发时使用 watch 模式实时反馈

---

## 参考资源

- [Vue.js 测试指南](https://cn.vuejs.org/guide/scaling-up/testing)
- [Vitest 官方文档](https://vitest.dev/)
- [Playwright 官方文档](https://playwright.dev/)
- [Testing Library 官方文档](https://testing-library.com/)
- [MSW 官方文档](https://mswjs.io/)
- [State of JS 2025 调查报告](https://stateofjs.com/)
