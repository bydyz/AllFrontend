# 可使用的范围

## 同一个 JavaScript 运行时
    JavaScript 运行时 指的是一个能够执行 JavaScript 代码的环境，它包含：
      JavaScript 引擎（如 V8、SpiderMonkey）
      事件循环（Event Loop）
      调用栈（Call Stack）
      内存堆（Memory Heap）
      Web API（在浏览器中）

    整个 Vue 或 React 工程运行在同一个 JavaScript 运行时中。
    不同浏览器标签页  不属于  同一个 JavaScript 运行时中
    浏览器扩展/插件  不属于  同一个 JavaScript 运行时中

    关闭浏览器标签页后，该标签页对应的整个 JavaScript 运行时环境会被完全销毁，包括全局 Symbol 注册表。
    
## 同一个域下的不同 iframe
## Web Workers
## Service Workers






# 限制和注意事项

## 不同域之间的全局 Symbol 注册表是隔离的
## 全局 Symbol 会一直存在于注册表中，不会被垃圾回收