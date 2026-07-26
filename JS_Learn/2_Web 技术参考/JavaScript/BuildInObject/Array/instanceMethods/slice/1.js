// 不影响 源数组，
// 也是浅拷贝


// slice()
// slice(start)
// slice(start, end)

// start 可选
//   提取起始处的索引（从 0 开始），会转换为整数。
//     如果索引是负数，则从数组末尾开始计算——如果 start < 0，则使用 start + array.length。
//     如果 start < -array.length 或者省略了 start，则使用 0。
//     如果 start >= array.length，则不提取任何元素。

// end 可选
//   提取终止处的索引（从 0 开始），会转换为整数。slice() 会提取到但不包括 end 的位置。
//     如果索引是负数，则从数组末尾开始计算——如果 end < 0，则使用 end + array.length。
//     如果 end < -array.length，则使用 0。
//     如果 end >= array.length 或者省略了 end，则使用 array.length，提取所有元素直到末尾。
//     如果 end 在规范化后小于或等于 start，则不提取任何元素。

// 返回值
//   一个含有被提取元素的新数组。


// slice() 方法返回一个新的数组对象，这一对象是一个由 start 和 end 决定的原数组的浅拷贝（包括 start，不包括 end），其中 start 和 end 代表了数组元素的索引。原始数组不会被改变。


const animals = ["ant", "bison", "camel", "duck", "elephant"];

console.log(animals.slice(2));
// Expected output: Array ["camel", "duck", "elephant"]

console.log(animals.slice(2, 4));
// Expected output: Array ["camel", "duck"]

console.log(animals.slice(1, 5));
// Expected output: Array ["bison", "camel", "duck", "elephant"]

console.log(animals.slice(-2));
// Expected output: Array ["duck", "elephant"]

console.log(animals.slice(-22));
// Expected output: Array ["ant", "bison", "camel", "duck", "elephant"]

console.log(animals.slice(2, -1));
// Expected output: Array ["camel", "duck"]

console.log(animals.slice());
// Expected output: Array ["ant", "bison", "camel", "duck", "elephant"]