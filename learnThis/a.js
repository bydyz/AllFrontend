// 使用this有什么意义呢？下面的代码中，我们通过对象字面量创建出来一个对象，当我们调用对象的方法时，希望将对象的名称一起进行打印。

// 如果没有this，那么我们的代码会是下面的写法：

// var obj = {
//   name: "why",
//   running: function() {
//     console.log(obj.name + " running");
//   },
//   eating: function() {
//     console.log(obj.name + " eating");
//   },
//   studying: function() {
//     console.log(obj.name + " studying");
//   }
// }

//! 在方法中，为了能够获取到name名称，必须通过obj的引用（变量名称）来获取。但是这样做有一个很大的弊端：如果我将obj的名称换成了info，那么所有的方法中的obj都需要换成info。


//！ 有了this后，写法则是

// var obj = {
//   name: "why",
//   running: function() {
//     console.log(this.name + " running");
//   },
//   eating: function() {
//     console.log(this.name + " eating");
//   },
//   studying: function() {
//     console.log(this.name + " studying");
//   }
// }

//！ 在某些函数或者方法的编写中，this可以让我们更加便捷的方式来引用对象，在进行一些API设计时，代码更加的简洁和易于复用。



















// this在全局作用域下指向什么？

// 这个问题非常容易回答，在浏览器中测试就是指向window
// 所以，在全局作用域下，我们可以认为this就是指向的window

// console.log(this); // window

// var name = "why";
// console.log(this.name); // why
// console.log(window.name); // why










//! 所有的函数在被调用时，都会创建一个执行上下文：

  //! 这个上下文中记录着函数的调用栈、函数的调用方式、传入的参数信息等；
  //! this也是其中的一个属性；

  //! 定义一个函数，我们采用三种不同的方式对它进行调用，它产生了三种不同的结果
  // 定义一个函数
  function foo() {
    console.log(this);    
  }
  
  //! 1.调用方式一: 直接调用
  foo(); // window
  
  //! 2.调用方式二: 将foo放到一个对象中,再调用
  var obj = {
    name: "why",
    foo: foo
  }
  obj.foo() // obj对象
  
  //! 3.调用方式三: 通过call/apply调用
  foo.call("abc"); // String {"abc"}对象


//! 1.函数在调用时，JavaScript会默认给this绑定一个值；
//! 2.this的绑定和定义的位置（编写的位置）没有关系；
//! 3.this的绑定和调用方式以及调用的位置有关系；
//! 4.this是在运行时被绑定的