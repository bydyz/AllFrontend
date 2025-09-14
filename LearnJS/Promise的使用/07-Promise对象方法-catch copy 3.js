const promise = new Promise((resolve, reject) => {
  resolve()


  // ！ 执行reject或是throw，均是会执行后面的 .catch
  // reject("rejected status")
  // throw new Error("rejected status 666666666666666666666")
})


//！ 4.catch方法的返回值  似乎是和then一样，返回一个promise
const myPromise = new Promise((resolve, reject) => {
  reject("111111")
})

myPromise.then(res => {
  console.log("res:", res)
}).catch(err => {
  console.log("err:", err)
  return "catch return value"
}).then(res => {
  console.log("res result:", res)
}).catch(err => {
  console.log("err result:", err)
})
