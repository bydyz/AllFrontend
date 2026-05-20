const o = {};

Object.defineProperty(o, "a", {
  value: 1,
  enumerable: true,
});

Object.defineProperty(o, "b", {
  value: 2,
  enumerable: false,
});

//!   enumerable 默认为 false
Object.defineProperty(o, "c", {
  value: 3,
}); 

//!  通过赋值创建属性时 enumerable 默认为 true
o.d = 4; 

Object.defineProperty(o, Symbol.for("e"), {
  value: 5,
  enumerable: true,
});

Object.defineProperty(o, Symbol.for("f"), {
  value: 6,
  enumerable: false,
});

console.log('oooooo', o)

for (const i in o) {
  console.log(i);
}
// 打印 'a' 和 'd'（总是按这个顺序）

Object.keys(o); // ['a', 'd']

o.propertyIsEnumerable("a"); // true
o.propertyIsEnumerable("b"); // false
o.propertyIsEnumerable("c"); // false
o.propertyIsEnumerable("d"); // true
o.propertyIsEnumerable(Symbol.for("e")); // true
o.propertyIsEnumerable(Symbol.for("f")); // false

const p = { ...o };
p.a; // 1
p.b; // undefined
p.c; // undefined
p.d; // 4
p[Symbol.for("e")]; // 5
p[Symbol.for("f")]; // undefined
