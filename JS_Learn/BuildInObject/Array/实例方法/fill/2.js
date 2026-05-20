// 影响 源数组，
// 返回值  操作后的数组，也是原数组经过操作的值
// 也是浅拷贝
// fill 啥也不传时，全为 undefined


// 语法
// fill(value)
// fill(value, start)
// fill(value, start, end)


const array1 = [1, 2, 3, 4];

console.log(array1.fill());   // [ undefined, undefined, undefined, undefined ]