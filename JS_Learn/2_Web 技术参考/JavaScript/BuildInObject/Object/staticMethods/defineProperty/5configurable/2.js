// 通过 Object.defineProperty() 声明 的属性：configurable: false（若不显式设置）

const obj = {};
Object.defineProperty(obj, "name", { value: "Alice" });
const desc = Object.getOwnPropertyDescriptor(obj, "name");
console.log(desc.configurable); // false