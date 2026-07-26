// 不 影响原数组，
// 返回查询的数组元素
// -length =< 传参 < length   区别是 0，否则直接返回 undefined

// 语法：  at(index)

const array1 = [5, 12, 8, 130, 44];

let index = 2;
console.log(array1.at(index))   // 8

index = -2;
console.log(array1.at(index))   // 130

index = 5;
console.log(array1.at(index))   // undefined

index = -5;
console.log(array1.at(index))   // 5
