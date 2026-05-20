// findIndex(callbackFn)
// findIndex(callbackFn, thisArg)

// callbackFn = (element, index, array) => {}

// findIndex() 方法返回数组中满足提供的测试函数的第一个元素的索引。若没有找到对应元素则返回 -1。


// findLastIndex() 的用法 基本同上 findIndex
// findLastIndex() 方法反向迭代数组，并返回满足所提供的测试函数的第一个元素的索引。若没有找到对应元素，则返回 -1。

const array1 = [5, 12, 8, 130, 44];

const isLargeNumber = (element) => element > 13;

console.log(array1.findIndex(isLargeNumber));
// Expected output: 3