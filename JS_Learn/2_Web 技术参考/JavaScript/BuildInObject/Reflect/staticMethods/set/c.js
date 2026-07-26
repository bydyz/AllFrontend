const parent = { value: "父值" };
const child = { __proto__: parent };

Reflect.set(child, "value", "子值1", parent);

console.log('打印', parent, child)