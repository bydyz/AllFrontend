# 深度解析: LLM Function Call（模型调用工具能力）

## Step 1: 介绍名词代表的意义

### 1.1 一句话定义

Function Call 是大型语言模型（LLM）调用外部函数/工具的能力，使 AI 能够执行真实世界中的操作（如查数据库、调用 API、操作文件等）。

### 1.2 详细定义

- **概念**：LLM Function Call 是让 AI 模型具备"行动能力"的技术架构
- **场景**：让 AI 助手完成"查天气""订机票""写文件"等真实任务
- **解决问题**：AI 只输出文字无法完成真实世界操作的问题
- **所属领域**：AI Agent / LLM 应用开发

### 1.3 概念卡片

```
┌─────────────────────────────────────────┐
│  概念: LLM Function Call              │
├─────────────────────────────────────────┤
│  一句话定义: 让AI调用外部工具的能力    │
│  所属领域: AI Agent / LLM应用         │
│  核心问题: 补足AI的行动能力           │
└─────────────────────────────────────────┘
```

---

## Step 2: 介绍其来由

### 2.1 背景与起源

- **2023年6月**：OpenAI 首次在 GPT-4 API 中引入 Function Call
- **背景**：AI 能"说"但不能"做"，用户需要 AI 真正完成任务
- **演进**：
  - 2023: ChatGPT Plugins（插件生态）
  - 2023: OpenAI Function Call SDK
  - 2024: Anthropic Claude Tools API
  - 2024: 各大模型厂商陆续支持

### 2.2 设计考量

- 让 AI 决定何时调用工具
- 结构化输出（JSON）避免 AI 回复格式混乱
- 安全隔离：AI 生成参数 → 程序执行 → 结果返回

---

## Step 3: 介绍其所能实现的效果

### 3.1 核心功能

| 功能 | 说明 |
|------|------|
| 工具注册 | 开发者定义可用工具的 schema |
| 意图识别 | AI 判断是否需要调用工具 |
| 参数生成 | AI 生成符合 schema 的参数 |
| 执行与反馈 | 执行工具并返回结果给 AI |

### 3.2 使用效果对比

```
❌ 无 Function Call:
用户: "北京天气怎样"
AI: "我无法获取实时天气信息" (只输出文字)

✓ 有 Function Call:
用户: "北京天气怎样"
AI: 调用 get_weather(city="北京") → 返回"晴，25℃"
AI: "北京今天天气晴朗，气温25℃"
```

### 3.3 适用场景

- 数据库查询（SQL 执行）
- 第三方 API 调用（天气、股票、地图）
- 文件操作（读写文件、发送邮件）
- 代码执行（沙盒运行用户代码）

### 3.4 优缺点分析

| 优点 | 缺点 |
|------|------|
| 扩展 AI 能力边界 | 需要开发者编写工具代码 |
| 结构化输出 | 调用有延迟 |
| 安全可控 | 可能产生调用循环 |

---

## Step 4: 介绍大体实现过程

### 4.1 涉及的角色

```
用户 → AI模型 → 工具调度器 → 外部工具 → 返回结果
  ↓                                   ↓
问题                              执行结果
```

### 4.2 整体流程

```
1. 开发者注册工具（名称、参数schema、描述）
2. 用户提问
3. AI 判断需要调用工具 + 生成参数
4. 调度器执行工具函数
5. 工具返回结果
6. AI 综合结果生成最终回答
```

### 4.3 核心实现原理

#### 4.3.1 工具定义 Schema

```json
{
  "name": "get_weather",
  "description": "获取指定城市天气",
  "parameters": {
    "type": "object",
    "properties": {
      "city": {
        "type": "string",
        "description": "城市名称"
      }
    },
    "required": ["city"]
  }
}
```

#### 4.3.2 调用流程代码示例

```python
# OpenAI Function Call 示例
from openai import OpenAI

client = OpenAI()

# 1. 注册工具
tools = [{
  "type": "function",
  "function": {
    "name": "get_weather",
    "description": "获取城市天气",
    "parameters": {
      "type": "object",
      "properties": {"city": {"type": "string"}},
      "required": ["city"]
    }
  }
}]

# 2. 调用模型
response = client.chat.completions.create(
  model="gpt-4",
  messages=[{"role": "user", "content": "北京天气怎样？"}],
  tools=tools
)

# 3. AI 判断调用
if response.choices[0].message.tool_calls:
    tool_call = response.choices[0].message.tool_calls[0]
    # get_weather(city="北京")
```

#### 4.3.3 关键 API

| API | 说明 |
|-----|------|
| `tools` 参数 | 注册可用工具列表 |
| `tool_calls` | 模型生成的调用请求 |
| `tool_call_id` | 标识具体调用 |
| `tool role` | 返回工具执行结果 |