/**
 * resolve(参数)
 *  1> 普通的值或者对象  pending -> fulfilled  它会返回一个以该值解决的 Promise。然后即会调用 then 的 res函数
 *  2> 传入一个Promise  它将直接返回这个 Promise，而不会创建一个新的 Promise。然后根据 传递的 Promise 内部的 executor 决定后面的走向
 *  3> 传递一个“thenable”对象（“thenable”是指具有 .then() 方法的对象。），它会返回一个新的 Promise，并且这个新的 Promise 会跟随“thenable”对象的状态变化。
 *  4> 不传递任何参数  它将返回一个已经解决的 Promise，其结果值为 undefined。
 */


// 实现Thenable接口意味着一个对象拥有一个名为then的方法，该方法遵循Promise的一部分规范。在JavaScript中，then方法通常用于处理异步操作的结果，允许您链式调用处理程序（handlers）以处理操作的成功和失败情况。当一个对象实现Thenable接口时，它可以在Promise链中使用，类似于标准的Promise对象。

// 详细解释如下：

// Promise的then方法：在Promise对象中，有一个then方法，它用于附加成功处理程序（resolved）和失败处理程序（rejected）以处理异步操作的结果。then方法可以接受两个参数：一个成功处理程序和一个失败处理程序。这些处理程序是回调函数，它们在Promise状态改变时执行。

// Thenable接口：在JavaScript中，任何具有一个then方法的对象都可以被视为Thenable，这意味着它实现了Thenable接口。这使得对象可以与Promise链式结合使用。

// Promise链：Promise链是一种将多个异步操作连接在一起的方式，以确保它们按照特定的顺序执行，同时处理它们的结果。当对象实现Thenable接口时，它可以像Promise一样放入Promise链中，可以使用then方法来指定处理程序以处理操作的成功和失败情况。



// 自定义对象实现了Thenable接口
var customThenable = {
  then: function(onFulfill, onReject) {
    // 在此定义异步操作
    setTimeout(function() {
      // 模拟成功情况
      onFulfill("操作成功");
      
      // 模拟失败情况
      // onReject("操作失败");
    }, 1000);
  }
};

// 使用Promise链处理自定义Thenable对象
// ！直接使用Promise.resolve
var promise = Promise.resolve(customThenable);

promise
  .then(function(result) {
    console.log("成功：" + result);
  })
  .catch(function(error) {
    console.log("失败：" + error);
  });

// 在上述示例中，customThenable对象实现了Thenable接口，并可以像Promise一样与then方法结合使用，以处理异步操作的结果。

// 总之，实现Thenable接口意味着对象可以与Promise一样在Promise链中使用，允许您更容易地管理异步操作。这对于在JavaScript中处理异步代码非常有用。









