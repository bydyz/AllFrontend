const promise = new Promise((resolve, reject) => {
  // resolve()

  // ！ 执行reject或是throw，均是会执行后面的 .catch
  // reject("rejected status")
  throw new Error("rejected status 666666666666666666666")

})

// ！  此处的 new Error("rejected status 666666666666666666666")  即是下方  err     它打印出来就是平常我们见到的报错

//！ 1.当executor抛出异常时, 也是会调用错误(拒绝)捕获的回调函数的


promise.then(res => {
  return new Promise((resolve, reject) => {
    // resolve('resolve6666666')
    // reject("then rejected status")
    throw new Error("rejected status 666666666666666666666")
  })
}).catch(err => {
  // 上面的promise中执行的是  resolve   ，则会执行 return new Promise()，总的分为3类，如下：

  // 1.执行  resolve('resolve6666666')
      // 则后面直接相连的 .catch 没有效果

  // 2.执行  reject("then rejected status")
      // 则后面直接相连的 .catch 会捕捉到并执行

  // 3.执行  throw new Error("rejected status 666666666666666666666")
      // 则后面直接相连的 .catch 会捕捉到并执行
      
  console.log("err:", err)
})