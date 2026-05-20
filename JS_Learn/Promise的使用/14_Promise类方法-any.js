// 创建多个Promise
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    // resolve(11111)
    reject(1111)
  }, 1000);
})

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(22222)
  }, 500);
})

const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    // resolve(33333)
    reject(3333)
  }, 3000);
})

// any方法
Promise.any([p1, p2, p3]).then(res => {
  console.log("res:", res)
}).catch(err => {
  console.log("err:", err.errors)
})



//！ Promise.any 是 JavaScript 中的一个 Promise 方法，它接受一个 Promise 数组，只要其中的一个 Promise 成功（resolved），就会返回一个新的 Promise，该 Promise 会采用第一个成功的 Promise 的结果。如果所有输入的 Promise 都失败（rejected），则返回的 Promise 会失败并提供一个 AggregateError，其中包含每个 Promise 的拒绝原因。

// 以下是对 Promise.any 的详细解释和一些注意事项：

// 语法
  // Promise.any(iterable);
  // iterable 是一个可迭代的对象，通常是包含多个 Promise 的数组

// 返回值：
//   返回一个新的 Promise，当其中的一个 Promise 成功后，返回的 Promise 会成功，它会采用第一个成功的 Promise 的结果。如果所有输入的 Promise 都失败，则返回的 Promise 会失败，并提供一个 AggregateError。

// 示例
const promise1 = new Promise((resolve, reject) => setTimeout(reject, 100, "Rejected"));
const promise2 = new Promise((resolve) => setTimeout(resolve, 200, "Resolved"));
const promise3 = new Promise((resolve, reject) => setTimeout(reject, 300, "Another Rejection"));

const promises = [promise1, promise2, promise3];

Promise.any(promises)
  .then((result) => {
    console.log(`At least one Promise resolved with value: ${result}`);
  })
  .catch((error) => {
    console.error(`All Promises were rejected with errors: ${error}`);
  });

  // 上述示例创建了一个包含三个不同状态的 Promise 数组。使用 Promise.any，我们等待其中的一个 Promise 成功，然后输出该 Promise 的结果。

// 注意事项：
  //! 成功解决的情况：Promise.any 只要其中的一个 Promise 成功，就会返回，而不会等待所有 Promise 都完成。这使它非常适合在多个异步任务中找到第一个成功的结果。

  // 失败的情况：如果所有输入的 Promise 都失败，Promise.any 将返回一个失败的 Promise，并提供一个 AggregateError，其中包含了所有拒绝原因。这意味着您可以获取每个失败 Promise 的原因，以便进行错误处理。

  // 浏览器兼容性：Promise.any 是 ECMAScript 2021（ES12）的新功能，因此在较老的浏览器中可能不受支持。您可以使用 polyfill 或其他方法来处理兼容性问题。

  // 注意顺序：Promise.any 返回的 Promise 采用第一个成功的 Promise 的结果，因此结果的顺序可能不同于传递给 Promise.any 的 Promise 数组的顺序。这是因为 Promise 是异步执行的，先完成的 Promise 具有优先权。

  // 总之，Promise.any 用于等待多个 Promise 中的第一个成功结果，它非常适合在多个异步任务中找到第一个成功的结果，但要小心处理失败的情况。



  //！ Promise.any 要成功执行，满足一下两个条件之一： 1.成功执行了一个resolve   2.reject全部执行了
  //！ 注意：倘若第一个 resolve 前 有promise未结束，则整个 Promise.any 也不会成功执行