// 影响 源数组，
// 返回值  操作后的数组，也是原数组经过操作的值
// 也是浅拷贝


// 语法：
// copyWithin(target)
// copyWithin(target, start)
// copyWithin(target, start, end)


const array1 = ["a", "b", "c", "d", "e"];

// Copy to index 0 the element at index 3
console.log(array1.copyWithin(0, 3, 4));
// Expected output: Array ["d", "b", "c", "d", "e"]

// Copy to index 1 all elements from index 3 to the end
console.log(array1.copyWithin(1, 3));
// Expected output: Array ["d", "d", "e", "d", "e"]