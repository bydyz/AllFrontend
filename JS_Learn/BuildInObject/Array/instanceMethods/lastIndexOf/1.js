// 不影响 源数组
// 寻找第一个 符合情况  的 index


// lastIndexOf(searchElement)
// lastIndexOf(searchElement, fromIndex)

// searchElement
//   被查找的元素。

// fromIndex 可选
//   默认   从末尾查询到序号为0
//   正数   从正数处到序号为0，无论数有多大且有无数据
//   负数   需要 大于 -length，否则为 -1


const animals = ["Dodo", "Tiger", "Penguin", "Dodo"];


console.log(animals.lastIndexOf("Dodo"));
// Expected output: 3

console.log(animals.lastIndexOf("Dodo", 0));
// Expected output: 0

console.log(animals.lastIndexOf("Dodo", -2));
// Expected output: 0

console.log(animals.lastIndexOf("Dodo", -4));
// Expected output: 0

console.log(animals.lastIndexOf("Dodo", -5));
// Expected output: -1

console.log(animals.lastIndexOf("Dodo", 2));
// Expected output: 0

console.log(animals.lastIndexOf("Dodo", 3));
// Expected output: 3

console.log(animals.lastIndexOf("Dodo", 4));
// Expected output: 3

console.log(animals.lastIndexOf("Dodo", 9));
// Expected output: 3

console.log(animals.lastIndexOf("Tiger"));
// Expected output: 1

console.log(animals.lastIndexOf("Tiger", -4));
// Expected output: -1