// 语法
// every(callbackFn)
// every(callbackFn, thisArg)

// callbackFn = (element, index, array) => {}


// every() 方法测试一个数组内的所有元素是否都能通过指定函数的测试。它返回一个布尔值。


// 在对象方法中使用 thisArg

const validator = {
  threshold: 25,
  validate(age) {
    console.log(this.threshold)
    return age >= this.threshold;
  }
};

const ages = [30, 35, 40, 45];

// ❌ 错误：直接传方法，this 会丢失
// Boolean(25>=undefined) false
console.log(ages.every(validator.validate)); // ❌ this 指向 undefined

console.log()

// ✅ 正确：使用 thisArg 绑定 validator
console.log(ages.every(validator.validate, validator)); // true