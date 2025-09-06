// 创建多个Promise  且  没有then
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    // reject(11111)
    resolve(11111)
  }, 1000);
})


const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(22222)
  }, 2000);
}).then(res => {
  console.log('p2的promise的then')
})


console.log("p1" + p1)
console.log("p2" + p2)

// 都是 promise 只不过 解决的promise的值不同