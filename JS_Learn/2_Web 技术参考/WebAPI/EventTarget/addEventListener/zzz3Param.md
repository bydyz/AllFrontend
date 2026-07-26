```javascript
addEventListener(type, listener);
addEventListener(type, listener, options);
addEventListener(type, listener, useCapture);



// 第三个参数

// capture 可选
//   一个布尔值，表示 listener 会在该类型的事件捕获阶段传播到该 EventTarget 时触发。

// once 可选
//   一个布尔值，表示 listener 在添加之后最多只调用一次。如果为 true，listener 会在其被调用之后自动移除。

// passive 可选
//   一个布尔值，设置为 true 时，表示 listener 永远不会调用 preventDefault()。如果 listener 仍然调用了这个函数，
//   客户端将会忽略它并抛出一个控制台警告。查看使用 passive 改善滚屏性能以了解更多。

// signal 可选
//   AbortSignal，该 AbortSignal 的 abort() 方法被调用时，监听器会被移除。

button.addEventListener(
  "click",
  function () {
    optionsOutput.innerHTML += "<p>一次性被动监听器</p>";
  },
  {
    once: true,
    passive: true,
    capture: false,
  }
);
```

1. 第三个参数   不传、传false、传{capture: false}   表示在冒泡阶段监听
2. 第三个参数   传true、传{capture: true}           表示在冒泡阶段监听