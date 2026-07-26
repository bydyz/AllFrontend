// JavaScript中的函数可以当做一个类的构造函数来使用，也就是使用new关键字。

// 使用new关键字来调用函数时，会执行如下的操作：

// 1.创建一个全新的对象；
// 2.这个新对象会被执行Prototype连接；
// 3.这个新对象会绑定到函数调用的this上（this的绑定在这个步骤完成）；
// 4.如果函数没有返回其他对象，表达式会返回这个新对象；

// 创建Person
function Person(name) {
  console.log(this); // Person { }
  this.name = name; // Person {name: "why"}
}

var p = new Person("why");

console.log(p);