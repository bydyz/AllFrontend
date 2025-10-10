const target = { a: 1 };
const source = { b: 2 };

// 将 source 中的属性，浅拷贝得到 target 中，target地址不变
const result = Object.assign(target, source);

console.log(target); // { a: 1, b: 2 }

console.log(result === target); // true

