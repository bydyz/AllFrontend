// 语法
// every(callbackFn)
// every(callbackFn, thisArg)

// callbackFn = (element, index, array) => {}


// every() 方法测试一个数组内的所有元素是否都能通过指定函数的测试。它返回一个布尔值。


// 不使用 thisArg（this 为 undefined 或 window）


function checkAge(age) {
  console.log(this.minimum)
  return age >= this.minimum;
}

const ages = [20, 30, 40, 50];

// ❌ 报错！this 是 undefined（严格模式）或 window（非严格）
console.log(ages.every(checkAge)); // false 或报错（this.minimum 为 undefined）