# 标准 Schema 规范说明

## 概述

在软件开发和数据交换领域，**标准 Schema 规范**通常指 **JSON Schema**，它是用于描述和验证 JSON 数据结构的最广泛使用的国际标准。

---

## 什么是 JSON Schema？

JSON Schema 是一个**声明式语言**，用于：

- **描述** JSON 数据的结构和内容
- **验证** JSON 文档是否符合预期格式
- **生成** 自动化的 API 文档

它相当于 JSON 数据的"蓝图"或"契约"，明确指定数据应该是什么样子的。

---

## JSON Schema 包含哪些内容？

JSON Schema 规范定义了以下核心内容：

| 类别 | 说明 |
|------|------|
| **数据类型** | `string`、`number`、`integer`、`boolean`、`object`、`array`、`null` |
| **格式验证** | `email`、`uri`、`date-time`、`uuid`、`ipv4`、`ipv6` 等 |
| **必填字段** | `required` 数组定义哪些字段必须存在 |
| **范围限制** | `minimum`、`maximum`、`minLength`、`maxLength` |
| **枚举值** | `enum` 定义允许的固定值列表 |
| **数组约束** | `items`、`minItems`、`uniqueItems`、`additionalItems` |
| **对象约束** | `properties`、`additionalProperties`、`patternProperties` |
| **条件逻辑** | `if/then/else`、`oneOf`、`anyOf`、`allOf` |
| **自定义验证** | `const`、`$ref` 引用重用 schema |

---

## JSON Schema 格式示例

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "用户信息",
  "type": "object",
  "properties": {
    "id": {
      "type": "integer",
      "description": "用户唯一标识"
    },
    "name": {
      "type": "string",
      "minLength": 2,
      "maxLength": 50
    },
    "email": {
      "type": "string",
      "format": "email"
    },
    "age": {
      "type": "integer",
      "minimum": 0,
      "maximum": 150
    },
    "roles": {
      "type": "array",
      "items": {
        "type": "string",
        "enum": ["admin", "user", "guest"]
      },
      "minItems": 1,
      "uniqueItems": true
    }
  },
  "required": ["id", "name", "email"],
  "additionalProperties": false
}
```

---

## 其他常见的 Schema 规范

除了 JSON Schema，还有：

| 规范 | 用途 |
|------|------|
| **Schema.org (JSON-LD)** | SEO 结构化数据标记，用于搜索引擎 |
| **XML Schema (XSD)** | XML 数据的模式定义 |
| **GraphQL Schema** | GraphQL API 的类型系统 |
| **Protocol Buffers (.proto)** | Google 的序列化协议 schema |

---

## 总结

最通用的"标准 Schema 规范"是 **JSON Schema**（当前版本为 Draft 2020-12），它：

- 是一个 **JSON 格式**的规范
- 用于描述和验证 JSON 数据结构
- 支持类型验证、格式验证、范围限制、条件逻辑等丰富功能
- 已成为 API 开发中数据验证的事实标准