// 语法
// every(callbackFn)
// every(callbackFn, thisArg)

// callbackFn = (element, index, array) => {}


// every() 方法测试一个数组内的所有元素是否都能通过指定函数的测试。它返回一个布尔值。


// 使用箭头函数（this 从外层继承）

const limit = { minimum: 18 };

const ages = [20, 30, 40, 50];

// 使用箭头函数，不依赖 thisArg
const result = ages.every(age => age >= limit.minimum);

console.log(result); // true