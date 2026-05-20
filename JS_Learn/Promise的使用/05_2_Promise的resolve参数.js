/**
 * resolve(参数)
 *  1> 普通的值或者对象  pending -> fulfilled  它会返回一个以该值解决的 Promise。然后即会调用 then 的 res函数
 *  2> 传入一个Promise  它将直接返回这个 Promise，而不会创建一个新的 Promise。然后根据 传递的 Promise 内部的 executor 决定后面的走向
 *  3> 传递一个“thenable”对象（“thenable”是指具有 .then() 方法的对象。），它会返回一个新的 Promise，并且这个新的 Promise 会跟随“thenable”对象的状态变化。
 *  4> 不传递任何参数  它将返回一个已经解决的 Promise，其结果值为 undefined。
 */


//！！！！！ 2.传入一个对象, 这个兑现有then方法   看下
new Promise((resolve, reject) => {
  // pending -> fulfilled
  const obj = {
    // ! 此处then里面resolve的内容即是下方then的res
    then: function(resolve, reject) {
      console.log('11111111111111111111111111111111111111111111111111111111', )
      resolve("resolve message")
      // reject("reject message")
    }
  }
  // !似乎是  resolve  调用  一个“thenable”对象，该对象的then函数会执行
  resolve(obj)
}).then(res => {
  console.log("res:", res)
}, err => {
  console.log("err:", err)
})









