// 影响 源数组，
// 返回值  操作后的数组，也是原数组经过操作的值
// 也是浅拷贝

let arr = [ 11, 1, 22, 13, 45, 32, 2 ]

let res1 = arr.sort((a, b) => {return b-a})
console.log(res1)

let res2 = arr.sort((a, b) => {return a-b})
console.log(res2)

console.log(arr)