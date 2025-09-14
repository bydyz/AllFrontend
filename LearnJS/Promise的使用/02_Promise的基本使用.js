// new Promise传入的这个函数, 被称之为 executor，它会立即执行
// > resolve: 回调函数, 在成功时, 回调resolve函数
// > reject: 回调函数, 在失败时, 回调reject函数


// then方法传入的回调函数两个回调函数:
// > 第一个回调函数, 会在Promise执行resolve函数时, 被回调
// > 第二个回调函数, 会在Promise执行reject函数时, 被回调

// catch方法传入的回调函数, 会在Promise执行reject函数时, 被回调


// 无论一个 promise 后面又多少 then catch 只要excutor中执行了 resolve reject 对应的 then reject 都会执行

function foo() {
  // Promise
  return new Promise((resolve, reject) => {
    resolve("success message")
    // reject("failture message")
  })
}


// main.js
const fooPromise = foo()

// then方法传入的回调函数两个回调函数:
// > 第一个回调函数, 会在Promise执行resolve函数时, 被回调
// > 第二个回调函数, 会在Promise执行reject函数时, 被回调
fooPromise.then((res) => {
  console.log("then1的res" + res)
}, (err) => {
  console.log("then1的err" + err)
})

fooPromise.then((res) => {
  console.log("then2的res" + res)
}, (err) => {
  console.log("then2的err" + err)
})

// catch方法传入的回调函数, 会在Promise执行reject函数时, 被回调
fooPromise.catch(() => {
  console.log("单独的catch1")
})

// catch方法传入的回调函数, 会在Promise执行reject函数时, 被回调
fooPromise.catch(() => {
  console.log("单独的catch2")
})









new Promise((resolve, reject) => {
  // ！写在此处依旧会执行
  console.log('always pending1')
}).then(res => {
  console.log(res)
})


new Promise((resolve, reject) => {
  resolve('啊呀我的天')
  // ！写在此处依旧会执行
  console.log('always pending2')
}).then(res => {
  console.log('always pending2 resolve')
  console.log(res)
})

