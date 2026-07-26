// ObjectCreate

// Object.create()方法接受一个对象为参数，然后以它为原型，返回一个实例对象。该实例完全继承原型对象的属性、方法

// 注意：
// 1、create方法必须提供对象原型，参数为 空 或者参数 不是对象 ，代码会报错
// 2、create()方法生成的新对象，动态继承了原型。在原型上添加或修改任何方法，会立刻反映在新 对象之上。相当于浅拷贝

// 语法：Object.create(Object)


 // 原型对象
 var A = {
  print: function () {
    console.log('hello');
  }
};

// 实例对象
var B = Object.create(A); //通过对象上的create方法，B继承拥有了A的属性以及方法

Object.getPrototypeOf(B) === A // true
B.print() // hello
B.print === A.print // true

