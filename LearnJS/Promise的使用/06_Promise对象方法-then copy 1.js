//！ Promise有哪些对象方法
console.log(Object.getOwnPropertyDescriptors(Promise.prototype))

const promise = new Promise((resolve, reject) => {
  resolve("hahaha")
})

//！ 1.同一个Promise可以被多次调用then方法
//！ 当我们的resolve方法被回调时, 所有的then方法传入的回调函数都会被调用

promise.then(res => {
  console.log("res1:", res)
})

promise.then(res => {
  console.log("res2:", res)
})

promise.then(res => {
  console.log("res3:", res)
})

//! res1 2 3三个打印均会调用


