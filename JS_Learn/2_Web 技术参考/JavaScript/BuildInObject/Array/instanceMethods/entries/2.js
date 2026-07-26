// 语法    entries()


// entries() 方法返回一个新的 数组迭代器对象 ，该对象包含数组中每个索引的键/值对。

const array1 = [, "b", "c"];

const iterator1 = array1.entries();

console.log(iterator1.next().value);
// Expected output: Array [ 0, undefined ]

console.log(iterator1.next().value);
// Expected output: Array [1, "b"]

console.log(iterator1.next().value);
// Expected output: Array [2, "c"]