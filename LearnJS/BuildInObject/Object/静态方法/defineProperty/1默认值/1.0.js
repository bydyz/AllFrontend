// 字面量对象的属性，有 属性描述符  writable、enumerable、configurable   全为 true
const obj = { name: "John" };

// 获取属性描述符
const descriptor = Object.getOwnPropertyDescriptor(obj, "name");

console.log(descriptor);
/* 输出：
{
  value: "John",
  writable: true,     // 对象字面量默认可写
  enumerable: true,   // 对象字面量默认可枚举
  configurable: true  // 对象字面量默认可配置
}
*/