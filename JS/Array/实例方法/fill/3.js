// 影响 源数组，
// 返回值  操作后的数组，也是原数组经过操作的值
// 也是浅拷贝
// fill 啥也不传时，全为 undefined


// 语法
// fill(value)
// fill(value, start)
// fill(value, start, end)


const array1 = [1, 2, 3, 4];

let a = {
  a1: '666'
}
console.log(array1.fill(a));

// 改了 a  也会影响到 array1
a.a1 = '999'
console.log(array1)