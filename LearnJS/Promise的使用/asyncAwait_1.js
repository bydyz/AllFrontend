// async 函数：
//  使用 async 关键字定义的函数总是返回一个 Promise。
//  如果该函数返回一个值，则返回以该值为结果的 fulfilled 的 Promise；
//  如果函数抛出异常，则返回以该值为结果的 rejected 的 Promise。

// async 函数是一个返回 Promise 对象的函数。当你在一个函数前面加上 async 关键字时，它就会自动变成一个异步函数，无论它实际上是否包含异步操作。

// await
// await 也是一个修饰符，只能放在async定义的函数内。可以理解为等待。
// await 可以放在任何返回 Promise 的函数前面，以等待该 Promise 解决。
// 在 await 表达式之后的代码会被暂停执行，直到该 Promise 解决后才会继续执行。
//   如果被等待的 Promise 解决为成功状态，await 表达式的值将会是该 Promise 的解决值。
//   如果被等待的 Promise 解决为拒绝状态，await 表达式会抛出一个异常，你可以通过 try...catch 块来捕获这个异常。
// await 后面可以接非 Promise 操作，但是在运行时会将其转换为一个 Promise 对象。
  // await 后面可以接非 Promise 操作。在运行时，JavaScript 会将非 Promise 的值自动包装成一个已解决（resolved）的 Promise 对象。
  // 因此，虽然代码看起来像是异步的，但实际上它会以同步的方式立即执行。
  //   await 是否有返回值：
  //     await 表达式始终会返回其后面表达式的最终值。
  //     如果 await 后面是一个非 Promise 值，则直接返回该值。
  //     如果 await 后面是一个 Promise，则返回该 Promise 解决后的值。


// 使用async/await获取成功的结果

// 定义一个异步函数，3秒后才能获取到值(类似操作数据库)
function getSomeThing(){
  return new Promise((resolve,reject)=>{
      setTimeout(()=>{
        console.log("0")
          resolve('获取成功')
      },3000)
  })
}

async function test(){
  let a = await getSomeThing();
  console.log("1" + a)
}

// test调用，返回一个promise，属于 异步，故先会执行后面的
let a = test();
console.log("2" + a)

// 2[object Promise]
// 0
// 1获取成功
