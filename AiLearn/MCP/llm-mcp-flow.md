# LLM + MCP 核心流程时序图

```mermaid
sequenceDiagram
    participant U as 👤 用户
    participant UI as UI界面
    participant LLM as 🤖 大语言模型
    participant TR as 工具注册表
    participant MC as MCPClient
    participant MS as MCPServer
    participant KB as 知识库
    participant TOOL as 具体工具

    rect rgb(240, 248, 255)
        Note over U,TOOL: 1️⃣ 用户输入阶段

        U->>UI: 输入自然语言 Prompt
    end

    rect rgb(255, 250, 240)
        Note over U,TOOL: 2️⃣ Prompt 处理与分析

        UI->>LLM: 发送 Prompt
        LLM->>LLM: 理解用户意图
        LLM->>LLM: 判断是否需要调用工具
    end

    rect rgb(240, 255, 240)
        Note over U,TOOL: 3️⃣ 工具匹配与选择

        LLM->>TR: 查询可用工具列表
        TR-->>LLM: 返回工具定义<br/>(name, description, schema)

        alt 需要检索知识
            Note over U,TOOL: 3a️⃣ 知识检索

            LLM->>KB: 语义搜索
            KB-->>LLM: 返回相关文档
            LLM->>LLM: 将知识融入 Context
        end

        alt 需要调用 MCP 工具
            Note over U,TOOL: 3b️⃣ 工具决策

            LLM->>LLM: 决定调用哪些工具
            LLM->>LLM: 提取工具参数
        end
    end

    rect rgb(255, 240, 240)
        Note over U,TOOL: 4️⃣ MCP 工具调用

        LLM->>MC: 构建请求<br/>(tool_name, arguments)
        MC->>MC: 序列化为 JSON-RPC
        MC->>MS: HTTP POST 发送

        MS->>TOOL: 分发到具体工具
        TOOL->>TOOL: 执行工具逻辑
        TOOL-->>MS: 返回执行结果

        MS-->>MC: 返回 JSON-RPC 响应
        MC->>MC: 解析响应
        MC->>LLM: 传递工具结果
    end

    rect rgb(250, 240, 255)
        Note over U,TOOL: 5️⃣ 结果整合与响应生成

        LLM->>LLM: 处理工具返回数据
        LLM->>LLM: 构建完整 Context
        LLM->>LLM: 生成自然语言回复
        LLM->>UI: 返回文本响应
        UI->>U: 展示最终结果
    end
```

---

## 流程总结

```
┌─────────────────────────────────────────────────────────────┐
│  用户输入 ──► LLM分析 ──► 意图识别 ──► 工具匹配 ──►  │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  ┌──────────┐  ┌──────────┐  ┌──────────┐               │
│  │ 知识检索 │  │ MCP调用  │  │ 返回结果 │               │
│  └──────────┘  └──────────┘  └──────────┘               │
│                            │                               │
│                            ▼                               │
│  ┌─────────────────────────────────────────────────────┐  │
│  │   LLM整合Context ──► 生成最终响应 ──► 用户展示    │  │
│  └────────��────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### 关键节点说明

| 阶段 | 说明 |
|------|------|
| **1. 用户输入** | 用户通过 UI 输入自然语言 Prompt |
| **2. Prompt 分析** | LLM 理解意图，判断是否需要工具 |
| **3. 工具匹配** | 查询工具注册表，选择最优工具；如果需要可同时检索知识库 |
| **4. MCP 调用** | 构建 JSON-RPC 请求，MCP Server 分发执行，返回结果 |
| **5. 响应生成** | LLM 整合所有信息，生成最终自然语言回复 |