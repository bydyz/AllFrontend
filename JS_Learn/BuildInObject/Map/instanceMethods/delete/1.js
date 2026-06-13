const map1 = new Map();
map1.set("bar", "foo");
console.log(map1)

console.log(map1.delete("bar"));
console.log(map1)

console.log(map1.has("bar"));
// Expected result: false