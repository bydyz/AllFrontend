//！ Promise有哪些对象方法
console.log(Object.getOwnPropertyDescriptors(Promise.prototype))





//！ 2.then方法传入的 "回调函数: 可以有返回值
//！ then方法本身也是有返回值的, 它的返回值是Promise，默认该Promise执行了resolve，只不过没有值，故它的then的res是undefined

//！ 1.返回普通值  2.返回一个promise  3.返回一个thenable对象

//！ 1> 如果我们返回的是一个普通值(数值/字符串/普通对象/undefined), 那么这个普通的值被作为一个新的Promise的resolve值


//！ 2> 如果我们返回的是一个Promise   则返回的promise就是  后面的 then 的promise


//！ 3> 如果返回的是一个对象, 并且该对象实现了thenable       则会试着执行里面的then函数

promise.then(res => {
  return {
    then: function(resolve, reject) {
      console.log("then之内，resolve之前")
      resolve(222222)
    }
  }
}).then(res => {
  console.log("res:", res)
})
