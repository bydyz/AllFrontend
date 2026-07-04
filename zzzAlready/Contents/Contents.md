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



## ArrayList



## 滚动条样式
  LearnHtmlCSS\src\components\LearnScrollbar



## box-sizing
  设置 width为200px  height为100px 
  * box-sizing 为 border-box 时，既是 设置了 content = 200px - 2个padding - 2个border
  * box-sizing 为 content-box（ 默认值 ） 时，既是 设置了 content = 200px

`E:\Project\AAA_All_MINE\all-frontend\HtmlCSSLearn\src\components\LearnBoxSizing\README.MD`



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







