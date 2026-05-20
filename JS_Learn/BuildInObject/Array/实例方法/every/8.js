// 语法
// every(callbackFn)
// every(callbackFn, thisArg)

// callbackFn = (element, index, array) => {}


// every() 方法测试一个数组内的所有元素是否都能通过指定函数的测试。它返回一个布尔值。


// 闭包

function createChecker(min) {
  return function (age) {
    return age >= min;
  };
}

const check = createChecker(18);
console.log([20, 30, 40].every(check)); // true