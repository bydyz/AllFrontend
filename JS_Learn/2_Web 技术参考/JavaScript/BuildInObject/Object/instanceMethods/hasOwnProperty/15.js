// 在支持 Object.hasOwn 的浏览器中，建议使用 Object.hasOwn()，而非 hasOwnProperty()。

// 在循环中缓存方法引用可以提高性能
const obj = { /* 大量属性 */ };
const hasOwn = Object.prototype.hasOwnProperty;

for (const key in obj) {
  if (hasOwn.call(obj, key)) {
    // 处理属性
  }
}