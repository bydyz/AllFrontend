# 总述

一些 JavaScript 对象，如 document.getElementsByTagName() 返回的 NodeList 或 arguments 等 JavaScript 对象，
有与数组相似的行为，但它们并不共享数组的所有方法。arguments 对象提供了 length 属性，但没有实现如 forEach() 等数组方法。

不能直接在类数组对象上调用数组方法。





# 类数组 特征

1. 类数组对象的关键特征：有 length 属性和数字索引
2. 转换为数组的常用方法：Array.from()、扩展运算符、Array.prototype.slice.call()
3. 最常见的类数组对象：arguments、DOM 集合、字符串
4. 现代实践：优先使用 Array.from() 和扩展运算符，考虑使用 rest 参数替代 arguments





# 转换为 Array

1. 使用 Array.from()（ES6+，推荐）
2. 使用扩展运算符 ...（ES6+）
3. 使用 Array.prototype.slice.call()（ES5）
4. 使用 Array.prototype.concat.apply()