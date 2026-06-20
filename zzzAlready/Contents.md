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
  函数：除去 `箭头函数` 外，其他函数天生自带 `prototype` 属性  
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

  `Function.prototype.length`  
  `Function.prototype.name`  
  `Function.prototype.prototype`



## 迭代
  迭代器 对象，含有 `next` 方法，返回对象含有 `value` `key`  
  迭代器协议是针对对象而言的。在JavaScript中，任何对象 **只要实现了 `next()` 方法，就满足了迭代器协议** 。  
  **虽然任何对象都可以实现 `next()` 方法，但只有具有 `[Symbol.iterator]` 方法的对象才是可迭代对象** 。  
  可迭代器协议  



## flex grid

* `justify-content`   主轴上项目的对齐方式
* `justify-items`   flex无用
* `justify-self`   flex无用


* `align-content`   主轴在侧轴方向上的排列
* `align-items`    控制  所有项目  相对于  自己所处框框  而言的，侧轴方向上的排列
* `align-self`    控制  单个项目  相对于  自己所处框框  而言的，侧轴方向上的排列

### flex
  `justify-items` 、 `justify-self`  在 flex 中无用


### grid
  `grid-template-rows`, `grid-template-columns`  
    // 固定值  
      200px 200px 200px;  
      100px 200px auto;  
    // 百分比  
      33.3% 33.3% 33.4%;  
      1fr 50% 1fr;  
    // repeat  
      repeat(3, 33.33%);  
      repeat(auto-fill, 200px);  
      repeat(auto-fill, minmax(250px, 1fr));  
    // fr 单位  
      1fr 2fr 1fr;  
    // minmax  
      minmax(200px, auto);  
      minmax(100px, 200px) 200px 100px;  

  `gap`: 0;  

  `grid-column`: 1 / -1; /* 横跨所有列 */  
  `grid-row`: 1; /* 占据第一行 */  
  `grid-row`: span 2; /* 占两行 */  
  `grid-column`: span 2; /* 占两列 */  
  `grid-row`: 1 / span 2; /* 占两行 */  
  `grid-column`: 7 / span 6; /* 占6列 */  

  `grid-template-areas`:  
    "a e e"  
    "d e e"  
    "g h i";  
  `grid-area`: e;



## Array
  `new Array(element0, element1, /* … ,*/ elementN)`  
  `new Array(arrayLength)`  
  不用 `new` 也可

  `Array.from(arrayLike, mapFn, thisArg)`  
    // arrayLike  
      "foo"  
      new Set(["foo", "bar", "baz", "foo"])  
      new Map([["1", "a"], ["2", "b"]])  
    // mapFn  
      (start, stop, step) => { length: (stop - start) / step + 1 }, (_, i) => start + i * step  
  `Array.fromAsync(arrayLike, mapFn, thisArg)`  
  `Array.isArray([1, 3, 5])`  
  `Array.of("foo", 2, "bar", true)`

  `Array.prototype.pop()`  
  `Array.prototype.shift()`  
  `Array.prototype.push()`  
  `Array.prototype.unshift()`  
  `Array.prototype.at()`  
  `Array.prototype.concat()`  
  `Array.prototype.copyWithin()`  
  `Array.prototype.entries()`  
  `Array.prototype.every()`  
  `Array.prototype.fill()`  
  `Array.prototype.filter()`  
  `Array.prototype.find()`  
  `Array.prototype.findIndex()`  
  `Array.prototype.findLast()`  
  `Array.prototype.findLastIndex()`  
  `Array.prototype.flat()`  
  `Array.prototype.flatMap()`  
  `Array.prototype.forEach()`  
  `Array.prototype.includes()`  
  `Array.prototype.indexOf()`  
  `Array.prototype.join()`  
  `Array.prototype.keys()`  
  `Array.prototype.lastIndexOf()`  
  `Array.prototype.map()`  
  `Array.prototype.reduce()`  
  `Array.prototype.reduceRight()`  
  `Array.prototype.reverse()`  
  `Array.prototype.slice()`  
  `Array.prototype.some()`  
  `Array.prototype.sort()`  
  `Array.prototype.splice()`  
  `Array.prototype.toLocaleString()`  
  `Array.prototype.toReversed()`  
  `Array.prototype.toSorted()`  
  `Array.prototype.toSpliced()`  
  `Array.prototype.toString()`  
  `Array.prototype.values()`  
  `Array.prototype.with()`  



## ArrayList



## 滚动条样式
  LearnHtmlCSS\src\components\LearnScrollbar



## 虚拟滚动
  LearnNativeDevelop\src\4CustomizedVirtualScrolling\DynamicHeight\01-transform.vue  02
  LearnNativeDevelop\src\4CustomizedVirtualScrolling\FixHeight\01-transform.vue  02



## 主题颜色替换
  08-element-plus



## 选择器
  LearnHtmlCSS\src\components\LearnSelector

  * `*`
  * `&`
  * `first-child`
  * `first-of-type`
  * `:root`
  * `>`
  * `:hover`
  * `:active`
  * `:link`
  * `:visited`



## 插槽的使用

  * 具名插槽
  * 条件插槽
  * 动态插槽
  * 作用域插槽
  * 具名作用域插槽

  搜索：插槽的本质



## 组件名称相关内容

  搜索：组件命名的最佳实践



## JS_Learn

### 语句和声明

  * async...await
  * for...in
  * for...of
  * throw
  * try...catch...finally