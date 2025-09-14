// includes(searchElement)
// includes(searchElement, fromIndex)

// searchElement   需要查找的值
// fromIndex       开始搜索的索引（从零开始），会转换为整数。 0 -> 1 -> 2 -> 3 -> 4 -> length-1

// includes() 方法用来判断一个数组是否包含一个指定的值， 包含则返回 true，否则返回 false。


const array1 = [1, 2, 3];

console.log(array1.includes(2));
// Expected output: true



const pets = ["cat", "dog", "bat"];

console.log(pets.includes("cat"));
// Expected output: true

console.log(pets.includes("cat", 1));
// Expected output: false

console.log(pets.includes("cat", -3));
// Expected output: true

console.log(pets.includes("cat", -33));
// Expected output: true