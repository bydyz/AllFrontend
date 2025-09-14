// 数组
const arr = [1, 2, 3];
console.log(new Object(arr) === arr); // true
console.log(Object(arr) === arr);     // true

// 普通对象
const existingObj = { name: "Alice" };
console.log(new Object(existingObj) === existingObj); // true
console.log(Object(existingObj) === existingObj);     // true

// Date 对象
const date = new Date();
console.log(new Object(date) === date); // true
console.log(Object(date) === date);     // true