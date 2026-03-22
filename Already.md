# Should Remember

## 编码、解码
  `encodeURI`  `encodeURIComponent`  `decodeURI`  `decodeURIComponent`



## 大端序、小端序



## ArrayBuffer
  `new ArrayBuffer(8, { maxByteLength: 16 });`    创建一个 8 字节的缓冲区，它可以调整到的最大长度为 16 字节

  `ArrayBuffer.isView()`    静态方法判断传入值是否是 ArrayBuffer 视图之一

  `ArrayBuffer[Symbol.species]`  暂缓

  `ArrayBuffer.prototype.resize()`
  `ArrayBuffer.prototype.slice()`

  `ArrayBuffer.prototype.byteLength`
  `ArrayBuffer.prototype.maxByteLength`
  `ArrayBuffer.prototype.resizable`



## 原型、原型链
  函数：除去 箭头函数 外，其他函数天生自带 prototype 属性
  对象：天生自带 `__proto__` 属性
  `Function.prototype === Function.__proto__`
  `Object.prototype.__proto__ === null`
  `Promise.__proto__ === Function.prototype`



## Function
  通过构造函数构造出一个复杂的函数

  `Function.prototype.apply()`
  `Function.prototype.bind()`
  `Function.prototype.call()`
  `Function.prototype.toString()`
  `Function.prototype.[Symbol.hasInstance]()`

  `length`
  `name`
  `prototype`



## 迭代
  迭代器  对象，含有next方法，返回对象含有 value key
  迭代器协议是针对对象而言的。在JavaScript中，任何对象 **只要实现了next()方法，就满足了迭代器协议** 。
  **虽然任何对象都可以实现 `next()` 方法，但只有具有 `[Symbol.iterator]` 方法的对象才是可迭代对象** 。
  可迭代器协议



## flex grid

### grid
  grid-template-rows, grid-template-columns
    200px 200px 200px;  33.3% 33.3% 33.4%;  repeat(3,33.33%);   repeat(auto-fill, 200px);   repeat(auto-fill, minmax(250px, 1fr));    minmax(200px, auto);   1fr 2fr 1fr;    1fr 50% 1fr;    minmax(100px,200px)  200px 100px;   100px  200px auto;

  gap: 0;

  grid-column: 1 / -1; /* 横跨所有列 */
  grid-row: 1; /* 占据第一行 */
  grid-row: span 2; /* 占两行 */
  grid-column: span 2; /* 占两列 */
  grid-row: 1 / span 2; /* 占两行 */
  grid-column: 7 / span 6; /* 占6列 */

  grid-template-areas:
    "a e e"
    "d e e"
    "g h i";
  grid-area: e;
### flex



## Array
  new Array(element0, element1, /* … ,*/ elementN)
  new Array(arrayLength)
  不用 new 也可

  Array.from(arrayLike, mapFn, thisArg)
    "foo"   new Set(["foo", "bar", "baz", "foo"])   new Map([["1", "a"],  ["2", "b"],])
    (start, stop, step) => { length: (stop - start) / step + 1 }, (_, i) => start + i * step
  Array.fromAsync(arrayLike, mapFn, thisArg)
  Array.isArray([1, 3, 5])
  Array.of("foo", 2, "bar", true)

  pop();  shift();  push();  unshift();  at();  concat();  copyWithin();  entries();  every();  fill();  filter();  find();  findIndex();  findLast();  findLastIndex();  flat();  flatMap();  forEach();  includes();  indexOf();  join();  keys();  lastIndexOf();  map();  reduce();  reduceRight();  reverse();  slice();  some();  sort();  splice();  toLocaleString();  toReversed();  toSorted();  toSpliced();  toString();  values();  with()



## ArrayList