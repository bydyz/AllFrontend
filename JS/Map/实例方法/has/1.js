// Map 实例的 has() 方法返回一个布尔值，指示具有指定键的元素是否存在。


const map1 = new Map();
map1.set("bar", "foo");

console.log(map1.has("bar"));
// Expected output: true

console.log(map1.has("baz"));
// Expected output: false