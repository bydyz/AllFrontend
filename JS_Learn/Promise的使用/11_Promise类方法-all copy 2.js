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
})

const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(33333)
  }, 3000);
})



// 创建多个Promise  且  有then
// const p1 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     // reject(11111)
//     resolve(11111)
//   }, 1000);
// }).then(res => {
//   console.log('p1的promise的then')
// })

// const p2 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(22222)
//   }, 2000);
// }).then(res => {
//   console.log('p2的promise的then')
// })

// const p3 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(33333)
//   }, 3000);
// }).then(res => {
//   console.log('p3的promise的then')
// })



// ！ 有then时获取的是 undefined      没有 then 时获取的才是 resolve出来的值

//！ 需求: 所有的Promise都变成fulfilled时, 再拿到结果
//！ 意外: 在拿到所有结果之前, 有一个promise变成了rejected, 那么整个promise是rejected
Promise.all([p2, p1, p3, "aaaa"]).then(res => {
  //！ 所有的都resolve时，返回的是按promise顺序的resolve的值，[ 22222, 11111, 33333, 'aaaa' ]
  console.log(res)
}).catch(err => {
  //！ 有一个是reject是， err则是改reject的参数；若有多个reject，则catch的参数是最早reject的值
  console.log("err:", err)
})

//！ Promise.all 可以接受任何类型的值作为参数，不仅仅是 Promise 对象。对于非 Promise 的值，它们会被视为已解决的 Promise。

//！ 当所有的 Promise 都成功解决时，Promise.all 返回的 Promise 将以一个包含每个 Promise 结果的数组来解决。结果数组中的顺序与原始数组中的顺序一致。














// Promise.all 例子
// 情景：data.records是表格的原始数据，后面对每一行要请求一个接口获取数据并将数据插入到对应行的位置
// let tableData = await Promise.all((data.records || []).map(item => {
//   return new Promise(resolve => {
//       this.getPicUnderCategory(item.id).then(res => {
//           resolve({
//               ...item,
//               coverUrlList: res || []
//           })
//       }).catch(e => resolve({
//           ...item,
//           coverUrlList: []
//       }))
//   })
// }))

// this.tableData = tableData



// 情景：提交表单，表单里有多个文件需要上传，需要在文件上传后再提交表单，此处的代码即是上传文件
// let attachList = await Promise.all(this.fileList.map((item) => {
//   return new Promise(resolve => {
//       this.cos.uploadFile({
//           file: item.context,
//           onSuccess: (attachUrl) => resolve({
//               attachName: item.attachName,
//               attachCode: item.attachCode,
//               attachUrl,
//           }),
//           onError: (err) => resolve(null),
//       })
//   })
// }))
// attachList = attachList.filter((a) => a)





//！ 测试有无  await  时，Promise  Promise.all() 的返回值
async function go() {
  const promise = [new Promise(resolve => resolve('aaaa'))]

  // const promiseAll = Promise.all(promise)                              // Promise { <pending> }
  const promiseAll = await Promise.all(promise)                           //! [ 'aaaa' ]

  console.log(promiseAll)


  // const promise2 = new Promise(resolve => resolve('aaaa'))             // Promise { 'aaaa' }
  const promise2 = await new Promise(resolve => resolve('aaaa'))          //! aaaa

  console.log(promise2)
}

go()