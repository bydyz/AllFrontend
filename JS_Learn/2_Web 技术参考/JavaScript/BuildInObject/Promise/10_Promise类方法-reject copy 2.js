// const promise1 = Promise.reject("rejected message")

// // 相当于

// const promise2 = new Promise((resolve, reject) => {
//   reject("rejected message")
// })



//! 注意: 无论传入什么值都是一样的     Promise.reject的参数是什么则catch的参数err是什么
// ！ 此处与resolve不同，传入resolve的是返回一个promise，而此处只是作为 catch 的参数 err

const promise = Promise.reject(new Promise((reject) => {
  reject("rejected message")
}))

promise.then(res => {
  console.log("res:", res)
}).catch(err => {
  console.log("err:", err)

  // return 的哪个promise  是fuifilled状态
  err.then(res => {
    console.log("res2:", res)
  }).catch(err => {
    console.log("err2:", err)
  })
})
