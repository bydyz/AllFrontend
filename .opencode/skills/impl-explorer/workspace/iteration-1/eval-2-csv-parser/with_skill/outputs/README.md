# CSV 解析方案演示

Vite + Vanilla JS 项目，演示业界 5 种 CSV 解析实现方案。

## 方案列表

| 方案 | 文件 | 说明 |
|------|------|------|
| 简单分割法 | `src/pages/simple-split.js` | 按行+逗号直接分割，不处理边界情况 |
| 正则解析法 | `src/pages/regex-parser.js` | 用正则匹配引号字段，处理逗号与转义 |
| 状态机解析法 | `src/pages/state-machine.js` | 逐字符扫描+状态维护，最稳健 |
| 流式解析法 | `src/pages/streaming-parser.js` | ReadableStream 逐块读取，适合大文件 |
| 自动检测法 | `src/pages/auto-detect.js` | Papa Parse 风格，自动检测分隔符/表头/类型推断 |

## 运行

```bash
npm install
npm run dev
```

## 使用

1. 点击顶部导航切换解析方案
2. 编辑左侧文本域中的 CSV 数据
3. 点击「解析」按钮查看结果
4. 或点击「上传 CSV 文件」从本地加载

