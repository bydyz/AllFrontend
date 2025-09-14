// 创建多个Promise
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(11111)
  }, 3000);
})

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(22222)
  }, 500);
})

const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('33333333333333333333333333333333333333333333333333333333', )
    resolve(33333)
  }, 1000);
})

// race: 竞技/竞赛
//！ 只要有一个Promise变成 fulfilled 或 Rejected 状态, 那么就结束，并返回一个Promise，且该Promise会根据第一个结束的Promise是 resolve 或者 reject 而调用 Promise.race 后面的 then 或者 catch

// 无论有无
Promise.race([p1, p2, p3]).then(res => {
  console.log("res:", res)
}).catch(err => {
  console.log("err:", err)
})
