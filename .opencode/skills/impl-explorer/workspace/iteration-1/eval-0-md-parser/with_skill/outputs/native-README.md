# Markdown 解析方案演示

## 方案对比

| 工具 | 定位 | 输出格式 | 性能 | 插件生态 |
|------|------|---------|------|---------|
| **marked** | 轻量编译器 | HTML / tokens | 最快 | 有限 |
| **markdown-it** | 插件化解析器 | HTML / token 流 | 快 | 最丰富 |
| **remark** | AST 解析器 | mdast AST | 中等 | 丰富 |

## 选型建议

| 场景 | 推荐工具 |
|------|---------|
| 快速渲染/零配置 | marked |
| 需要插件扩展/丰富功能 | markdown-it |
| 需要 AST 操作/复杂转换 | remark |

## 运行

```bash
npm install
npm run dev
```
