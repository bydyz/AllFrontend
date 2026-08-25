/**
 * Playwright 配置文件
 * 配置端到端测试的各项参数
 */
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  // 测试文件目录
  testDir: './e2e',
  
  // 测试文件匹配模式
  testMatch: '**/*.spec.js',
  
  // 每个测试的超时时间（毫秒）
  timeout: 30000,
  
  // expect断言的超时时间
  expect: {
    timeout: 5000
  },
  
  // 测试是否为完全并行
  fullyParallel: true,
  
  // CI环境中禁止.only
  forbidOnly: !!process.env.CI,
  
  // 失败重试次数
  retries: process.env.CI ? 2 : 0,
  
  // 并行工作进程数
  workers: process.env.CI ? 1 : undefined,
  
  // 报告器配置
  reporter: [
    ['html', { open: 'never' }],
    ['list']
  ],
  
  // 全局配置
  use: {
    // 基础URL
    baseURL: 'http://localhost:5173',
    
    // 收集测试失败时的追踪信息
    trace: 'on-first-retry',
    
    // 截图配置
    screenshot: 'only-on-failure',
    
    // 视频录制配置
    video: 'retain-on-failure',
    
    // 浏览器上下文配置
    locale: 'zh-CN',
    timezoneId: 'Asia/Shanghai',
    
    // 忽略HTTPS错误
    ignoreHTTPSErrors: true
  },
  
  // 浏览器项目配置
  projects: [
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
    // 移动端测试
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] }
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] }
    }
  ],
  
  // 本地开发服务器配置
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
    timeout: 120000
  }
})
