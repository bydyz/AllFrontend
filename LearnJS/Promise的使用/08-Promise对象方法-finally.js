const promise = new Promise((resolve, reject) => {
  // resolve("resolve message")
  // reject("reject message")
  throw new Error("rejected status 666666666666666666666")
})

promise.then(res => {
  console.log("res:", res)
}).catch(err => {
  console.log("err:", err)
}).finally(() => {
  console.log("finally code execute")

  // ! 似乎 finally 是无论如何都会执行，即使上面是抛出错误也是
})
