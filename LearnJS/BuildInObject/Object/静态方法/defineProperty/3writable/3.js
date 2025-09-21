const o = {};

Object.defineProperty(o, "a", {
  value: 1,
  writable: true,
});

Object.defineProperty(o, "b", {
  value: 2,
  writable: false,
});

//!   enumerable 默认为 false
Object.defineProperty(o, "c", {
  value: 3,
}); 

console.log(o)