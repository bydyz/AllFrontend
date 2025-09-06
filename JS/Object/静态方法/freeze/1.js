// Object.freeze() 静态方法可以使一个对象被冻结。
// 冻结对象可以防止扩展，并使现有的属性不可写入和不可配置。

// 被冻结的对象不能再被更改：
// 不能添加新的属性，
// 不能移除现有的属性，
// 不能更改它们的可枚举性、可配置性、可写性或值，
// 对象的原型也不能被重新指定。

// freeze() 返回与传入的对象相同的对象。

// 冻结一个对象是 JavaScript 提供的最高完整性级别保护措施。


const obj = {
  prop: 42,
};

Object.freeze(obj);

obj.prop = 33;
// Throws an error in strict mode

console.log(obj.prop);
// Expected output: 42