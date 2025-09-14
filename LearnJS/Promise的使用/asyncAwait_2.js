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

const returnPromise = function() {
  return new Promise((resolve, reject) => {
    console.log("函数中要返回的promise")

    resolve("111")
  })
}


const testFunc = async function() {
  console.log("使用returnPromise之前")

  await returnPromise()

  console.log("使用returnPromise之后")
}

testFunc()


// 使用returnPromise之前
// 函数中要返回的promise
// 使用returnPromise之后