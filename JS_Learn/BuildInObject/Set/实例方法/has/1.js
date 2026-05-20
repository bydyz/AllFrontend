// Set 实例的 has() 方法返回一个布尔值来指示对应的值是否存在于该集合中。


const set1 = new Set([1, 2, 3, 4, 5]);

console.log(set1.has(1));
// Expected output: true

console.log(set1.has(5));
// Expected output: true

console.log(set1.has(6));
// Expected output: false