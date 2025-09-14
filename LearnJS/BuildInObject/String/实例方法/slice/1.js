// 不影响 源字符串，包前不包后


// slice(indexStart)
// slice(indexStart, indexEnd)

// 参数
//   indexStart   起始索引，包含

//   indexEnd 可选    终止索引，不包含

// 返回值
//  包前不包后的 字符串



const str = "The quick brown fox jumps over the lazy dog.";

console.log(str.slice(31));
// Expected output: "the lazy dog."

console.log(str.slice(4, 19));
// Expected output: "quick brown fox"

console.log(str.slice(-4));
// Expected output: "dog."

console.log(str.slice(-9, -5));
// Expected output: "lazy"

console.log(str)