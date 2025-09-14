// 如果 await 后面接的是一个 thenable 对象（即具有 then 方法的对象），JavaScript 引擎会将其视为 Promise 对象，并等待该对象的 then 方法执行完成。

// 例如，考虑以下示例：

async function example() {
  let thenable = {
    then(resolve, reject) {
      setTimeout(() => resolve(42), 1000);
    }
  };

  let result = await thenable;
  console.log(result); // 输出 42
}

example();


// 在这个示例中，thenable 对象具有一个 then 方法，该方法接受两个参数 resolve 和 reject。在调用 then 方法时，它会在 1 秒后调用 resolve 方法并传递参数 42。因为 await 后面跟着 thenable 对象，JavaScript 引擎会将其视为一个 Promise 对象，并等待其 then 方法的执行完成。因此，result 的值就是 42。