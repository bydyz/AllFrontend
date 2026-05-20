# 描述

Boolean 对象是一个布尔值的对象包装器。



# 语法

const x = new Boolean(param);

如果 省略param 或 param为 0、-0、null、false、NaN、undefined，或空字符串（""），则该对象具有的初始值为 false。
所有其他值，包括任何对象，空数组（[]）或字符串 "false"，都会创建一个初始值为 true 的对象。



# 使用

不要用创建 Boolean 对象的方式将一个非布尔值转化成布尔值，直接将 Boolean 当做转换函数来使用即可，或者使用双重非（!!）运算符：

```javascript
const x = Boolean(expression); // use this...
const x = !!expression; // ...or this
const x = new Boolean(expression); // don't use this!
```


对于任何对象，即使是值为 false 的 Boolean 对象，当将其传给 Boolean 函数时，生成的 Boolean 对象的值都是 true。

```javascript
const myFalse = new Boolean(false); // initial value of false
const g = Boolean(myFalse); // initial value of true
const myString = new String("Hello"); // string object
const s = Boolean(myString); // initial value of true
```



# 比较

[] 是真值而 [] == false 也同时成立的原因是：
  非严格比较 [] == false 会将 [] 的原始值和 false 进行比较。
  而获取 [] 的原始值时，JavaScript 引擎会首先调用 [].toString()。其结果为 ""，也是最终和 false 一起比较的值。
  换句话说，[] == false 等价于 "" == false，而 "" 是假值——这也解释了为什么会得到这一结果。