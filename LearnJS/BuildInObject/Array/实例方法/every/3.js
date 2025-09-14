// 语法
// every(callbackFn)
// every(callbackFn, thisArg)

// callbackFn = (element, index, array) => {}


// every() 方法测试一个数组内的所有元素是否都能通过指定函数的测试。它返回一个布尔值。


// 使用 thisArg 绑定上下文


function checkAge(age) {
  console.log(this.minimum)
  return age >= this.minimum;
}

const ages = [20, 30, 40, 50];

const limit = {
  minimum: 18
};

// ✅ 使用 thisArg，将 this 绑定为 limit 对象
const result = ages.every(checkAge, limit);

console.log(result); // true