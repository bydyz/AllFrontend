const map1 = new Map();

map1.set("0", "foo");
map1.set(1, "bar");
console.log(map1)

const iterator1 = map1.entries();

console.log(iterator1.next().value);
// Expected output: Array ["0", "foo"]

console.log(iterator1.next().value);
// Expected output: Array [1, "bar"]
