// 可能会意外创建包装对象
function processValue(value) {
  // 如果 value 是原始值，会被包装
  const obj = Object(value);
  console.log(typeof obj); // "object"
  return obj;
}

const num = processValue(42);
console.log(num === 42); // false
console.log(num.valueOf() === 42); // true