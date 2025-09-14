// 构造函数用于创建 Array 对象
// 调用 Array() 时可以使用或不使用 new。两者都会创建一个新的 Array 实例。

new Array()
new Array(element0)
new Array(element0, element1)
new Array(element0, element1, /* … ,*/ elementN)
new Array(arrayLength)


Array()
Array(element0)
Array(element0, element1)
Array(element0, element1, /* … ,*/ elementN)
Array(arrayLength)


// 使用数组字面量创建数组
const fruits = ["Apple", "Banana"];
console.log(fruits.length); // 2
console.log(fruits[0]); // "Apple"


// RangeError
// 若用 arrayLength 创建array, 且其值不在 0 到 232 - 1（包括）之间，则会触发异常。