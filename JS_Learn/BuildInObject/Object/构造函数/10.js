// 创建包装对象来访问原始值的方法
const str = "hello";
const strObj = Object(str); // 或者 new String(str)

console.log(str.toUpperCase()); // "HELLO" (临时包装)
console.log(strObj.toUpperCase()); // "HELLO" (包装对象方法)

// 包装对象有额外属性
console.log(str.length); // 5
console.log(strObj.length); // 5

// 但包装对象是对象，不是原始值
console.log(typeof str); // "string"
console.log(typeof strObj); // "object"