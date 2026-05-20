// Map 实例的 keys() 方法返回一个新的 map 迭代器对象，该对象包含了此 map 中每个元素的键，按插入顺序排列。


const map1 = new Map();

map1.set("0", "foo");
map1.set(1, "bar");

const iterator1 = map1.keys();

console.log(iterator1.next().value);
// Expected output: "0"

console.log(iterator1.next().value);
// Expected output: 1