# Zod 用途总结

## 什么是 Zod

Zod 是一个 TypeScript 优先的 schema 验证库。它允许开发者定义 schema 来验证数据，从简单的字符串到复杂的嵌套对象都可以处理。

## 核心用途

1. **数据验证**：验证来自 API、用户输入、配置文件等各种来源的数据
2. **静态类型推断**：从 Zod schema 自动推断 TypeScript 类型，实现类型安全
3. **运行时验证**：在运行时确保数据符合预期的结构

## 主要特性

- **零外部依赖**：不需要安装任何其他包
- **跨平台支持**：可在 Node.js 和所有现代浏览器中运行
- **体积小巧**：核心包仅 2kb（gzip 压缩后）
- **不可变 API**：所有方法都返回新的实例
- **简洁接口**：使用方便，学习曲线低
- **TypeScript 原生**：完美支持 TypeScript，同时也支持原生 JavaScript
- **内置 JSON Schema**：可以将 Zod schema 转换为 JSON Schema
- **丰富的生态系统**：有大量与之集成的库和工具

## 安装

```bash
npm install zod
```

## 基本用法示例

```typescript
import * as z from "zod";

// 定义 schema
const User = z.object({
  name: z.string(),
  age: z.number(),
});

// 验证数据
const data = User.parse(input);

// 推断类型
type UserType = z.infer<typeof User>;
```

## 适用场景

- 表单数据验证
- API 响应验证
- 配置文件验证
- 前后端数据校验
- 与 tRPC、React Hook Form 等框架集成