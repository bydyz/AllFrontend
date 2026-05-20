// indexOf(searchElement)
// indexOf(searchElement, fromIndex)

// searchElement   需要查找的值
// fromIndex       开始搜索的索引（从零开始），会转换为整数。  0 -> 1 -> 2 -> 3 -> 4 -> length-1


// indexOf() 方法返回数组中第一次出现给定元素的下标，如果不存在则返回 -1。


const beasts = ["ant", "bison", "camel", "duck", "bison"];

console.log(beasts.indexOf("bison"));
// Expected output: 1

console.log(beasts.indexOf("bison", 2));
// Expected output: 4

console.log(beasts.indexOf("bison", 5));
// Expected output: -1

console.log(beasts.indexOf("duck", -1));
// Expected output: -1

console.log(beasts.indexOf("duck", -5));
// Expected output: 3

console.log(beasts.indexOf("duck", -6));
// Expected output: 3

console.log(beasts.indexOf("duck", -66));
// Expected output: 3