// 影响 源数组，
// 返回值  操作后的数组，也是原数组经过操作的值
// 也是浅拷贝
// fill 啥也不传时，全为 undefined


// 语法
// fill(value)
// fill(value, start)
// fill(value, start, end)


const array1 = [1, 2, 3, 4];

// Fill with 0 from position 2 until position 4
console.log(array1.fill(0, 2, 4));
// Expected output: Array [1, 2, 0, 0]

// Fill with 5 from position 1
console.log(array1.fill(5, 1));
// Expected output: Array [1, 5, 5, 5]

console.log(array1.fill(6));
// Expected output: Array [6, 6, 6, 6]