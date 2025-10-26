# 原型的基础概念

函数：除去 箭头函数 外，其他函数天生自带 prototype 属性
对象：天生自带 __proto__ 属性（现代标准使用 Object.getPrototypeOf()）

当你访问对象的成员的时候, 首先在自己身上查找, 如果没有, 自动去到 __proto__ 上查找

对象身上的 __proto__ 指向 所属构造函数的 prototype