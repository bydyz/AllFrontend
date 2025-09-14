// const promise1 = Promise.reject("rejected message")

// 相当于

// const promise2 = new Promise((resolve, reject) => {
//   reject("rejected message")
// })



//! 注意: 无论传入什么值都是一样的     Promise.reject的参数是什么则catch的参数err是什么
// ！ 此处与resolve不同，传入resolve的promise会决定外层promise的状态，进而调取then或者catch
// const promise = Promise.reject(new Promise((reject) => {
//   reject("rejected message")
// }))

const promise = new Promise((resolve, reject) => {
  let promiseInner = new Promise((resolve, reject) => reject('rejected message'))
  console.log(promiseInner)     
  reject(promiseInner)       
})

promise.then(res => {
  console.log("res:", res)
}).catch(err => {
  console.log("err:", err)

  // 无此 catch 则会报
  // [UnhandledPromiseRejection: This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). The promise rejected with the reason "rejected message".] {
  //   code: 'ERR_UNHANDLED_REJECTION'
  // }
  err.catch(err2 => {
    console.log(err2)
  })
})
