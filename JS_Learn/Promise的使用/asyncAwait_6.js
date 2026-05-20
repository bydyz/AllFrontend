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