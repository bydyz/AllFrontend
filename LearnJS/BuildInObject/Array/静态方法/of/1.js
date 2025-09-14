// Array.of()
// Array.of(element0)
// Array.of(element0, element1)
// Array.of(element0, element1, /* … ,*/ elementN)


// 参数
//   elementN  用于创建数组的元素。

// 返回值
//   新的 Array 实例。


console.log(Array.of("foo", 2, "bar", true));
// Expected output: Array ["foo", 2, "bar", true]

console.log(Array.of());
// Expected output: Array []