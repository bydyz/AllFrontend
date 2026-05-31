# LLM + MCP 完整架构流程

```mermaid
sequenceDiagram
    participant U as 👤 用户
    participant UI as User Interface
    participant LLM as 🤖 大语言模型
    participant PM as Prompt Manager
    participant IR as Intent Recognizer
    participant TR as Tool Registry
    participant MC as MCP Client
    participant MS as MCP Server
    participant KB as Knowledge Base
    participant MEM as Memory Store
    participant T1 as Search Tool
    participant T2 as File Tool
    participant T3 as WebFetch Tool
    participant T4 as Bash Tool
    participant EX as External API
    participant ERR as Error Handler
    participant CTX as Context Builder

    Note over U,CTX: Phase 1: 用户输入

    U->>UI: 输入 Prompt
    UI->>PM: 发送原始文本

    Note over U,CTX: Phase 2: Prompt 处理

    PM->>PM: 清理和规范化文本
    PM->>PM: 添加系统指令
    PM->>IR: 传递处理后的 Prompt

    Note over U,CTX: Phase 3: 意图识别与工具选择

    IR->>IR: 分析用户意图
    IR->>TR: 查询可用工具列表
    TR-->>IR: 返回工具元数据<br/>(name, description, schema)
    IR->>IR: 计算工具相关性评分
    IR->>IR: 选择最优工具/工具组合
    IR->>LLM: 传递 Tool Definitions

    Note over U,CTX: Phase 4: LLM 推理与决策

    LLM->>LLM: 分析 Prompt
    LLM->>LLM: 确定是否需要调用工具
    LLM-->>U: 决定调用工具 (需要的)

    Note over U,CTX: Phase 5: 参数提取与验证

    LLM->>LLM: 从 Prompt 提取参数
    LLM->>LLM: 参数类型校验
    LLM->>LLM: 必填参数检查
    LLM->>ERR: 参数验证失败?

    alt 参数有效

    Note over U,CTX: Phase 6: MCP 请求构建

    LLM->>MC: 构建 MCP 请求<br/>(tool_name, arguments)
    MC->>MC: 序列化 JSON-RPC 请求
    MC->>MS: 发送 HTTP POST

    else 参数无效

    LLM-->>ERR: 返回参数错误
    ERR->>U: 提示错误信息
    U->>UI: 修正 Prompt

    end

    Note over U,CTX: Phase 7: 知识检索 (可选)

    alt 需要背景知识

    LLM->>KB: 语义搜索查询
    KB-->>LLM: 返回相关文档片段
    LLM->>LLM: 整合知识到 Context

    end

    Note over U,CTX: Phase 8: 工具执行

    MS->>MS: 解析请求
    MS->>T1: 调用 Search Tool
    alt 工具类型

    alt 内部工具

    T1-->>MS: 返回搜索结果
    T1->>MEM: 更新短期记忆

    else 外部 API

    MS->>EX: 调用外部服务
    EX-->>MS: 返回 API 响应

    end

    else 文件操作

    MS->>T2: 调用 File Tool
    T2-->>MS: 返回文件内容/状态

    else 网络请求

    MS->>T3: 调用 WebFetch Tool
    T3-->>MS: 返回网页内容

    else 命令执行

    MS->>T4: 调用 Bash Tool
    T4-->>MS: 返回命令输出

    end

    Note over U,CTX: Phase 9: MCP 响应处理

    MS-->>MC: 返回 JSON-RPC 响应
    MC->>MC: 解析响应结果
    MC->>LLM: 传递工具执行结果

    Note over U,CTX: Phase 10: 错误处理 (可选)

    alt 执行成功

    LLM->>LLM: 处理工具返回数据

    else 执行失败

    MC->>ERR: 返回错误信息
    ERR->>LLM: 分析错误类型
    alt 可重试错误

    LLM->>MC: 重试请求 (max 3次)
    MC->>MS: 重新发送请求

    else 不可重试错误

    LLM->>LLM: 生成错误说明
    LLM->>U: 返回错误信息

    end

    end

    Note over U,CTX: Phase 11: Context 累积

    LLM->>MEM: 更新对话历史
    MEM->>MEM: 存储 User Message<br/>+ Assistant Message<br/>+ Tool Calls<br/>+ Tool Results
    LLM->>MEM: 检索相关历史
    MEM-->>LLM: 返回历史上下文

    Note over U,CTX: Phase 12: Context 构建

    LLM->>CTX: 构建完整 Context
    CTX->>LLM: 包含<br/>- System Prompt<br/>- Tool Results<br/>- 历史对话<br/>- 领域知识

    Note over U,CTX: Phase 13: 最终响应生成

    LLM->>LLM: 基于完整 Context 生成回复
    LLM->>UI: 返回文本响应
    UI->>U: 展示最终结果

    Note over U,CTX: 完整流程结束

```

---

## 流程说明

### Phase 1: 用户输入
- 用户通过 UI 输入自然语言 Prompt

### Phase 2: Prompt 处理
- **Prompt Manager**: 清理文本、添加系统指令、处理模板变量

### Phase 3: 意图识别与工具选择
- **Intent Recognizer**: 分析用户真正想要做什么
- **Tool Registry**: 维护所有可用工具的元数据和 schema

### Phase 4: LLM 推理与决策
- LLM 根据工具描述判断是否需要调用工具

### Phase 5: 参数提取与验证
- 从用户 Prompt 中提取工具所需参数
- 类型校验、必填项检查

