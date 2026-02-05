// 不影响 源字符串，包前不包后

// substring(indexStart)
// substring(indexStart, indexEnd)


// 参数
//   indexStart   起始索引，包含

//   indexEnd 可选    终止索引，不包含

// 返回值
//  包前不包后的 字符串

// 作用：截取字符串
// 返回值：截取出来的字符串


const str = "Mozilla";

console.log(str.substring(1, 3));
// Expected output: "oz"

console.log(str.substring(2));
// Expected output: "zilla"

console.log(str.substring());