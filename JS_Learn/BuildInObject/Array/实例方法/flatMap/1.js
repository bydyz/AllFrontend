// 不影响 源数组，
// 也是浅拷贝


// flatMap(callbackFn)
// flatMap(callbackFn, thisArg)

// callbackFn = (element, index, array) => {}

// flatMap() 方法
// 等价于在调用 map() 方法后再调用深度为 1 的 flat() 方法，但比分别调用这两个方法稍微更高效一些。


const arr1 = [1, 2, 1];

const result = arr1.flatMap((num) => (num === 2 ? [2, 2] : 1));

console.log(result);
// Expected output: Array [1, 2, 2, 1]