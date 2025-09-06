// 影响 源数组，
// 返回值  操作后的数组，也是原数组经过操作的值
// 也是浅拷贝


// 语法：
// copyWithin(target)
// copyWithin(target, start)
// copyWithin(target, start, end)


const arr = [1, 2, 3];
const result = arr.copyWithin(0, 1, 2);

console.log(result === arr); // true