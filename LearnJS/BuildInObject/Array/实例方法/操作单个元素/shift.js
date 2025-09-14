// 影响原数组，
// 删除第一个元素，返回值为被删除的元素
// 空数组不会报错，返回 undefined


const array1 = [1, 2, 3];

const firstElement = array1.shift();

console.log(array1);
// Expected output: Array [2, 3]

console.log(firstElement);
// Expected output: 1