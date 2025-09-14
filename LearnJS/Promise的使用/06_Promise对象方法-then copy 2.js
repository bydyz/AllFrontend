//！ Promise有哪些对象方法
// console.log(Object.getOwnPropertyDescriptors(Promise.prototype))



//！ 2.then方法传入的 "回调函数: 可以有返回值

//！ then方法本身也是有返回值的, 它的返回值默认是Promise，且该Promise执行了resolve，只不过没有值，故它的then的res是undefined

const promise1 = new Promise((resolve, reject) => {
  resolve("哈哈哈")
})

promise1.then(res => {
  console.log("res1:", res)
}).then(res => {
  console.log("res1:", res)
})

//！ 1.返回普通值  2.返回一个promise  3.返回一个thenable对象

//！ 1> 如果我们返回的是一个普通值(数值/字符串/普通对象/undefined), 那么这个普通的值被作为一个新的Promise的resolve值

