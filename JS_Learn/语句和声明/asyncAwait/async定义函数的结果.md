# async 定义的函数执行后，返回的是一个 Promise 对象。

  > 具体来说：
  >  * 如果函数内部 return 一个普通值（或没有 return，即返回 undefined），那么返回的 Promise 会 成功（resolve） 这个值。
  >  * 如果函数内部抛出异常，或者返回一个被拒绝的 Promise，那么返回的 Promise 会 失败（reject） 这个异常或原因。
  >  * 如果函数内部返回一个 Promise，那么 async 函数的返回结果就是那个 Promise 本身（不会再次包装）。