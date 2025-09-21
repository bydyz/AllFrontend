const obj = {};

//! 1. 使用 null 原型：没有继承的属性   故 descriptor 是 原型链为 null 的对象 { value: 'static' }
const descriptor = Object.create(null);
descriptor.value = "static";
console.log(descriptor)         // [Object: null prototype] { value: 'static' }

//! 默认情况下，它们不可枚举、不可配置、不可写
Object.defineProperty(obj, "key", descriptor);

// 2. 使用一个包含所有属性的临时对象字面量来明确其属性
Object.defineProperty(obj, "key2", {
  enumerable: false,
  configurable: false,
  writable: false,
  value: "static",
});
console.log('obj111', obj)

// 3. 重复利用同一对象
function withValue(value) {
  const d =
    withValue.d ||
    (withValue.d = {
      enumerable: false,
      writable: false,
      configurable: false,
      value,
    });

  // 避免重复赋值
  if (d.value !== value) d.value = value;

  return d;
}
// 然后
Object.defineProperty(obj, "key", withValue("static"));
console.log('obj222', obj)


// 如果 freeze 可用，防止添加或删除对象原型属性
// （value、get、set、enumerable、writable、configurable）
// (Object.freeze || Object)(Object.prototype);
