## Why

本示例演示 OpenSpec 的三步开发流程（propose → apply → archive）。通过创建一个简单的计算器功能，展示如何使用 OpenSpec 进行快速开发。

## What Changes

- 新增加法功能（add）
- 新增减法功能（subtract）
- 新增乘法功能（multiply）
- 新增除法功能（divide）

## Capabilities

### New Capabilities

- `calculator`: 基础计算器功能，支持加减乘除运算

### Modified Capabilities

（无）

## Impact

- 新增 `src/calculator.js` 文件
- 新增对应的测试文件 `src/calculator.test.js`
- 无外部依赖
