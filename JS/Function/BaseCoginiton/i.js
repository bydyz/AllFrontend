// 解析器在调用函数时每次都会向函数内部传递进一个隐含的参数，

// ​ 这个隐含的参数就是this，this指向的是一个对象

// ​ 这个对象我们称为函数执行的上下文对象

// ​ 根据函数的调用方式的不同，this指向不同的对象

// ​ 1.以函数的形式调用时，this永远都是window

// ​ 2.以方法的形式调用时，this就是调用方法的那个对象





// 重点：this就是代表当前的对象，当以  函数调用  时，传入就是window，当以  方法的方式  时，传入就是当前的对象



 /**
   * 解析器在调用函数每次都会向函数内部传递进一个隐含的参数,
   * 是每个对象都隐含有的
   *  在以函数的方式调用函数时，this传入的就是`window`
   *  在以方法的方式调用函数时，this传入就是`当前的对象`
   */
//  var name = "全局name";
//  this.name = 'this name'
//  console.log(this)

//  function fun() {
//    console.log("this当前是谁", this.name);
//  }

//  // 调用方式一：以函数方式调用传入是`window`对象
//  fun();


//  // 调用方式二：
//  // 以方法的方式调用传入是当前的对象
//  var obj = {
//    name:"海康",
//    sayFun:fun
//  }
//  // 以方法的方式调用
//  obj.sayFun();







//  function fun() {
//   // this代表就是当前的对象，所以可以通过this来动态的输出name属性性
//   console.log(this.name);
// }

// var obj1 = {
//   name:"海康",
//   showName:fun
// };

// var obj2 = {
//   name:"南宁",
//   showName:fun
// };

// var obj3 = {
//   name:"西安",
//   showName:fun
// };

// obj1.showName();
// obj2.showName();
// obj3.showName();
/**
 * 输出结果是：
 * 海康
 * 南宁
 * 西安
 */










// 使用工厂方法创建的对象，使用的构造函数都是Object类型的，所以创建的对象都是Object这个类型

function createObject(name,age,sex) {
  var obj = new Object();
  obj.name = name;
  obj.age = age;
  obj.sex = sex;
  obj.sayName = function () {
    console.log(this.name);//使用this关键字输入当前对象的name属性的值
  }

  return obj;// 注意是；使用工厂方法创建对象时，一定要将创建的对象返回
}

var object1 = createObject("海康",21,"男");
var object2 = createObject("南宁",22,"女");
var object3 = createObject("西安",21,"男");

object1.sayName();