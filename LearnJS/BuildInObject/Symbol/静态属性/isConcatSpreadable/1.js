// 内置的 Symbol.isConcatSpreadable 符号用于配置某对象作为 Array.prototype.concat() 方法的参数时是否展开其数组元素。


const alpha = ["a", "b", "c"];
const numeric = [1, 2, 3];

let alphaNumeric = alpha.concat(numeric);
console.log(alphaNumeric);
// Expected output: Array ["a", "b", "c", 1, 2, 3]


numeric[Symbol.isConcatSpreadable] = false;
alphaNumeric = alpha.concat(numeric);
console.log(alphaNumeric);
// Expected output: Array ["a", "b", "c", Array [1, 2, 3]]