// 语法
// every(callbackFn)
// every(callbackFn, thisArg)

// callbackFn = (element, index, array) => {}


// every() 方法测试一个数组内的所有元素是否都能通过指定函数的测试。它返回一个布尔值。


// thisArg 可以是任意值（包括原始类型）

[10, 20, 30].every(function (val) {
  return val > this;
}, 5); // thisArg = 5

// this = 5，所以 10>5, 20>5, 30>5 → 全部成立
// 返回 true