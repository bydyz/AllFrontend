// 不影响 源数组


// map(callbackFn)
// map(callbackFn, thisArg)

// callbackFn = (element, index, array) => {}


// map() 方法创建一个新数组，这个新数组由原数组中的每个元素都调用一次提供的函数后的返回值组成。


const array1 = [1, 4, 9, 16];

// Pass a function to map
const map1 = array1.map((x) => x * 2);

console.log(map1);
// Expected output: Array [2, 8, 18, 32]