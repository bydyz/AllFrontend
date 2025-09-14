
// 异步函数是指在函数执行过程中，可能会发生耗时的异步操作，例如网络请求、文件读取等。在 JavaScript 中，异步函数通常是通过返回 Promise 对象来实现的。异步函数的特点是可以在执行过程中暂停，等待异步操作完成后再继续执行后续代码，而不会阻塞主线程。




// 异步函数内部的操作结果决定了返回的 Promise 对象的状态和值。


//！ 如果异步函数内部的操作成功完成，并且使用 return 关键字返回了一个值，则返回的 Promise 对象状态会变为 fulfilled，并且其值就是返回的值。例如：

// async function fetchData() {
//   return 42; // 返回一个值
// }

// 此时调用 fetchData() 将返回一个状态为 fulfilled 的 Promise 对象，并且其值为 42



//！ 如果异步函数内部的操作成功完成，但没有使用 return 关键字返回值，则返回的 Promise 对象状态也会变为 fulfilled，但其值将是 undefined。例如：

// async function fetchData() {
//   console.log('Data fetched successfully');
// }

// 此时调用 fetchData() 将返回一个状态为 fulfilled 的 Promise 对象，并且其值为 undefined。



//! 如果异步函数内部的操作发生错误（抛出异常），则返回的 Promise 对象状态会变为 rejected，并且其值就是抛出的异常对象。例如：

// async function fetchData() {
//   throw new Error('Failed to fetch data');
// }

// 此时调用 fetchData() 将返回一个状态为 rejected 的 Promise 对象，并且其值为一个包含错误信息的 Error 对象。