### Phase 6: MCP 请求构建
- 构建标准 JSON-RPC 格式请求

### Phase 7: 知识检索 (可选)
- 当需要额外背景知识时，通过 Vector DB 检索

### Phase 8: 工具执行
- 按工具类型分发到具体执行器

### Phase 9: MCP 响应处理
- 解析工具返回结果，传回给 LLM

### Phase 10: 错误处理
- 支持重试机制、错误分类

### Phase 11: Context 累积
- 存储对话历史，支持多轮对话

### Phase 12: Context 构建
- 将所有信息整合为完整的推理 Context

### Phase 13: 最终响应生成
- LLM 生成最终的自然语言回复

---

# 并行执行流程

当 LLM 判断需要同时调用多个独立工具时的并行执行流程。

```mermaid
sequenceDiagram
    participant U as 👤 用户
    participant LLM as 🤖 大语言模型
    participant MC as MCP Client
    participant MS as MCP Server
    participant T1 as Tool A<br/>Search
    participant T2 as Tool B<br/>File Read
    participant T3 as Tool C<br/>WebFetch
    participant CB as Combine Buffer
    participant CTX as Context Builder
    participant MEM as Memory Store

    Note over U,CB: Step 1: LLM 并行决策

    LLM->>LLM: 分析是否有多个独立任务?
    alt 是独立任务

    Note over U,CB: Step 2: 构建并行请求

    LLM->>MC: 请求1: Search(query="Vue")
    LLM->>MC: 请求2: ReadFile(path="/src")
    LLM->>MC: 请求3: Fetch(url="api.example")

    Note over U,CB: Step 3: MCP Client 并行发送

    par 并发发送所有请求

        MC->>MS: JSON-RPC: tool.search
        MC->>MS: JSON-RPC: tool.readFile
        MC->>MS: JSON-RPC: tool.webFetch

    end

    Note over U,CB: Step 4: MCP Server 分发执行

    MS->>T1: 并行执行 Search
    MS->>T2: 并行执行 File Read
    MS->>T3: 并行执行 WebFetch

    par 工具独立执行

        T1-->>MS: 结果 A ✓
        T2-->>MS: 结果 B ✓
        T3-->>MS: 结果 C ✓

    end

    Note over U,CB: Step 5: 收集响应结果

    par 响应汇聚

        MS-->>MC: Response A
        MS-->>MC: Response B
        MS-->>MC: Response C

    end

    Note over U,CB: Step 6: 结果聚合

    MC->>CB: 聚合所有结果
    CB->>CB: 合并结果<br/>+ 添加引用标记
    CB->>LLM: 返回聚合结果

    note right of LLM: 聚合结果示例:<br/>tool_results: [<br/>  {tool: "search", result: [...]},<br/>  {tool: "readFile", result: "..."},<br/>  {tool: "webFetch", result: "..."}<br/>]

    Note over U,CB: Step 7: Context 构建

    LLM->>CTX: 构建增强 Context
    CTX->>LLM: System + History +<br/>聚合 Tool Results

    Note over U,CB: Step 8: 生成综合响应

    LLM->>LLM: 基于多个结果综合分析
    LLM->>LLM: 生成最终响应
    LLM->>U: 返回综合回复

    else 不是独立任务

    Note over U,CB: Step 1b: 串行执行模式

    LLM->>MC: 请求1: Tool A
    MC->>MS: JSON-RPC: tool.A
    MS->>T1: 执行 Tool A
    T1-->>MS: 结果 A
    MS-->>MC: Response A
    MC->>LLM: 结果 A

    alt 需要下一步操作?

    LLM->>LLM: 基于结果 A 决定下一步
    LLM->>MC: 请求2: Tool B(依赖A结果)
    MC->>MS: JSON-RPC: tool.B
    MS->>T2: 执行 Tool B
    T2-->>MS: 结果 B
    MS-->>MC: Response B
    MC->>LLM: 结果 B

    else 完成任务

    LLM->>U: 返回最终响应

    end

    end

    Note over U,CB: Step 9: Memory 更新

    LLM->>MEM: 存储并行/串行调用记录
    MEM->>MEM: 记录工具依赖关系<br/>用于后续优化

```

---

## 并行执行说明

### Step 1: LLM 并行决策
- LLM 分析用户请求，判断是否可以并行执行
- 关键判断：有多个**相互独立**的任务？

### Step 2: 构建并行请求
- 为每个工具单独构建请求参数

### Step 3: MCP Client 并行发送
- 使用 `par` 关键字并发发送所有请求
- 减少等待时间

### Step 4: MCP Server 分发执行
- 服务器端并行调度到各个工具

### Step 5: 收集响应结果
- 等待所有工具完成后汇聚结果

### Step 6: 结果聚合
- **Combine Buffer**: 合并所有结果，添加引用标记
- 标注每个结果来源于哪个工具

### Step 7: Context 构建
- 将聚合结果整合到 LLM Context

### Step 8: 生成综合响应
- LLM 综合分析多个结果，生成统一回复

### Step 9: Memory 更新
- 记录调用模式和依赖关系，用于后续优化

---

## 对比：并行 vs 串行

| 维度 | 并行执行 | 串行执行 |
|------|---------|---------|
| 适用场景 | 独立任务 | 依赖任务 |
| 延迟 | T = max(t1, t2, t3) | T = t1 + t2 + t3 |
| API 调用 | 1 次批量 | N 次单独 |
| 复杂度 | 高 | 低 |
| 错误处理 | 需分别处理 | 链式处理 |