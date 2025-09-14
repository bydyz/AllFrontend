// 影响原数组，
// 添加到数组的开头，返回值为新的数组长度

// unshift()
// unshift(element1)
// unshift(element1, element2)
// unshift(element1, element2, /* …, */ elementN)


const array2 = [1, 2, 3];

console.log(array2.unshift(4, 5));
// Expected output: 5

console.log(array2);
// Expected output: Array [4, 5, 1, 2, 3]