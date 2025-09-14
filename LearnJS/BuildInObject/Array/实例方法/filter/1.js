// 不 影响 源数组，
// 返回值  过滤后的数组
// 也是浅拷贝


// filter(callbackFn)
// filter(callbackFn, thisArg)

// callbackFn = (element, index, array) => {}



const words = ["spray", "elite", "exuberant", "destruction", "present"];

const result = words.filter((word) => word.length > 6);

console.log(result);
// Expected output: Array ["exuberant", "destruction", "present"]