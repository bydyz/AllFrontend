// 注意：这不是深拷贝！
const original = { a: 1, b: { c: 2 } };

// 使用 new Object()
const copy1 = new Object(original);
copy1.a = 100;
copy1.b.c = 200;

console.log(original.a); // 1 (未改变)
console.log(original.b.c); // 200 (改变了！)

// 使用 Object()
const copy2 = Object(original);
console.log(copy2 === original); // true (同一个对象)