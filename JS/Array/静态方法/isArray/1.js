// Array.isArray(value)

// 如果 value 是 Array，则为 true；否则为 false。如果 value 是 TypedArray 实例，则总是返回 false。


console.log(Array.isArray([1, 3, 5]));
// Expected output: true

console.log(Array.isArray("[]"));
// Expected output: false

console.log(Array.isArray(new Array(5)));
// Expected output: true

console.log(Array.isArray(new Int16Array([15, 33])));
// Expected output: false