// Promise.resolve() 是一个静态方法，用于创建一个已解决（fulfilled）状态的 Promise 对象，并将指定的值作为该 Promise 对象的解决值（fulfillment value）。

// 如果传入的参数是一个 Promise 对象，Promise.resolve() 方法会返回该 Promise 对象本身，而不会创建新的 Promise 对象。这意味着，如果 value 已经是一个 Promise 对象，那么 Promise.resolve(value) 将不会对它进行任何修改，直接返回该 Promise 对象。


//！ 2.传入Promise，外面的 Promise 的状态由里面的promise的状态决定
const promise = Promise.resolve(new Promise((resolve, reject) => {
  resolve("11111")
}))

// 就相当于

new Promise((resolve, reject) => {
  resolve("11111")
})




promise.then(res => {
  console.log("res:", res)
})












//！ 由此，力证  Promise.resolve  传入的是 promise 时，原样返回

const promise1 = new Promise((resolve, reject) => {
  resolve("11111");
});

const resolvedPromise = Promise.resolve(promise1);

console.log(resolvedPromise === promise1); // true
