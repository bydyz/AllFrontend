// Promise.resolve() 是一个静态方法，用于创建一个已解决（fulfilled）状态的 Promise 对象，并将指定的值作为该 Promise 对象的解决值（fulfillment value）。



// 类方法Promise.resolve
// 1.普通的值

const promise = Promise.resolve({ name: "why" })
// 相当于
const promise2 = new Promise((resolve, reject) => {
  resolve({ name: "why" })
})

promise.then(res => {
  console.log("res:", res)
})




