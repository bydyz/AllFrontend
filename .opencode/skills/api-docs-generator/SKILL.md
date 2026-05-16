---
name: api-docs-generator
description: 解析 Web API 接口（如 ReadableStream、Response 等），生成详细的使用文档。在用户想学习或记录某个 Web API 的用法时使用。输入格式：API名称 文档文件夹路径（例如：ReadableStream E:\Project\AAA_All_MINE\all-frontend\LearnJS\WebAPI\ReadableStream）
context: fork
agent: general-purpose
---

# Web API 文档生成器

解析指定的 Web API 接口，在指定文件夹下生成详细的 JS 使用文档。

## 输入参数

- `$ARGUMENTS` 格式：`<API名称> <文档文件夹路径>`
- 例如：`ReadableStream E:\Project\AAA_All_MINE\all-frontend\LearnJS\WebAPI\ReadableStream`

## 执行步骤

### Step 1: 解析参数

从 `$ARGUMENTS` 中提取：
- `apiName`: 要解析的接口/类名称（如 ReadableStream）
- `basePath`: 文档文件夹路径

### Step 2: 检查/创建文件夹结构

在 `basePath` 下检查是否存在以下四个文件夹，若不存在则创建：
- `constructor/` - 构造器用法
- `instanceAttributes/` - 实例属性
- `instanceMethods/` - 实例方法
- `staticMethods/` - 静态方法

### Step 3: 启动子任务处理

使用 Task 工具启动 4 个并行的 Explore 子任务（fork 模式），分别处理：
1. **constructor 任务** - 检索 API 的构造器用法
2. **instanceAttributes 任务** - 检索 API 的实例属性
3. **instanceMethods 任务** - 检索 API 的实例方法
4. **staticMethods 任务** - 检索 API 的静态方法

每个子任务的指令：
```
检索 [API名称] 的 [类型] 有哪些，列出每个成员名称、参数、返回值、使用场景，然后为每个成员创建一个详细的 JS 文件。

输出要求：
- 文件名使用有意义的英文名称（如 getReader.js、locked.js）
- 每个文件都要有 JSDoc 注释，说明用途、参数、返回值
- 每个文件都要有示例代码，展示实际用法
- 代码要尽量完整、可运行
- 添加中文注释帮助理解

保存路径：[basePath]/[类型]/
```

### Step 4: 等待并汇总结果

等待 4 个子任务全部完成后，汇总生成的文件列表，给用户一个总结。

## 输出格式

生成的文件结构示例（以 ReadableStream 为例）：
```
basePath/
├── constructor/
│   ├── ReadableStream.js          # 构造函数用法
├── instanceAttributes/
│   ├── locked.js                  # locked 属性
│   └── readable.js                # readable 状态
├── instanceMethods/
│   ├── getReader.js               # getReader() 方法
│   ├── pipeThrough.js             # pipeThrough() 方法
│   ├── pipeTo.js                  # pipeTo() 方法
│   ├── cancel.js                  # cancel() 方法
│   └── tee.js                     # tee() 方法
└── staticMethods/
    └── from.js                    # from() 静态方法（如有）
```

## 注意事项

1. 每个 JS 文件都要包含：
   - 文件顶部的 JSDoc 注释（@description, @param, @returns, @example）
   - 中文解释说明
   - 完整的示例代码
   - 注意事项和兼容性说明（如果适用）

2. 对于复杂的 API，要确保示例代码的准确性

3. 检索时优先使用 MDN Web 文档作为参考