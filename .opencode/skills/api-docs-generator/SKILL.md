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
- 例如：`ReadableStream E:\Project\AAA_All_MINE\all-frontend\JS_Learn\WebAPI\ReadableStream`

## 执行步骤

### Step 1: 解析参数

从 `$ARGUMENTS` 中提取：
- `apiName`: 要解析的接口/类名称（如 ReadableStream）
- `basePath`: 文档文件夹路径

### Step 2: 初始化API文档目录结构

基于API特性分析结果，在目标路径下构建标准化的文档组织架构：

1. **API特性验证**：检测API是否原生具备constructor、instanceAttributes、instanceMethods、staticMethods等核心成员，排除继承属性
2. **目录存在性检查**：验证Step 1解析生成的basePath下是否已存在对应的分类目录
3. **条件性目录创建**：
   - 若API本身具有目标特性且对应目录缺失，则在basePath下创建标准化子目录：
     - `constructor/` - 构造函数文档
     - `instanceAttributes/` - 实例属性文档  
     - `instanceMethods/` - 实例方法文档
     - `staticMethods/` - 静态方法文档
   - 若API不具备目标特性或目录已存在，则跳过创建
4. **README.md初始化**：检查basePath根目录下是否存在README.md，若缺失则创建，内容涵盖：
   - API功能概述
   - 典型应用场景
   - API使用方法概览
   - 基础使用示例

### Step 3: 为每个子目录启动独立子任务

Step 2 完成后，检查 `basePath` 下是否存在 `constructor`、`instanceAttributes`、`instanceMethods`、`staticMethods` 四个子目录。存在的目录即为该 API 实际拥有的成员类别，为每个存在的目录启动一个独立的子任务（子agent）。

#### 子任务启动规则：
- **constructor 子任务**：仅当该目录存在时启动，负责处理构造函数重载
- **instanceAttributes 子任务**：仅当该目录存在时启动，负责处理实例属性
- **instanceMethods 子任务**：仅当该目录存在时启动，负责处理实例方法
- **staticMethods 子任务**：仅当该目录存在时启动，负责处理静态方法

#### 各子任务执行逻辑：

1. **constructor 子任务**
   - 检索 API 构造函数的所有重载用法
   - 有几个重载版本就创建几个文件，命名为 `use1.js`、`use2.js`、`use3.js`……
   - 每个文件详细演示该重载版本的使用方式，包含 JSDoc、中文说明、可运行示例

2. **instanceAttributes 子任务**
   - 检索 API 拥有的所有实例属性
   - 每个属性创建一个 JS 文件，文件名为属性名（如 `locked.js`、`readable.js`）
   - 每个文件详细演示该属性的读写行为、类型、注意事项

3. **instanceMethods 子任务**
   - 检索 API 拥有的所有实例方法
   - 每个方法创建一个 JS 文件，文件名为方法名（如 `getReader.js`、`cancel.js`）
   - 每个文件详细演示该方法的参数、返回值、使用场景和示例

4. **staticMethods 子任务**
   - 检索 API 拥有的所有静态方法
   - 每个静态方法创建一个 JS 文件，文件名为方法名（如 `from.js`）
   - 每个文件详细演示该静态方法的参数、返回值、使用场景和示例

#### 文件生成规范（所有子任务通用）：
- **JSDoc 注释**：每个文件顶部包含完整的 JSDoc（@description, @param, @returns, @example）
- **中文说明**：关键逻辑处添加中文注释
- **可运行示例**：提供完整、可直接运行的示例代码
- **兼容性说明**：必要时标注浏览器兼容性和使用注意事项
- **防覆盖机制**：生成前列出目标目录下已有的 .js 文件，跳过已存在文件，避免覆盖用户自定义内容

### Step 4: 等待并汇总结果

等待 5 个子任务全部完成后，提示用户已完成即可。

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