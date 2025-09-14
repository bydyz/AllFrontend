// codePointAt(index)

// index
//   需要返回的字符的（从零开始的）索引。会被转换为整数——undefined 会转换为 0。

// 返回值
//   一个非负整数，表示给定 index 处字符的码位值。
//     如果 index 超出了 0 – str.length - 1 的范围，codePointAt() 返回 undefined。
//     如果 index 处的元素是一个 UTF-16 前导代理（leading surrogate），则返回代理对的码位。
//     如果 index 处的元素是一个 UTF-16 后尾代理（trailing surrogate），则只返回后尾代理的码元。


// String 的 codePointAt() 方法返回一个非负整数，该整数是从给定索引开始的字符的 Unicode 码位值。请注意，
// 索引仍然基于 UTF-16 码元，而不是 Unicode 码位。



const icons = "☃★♲";

console.log(icons.codePointAt(1));
// Expected output: "9733"