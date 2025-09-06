// Promise.resolve() 是一个静态方法，用于创建一个已解决（fulfilled）状态的 Promise 对象，并将指定的值作为该 Promise 对象的解决值（fulfillment value）。

// 转成Promise对象
function foo() {
  const obj = { 
    name: "why" ,
    //！ resolve中的参数是对象，且该对象中包含了then，那么即定会执行该then函数，且只有这个then函数需要有resolve()才会执行后面的then；只要对象中不包含then，那就只会将其当做普通的参数
    then: (resolve, reject) => {
      console.log('111')
      resolve()
    }
  }
  return new Promise((resolve) => {
    resolve(obj)
  })
}

foo().then(res => {
  console.log("res:", res)     // res: undefined
})




