// 不 影响 源数组，
// 也是浅拷贝

// arrayInstance.with(index, value)

// 参数
//   index
//   要修改的数组索引（从 0 开始），将会转换为整数。
//     负数索引会从数组末尾开始计数——即当 index < 0 时，会使用 index + array.length。
//     如果规范化后的索引超出数组边界，会抛出 RangeError。

// value
//   要分配给指定索引的任何值。

// 返回值
//   一个全新的数组，其中 index 索引处的元素被替换为 value。

// 异常
//   RangeError
//   index > array.length 或 index < -array.length 时抛出。


// Array 实例的 with() 方法是使用方括号表示法修改指定索引值的复制方法版本。它会返回一个新数组，其指定索引处的值会被新值替换

const arr = [1, 2, 3, 4, 5];
console.log(arr.with(2, 6)); // [1, 2, 6, 4, 5]
console.log(arr); // [1, 2, 3, 4, 5]


const arr1 = [1, 2, 3, 4, 5];
console.log(arr1.with(2, 6).map((x) => x ** 2)); // [1, 4, 36, 16, 25]