// Promise.resolve() 是一个静态方法，用于创建一个已解决（fulfilled）状态的 Promise 对象，并将指定的值作为该 Promise 对象的解决值（fulfillment value）。

// 如果传入的 value 是一个具有 then 方法的普通对象，Promise.resolve() 会将其视为一个 thenable 对象，并尝试调用其 then 方法来获取其解决值。在这种情况下，then 方法需要接受两个参数：resolve 和 reject，并且在适当的时候调用其中一个来解决或拒绝 Promise。


// 3.传入thenable对象，then函数的两个参数不一定要被命名为 resolve, reject，根据位置决定其作用
// !传入的thenable对象的效果同于传入一个promise，其resolve的值即作为外面promise的then的res的值
const obj = {
  then: (resolve, reject) => {
    resolve('666')
  }
}

const promise = Promise.resolve(obj)

promise.then(res => {
  console.log("res:", res)
})


//！ 在这个示例中，obj 对象具有一个 then 方法，该方法在调用时立即解决了 Promise，并将值 '666' 作为解决值。然后，Promise.resolve(obj) 返回的 Promise 对象最终也会被解决，其解决值为 '666'。