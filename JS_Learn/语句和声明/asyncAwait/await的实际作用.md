# 实际情况列举

1. `await` 后面跟一个 Promise

    ```javascript
    async function demo() {
      console.log("开始");
      const result = await somePromise;   // 暂停点
      console.log("恢复执行，结果是:", result);
      return result + 1;
    }
    ```

    执行过程：

      1. 遇到 await somePromise，当前 async 函数被挂起（暂停在这一行）。
      2. 控制权交还给调用者，demo() 函数立即返回一个尚未完成的 Promise。
      3. 当 somePromise 成功（resolve）时：
          * await 表达式的结果就是那个 resolved 的值。
          * async 函数从暂停处恢复执行，将该值赋给 result，继续执行后续代码。
      4. 当 somePromise 失败（reject）时：
          * 相当于在该 await 位置抛出了错误。
          * 可以用 try...catch 捕获，否则整个 async 函数返回的 Promise 会被拒绝。


2. `await` 后面跟一个 普通值（非 Promise）

    ```javascript
    async function demo2() {
      const value = await 42;   // 后面不是 Promise
      console.log(value);       // 42
    }
    ```

    * 如果 await 后面的表达式不是一个 Promise，JavaScript 会将其隐式转换为一个已成功的 Promise（相当于 Promise.resolve(42)）。
    * 但即使立即成功，当前的 async 函数依然会被挂起（微任务时机），等到当前同步代码执行完毕后，再恢复执行。


3. `await` 后面是 函数调用

    ```javascript
    async function example() {
      const result = await someFunction();   // 先调用函数，再等待返回值
    }
    ```

    执行过程：

      1. 立即执行 someFunction() 函数（同步执行函数体）。
      2. 拿到该函数的返回值。
      3. 将返回值通过 Promise.resolve() 包装成 Promise。
      4. 暂停当前 async 函数，等待这个 Promise 完成。
      5. Promise 成功后，恢复执行，await 表达式的值就是 resolve 的值；如果失败（或函数内抛出同步错误），则抛出异常。


4. `await` 后面是 函数引用

    ```javascript
    async function example() {
        const result = await someFunction;   // 注意：没有括号
    }
    ```

    执行过程：

      1. 计算 someFunction 表达式的值，它就是一个函数对象（不是 Promise，也不是函数执行结果）。
      2. 将其通过 Promise.resolve() 包装 → Promise.resolve(someFunction)。
      3. 暂停当前 async 函数，等待这个 Promise 完成（实际上立即成功）。
      4. 恢复执行，result 的值就是 someFunction 这个函数对象本身。


5. 
6. 
7. 