// 创建多个Promise
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(11111)
  }, 1000);
})

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(22222)
  }, 2000);
})

const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(33333)
  }, 3000);
})

// allSettled
Promise.allSettled([p1, p2, p3]).then(res => {
  console.log(res)
}).catch(err => {
  console.log(err)
})

/* 
[
  { status: 'fulfilled', value: 11111 },
  { status: 'rejected', reason: 22222 },
  { status: 'fulfilled', value: 33333 }
]
*/





//！ Promise.allSettled 是 JavaScript 中的一个 Promise 方法，它接受一个 Promise 数组，并在所有 Promise（无论是成功还是失败）都被 settled（已解决）后返回一个新的 Promise。这个新的 Promise 在所有输入的 Promise 都 settled 后，会以一个包含每个输入 Promise 结果的对象数组进行解决，变为fulfilled状态。每个对象都有 status 和 value 属性，分别表示 Promise 的状态（"fulfilled" 或 "rejected"）和对应的结果值。

// ! 中间还有一个 promise 数组是什么鬼，Promise.all  Promise.race  Promise.any 也有这个情况吗

// ！ Promise.allSettled生成的promise 最终只可能 是fulfilled

// 以下是对 Promise.allSettled 的详细解释和一个代码示例：
  // 语法：
  // Promise.allSettled(iterable);
  // iterable 是一个可迭代的对象，通常是包含多个 Promise 的数组。

  // 返回值：
  // 返回一个新的 Promise，当所有输入的 Promise 都 settled 后，它会解决为一个包含每个 Promise 结果的对象数组。

  // 示例：
  // 假设我们有三个 Promise，一个成功，一个失败，一个成功。我们可以使用 Promise.allSettled 来获取它们的状态和结果：
    // const promise1 = Promise.resolve("Success");
    // const promise2 = Promise.reject("Error");
    // const promise3 = new Promise((resolve) => setTimeout(resolve, 1000, "Delayed Success"));

    // const promises = [promise1, promise2, promise3];

    // Promise.allSettled(promises)
          // ！ allSettled 执行后调用的是then
    //   .then((results) => {
    //     results.forEach((result, index) => {
    //       if (result.status === "fulfilled") {
    //         console.log(`Promise ${index + 1} is fulfilled with value: ${result.value}`);
    //       } else if (result.status === "rejected") {
    //         console.log(`Promise ${index + 1} is rejected with reason: ${result.reason}`);
    //       }
    //     });
    //   });

        // Promise 1 is fulfilled with value: Success
        // Promise 2 is rejected with reason: Error
        // Promise 3 is fulfilled with value: Delayed Success

  // 注意：
  // Promise.allSettled 可用于跟踪一组 Promise 的执行状态，而不会中断执行，即使其中某些 Promise 失败也不会影响其他 Promise 的处理。
  // 这个方法在处理并发请求、异步任务时很有用，因为它可以获取所有任务的结果，而不会因其中一个任务失败而终止整个过程。


