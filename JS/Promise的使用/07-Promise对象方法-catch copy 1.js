const promise = new Promise((resolve, reject) => {
  // resolve()

  // ！ 执行reject或是throw，均是会执行后面的 .catch
  // reject("rejected status")
  throw new Error("rejected status 666666666666666666666")

})

// ！  此处的 new Error("rejected status 666666666666666666666")  即是下方  err     它打印出来就是平常我们见到的报错

//！ 1.当executor抛出异常时, 也是会调用错误(拒绝)捕获的回调函数的

promise.then(undefined, err => {
  console.log("err:", err)
  console.log("----------")
})

//！ 2.通过catch方法来传入错误(拒绝)捕获的回调函数
//! // promise/a+规范
promise.catch(err => {
  console.log("err:", err)
})