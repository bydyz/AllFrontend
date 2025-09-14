// 对象字面量 vs new Object() vs Object()

// 对象字面量（推荐）
const literal = { name: "John", age: 30 };

// new Object()
const withNew = new Object();
withNew.name = "John";
withNew.age = 30;

// Object()
const withFunc = Object();
withFunc.name = "John";
withFunc.age = 30;

console.log(literal); // {name: "John", age: 30}
console.log(withNew); // {name: "John", age: 30}
console.log(withFunc); // {name: "John", age: 30}

// 性能测试
console.time('对象字面量');
for (let i = 0; i < 100000; i++) {
    const obj = { prop: i };
}
console.timeEnd('对象字面量');

console.time('new Object()');
for (let i = 0; i < 100000; i++) {
    const obj = new Object();
    obj.prop = i;
}
console.timeEnd('new Object()');

console.time('Object()');
for (let i = 0; i < 100000; i++) {
    const obj = Object();
    obj.prop = i;
}
console.timeEnd('Object()');