// ◼ Node中的核心API都是基于异步事件驱动的：
//    在这个体系中，某些对象（发射器（Emitters））发出某一个事件；
//    我们可以监听这个事件（监听器 Listeners），并且传入的回调函数，这个回调函数会在监听到事件时调用；

// ◼ 发出事件和监听事件都是通过EventEmitter类来完成的，它们都属于events对象。
//    emitter.on(eventName, listener)：监听事件，也可以使用addListener；
//    emitter.off(eventName, listener)：移除事件监听，也可以使用removeListener；
//    emitter.emit(eventName[, ...args])：发出事件，可以携带一些参数；

const EventEmitter = require('events')

const emitter = new EventEmitter()

function handleWhy(name, age) {
  console.log("监听到why事件", name, age)
}

emitter.on("why", handleWhy)

setTimeout(() => {
  emitter.emit('why', "rc", '26')

  console.log("emit 和 off之间")

  emitter.off('why', handleWhy)
}, 2000)
