const o = {};


o.a = 1;
// 等价于：
Object.defineProperty(o, "a", {
  value: 1,
  writable: true,
  configurable: true,
  enumerable: true,
});


// 另一种情况
Object.defineProperty(o, "a", { value: 1 });
// 等价于：
Object.defineProperty(o, "a", {
  value: 1,
  writable: false,
  configurable: false,
  enumerable: false,
});
