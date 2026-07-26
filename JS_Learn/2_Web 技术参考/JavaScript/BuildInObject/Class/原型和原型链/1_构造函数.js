/*

给实例对象添加方法

  把方法书写在构造函数体内
    每次创建实例的时候, 都会创建一个函数数据类型
    多个函数方法, 一模一样, 但是占据了多份存储空间
    
*/

function Person(name, age) {
  //？ 向实例对象内添加属性
  this.name = name;
  this.age = age;

  //？ 向实例对象内添加方法
  //！ 在构造函数体内直接向实例对象添加方法, 这个行为并不好
  //！ 多个函数方法, 一模一样, 但是占据了多份存储空间
  this.sayHi = function () {
    console.log("hello world");
  };
}

// 创建一个实例
var p1 = new Person("Jack", 18);
// 创建第二个实例
var p2 = new Person("Rose", 20);

console.log(p1);
console.log(p2);

console.log(p1.sayHi);
console.log(p2.sayHi);
console.log(p2.sayHi === p1.sayHi);   // 因为占据了不同的存储空间，故此为 false
