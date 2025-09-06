// 语法    entries()


// entries() 方法返回一个新的 数组迭代器对象 ，该对象包含数组中每个索引的键/值对。

const array1 = ["a", "b", "c"];

const iterator1 = array1.entries();
console.log(iterator1)

console.log(iterator1.next().value);
// Expected output: Array [0, "a"]

console.log(iterator1.next().value);
// Expected output: Array [1, "b"]