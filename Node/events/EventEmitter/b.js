// emitter.once(eventName, listener)：事件监听一次
// emitter.prependListener()：将监听事件添加到最前面
// emitter.prependOnceListener()：将监听事件添加到最前面，但是只监听一次
// emitter.removeAllListeners([eventName])：移除所有的监听器



// 在Node.js中，EventEmitter类是一个允许对象发出事件的基类。emitter.prependListener()是EventEmitter的一个方法，它用于将事件监听器添加到事件监听器数组的开头，而不是默认的末尾。这意味着当触发事件时，使用prependListener()添加的监听器将首先被调用。

const EventEmitter = require('events');
const emitter = new EventEmitter();

// 定义一个事件处理函数
function eventHandler() {
  console.log('This is the first listener', arguments);
  console.log(arguments[0])
  console.log(arguments.length)
  console.log('')
}

// 使用prependListener()将事件处理函数添加到事件监听器数组的开头
emitter.prependListener('event', eventHandler);

// 添加另一个事件处理函数，它将被添加到监听器数组的末尾
emitter.on('event', () => {
  console.log('This is the second listener');
});

// 触发事件
emitter.emit('event', 'arg1', 'arg2');