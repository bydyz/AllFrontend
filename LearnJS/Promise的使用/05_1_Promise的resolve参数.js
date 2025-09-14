/**
 * resolve(参数)
 *  1> 普通的值或者对象  pending -> fulfilled  它会返回一个以该值解决的 Promise。然后即会调用 then 的 res函数
 *  2> 传入一个Promise  它将直接返回这个 Promise，而不会创建一个新的 Promise。然后根据 传递的 Promise 内部的 executor 决定后面的走向
 *  3> 传递一个“thenable”对象（“thenable”是指具有 .then() 方法的对象。），它会返回一个新的 Promise，并且这个新的 Promise 会跟随“thenable”对象的状态变化。
 *  4> 不传递任何参数  它将返回一个已经解决的 Promise，其结果值为 undefined。
 */





const promiseOne = new Promise((resolve, reject) => {
  resolve('66695')
})

const promiseTwo = new Promise((resolve, reject) => {
  resolve(promiseOne)
})

new Promise((resolve, reject) => {
  resolve(promiseTwo)
}).then(res => console.log('777', res))

// ! 有多个 promise回调时，倘若均执行了resolve










