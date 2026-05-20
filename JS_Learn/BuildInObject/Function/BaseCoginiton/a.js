  // 定义函数方式一：一般不使用这种方式      利用  Function 构造函数  创建的函数

  // var fun = new Function(" console.log('加油，学习前端!');");

  // // 调用函数
  // fun();

  // // 判断函数类型
  // console.log(typeof fun) ;//返回值是：function，注意是：函数也是对象
  // console.log()






  


  // 由  Function 构造函数  创建的函数不会创建当前环境的闭包，它们总是被创建于全局环境，因此在运行时它们只能访问全局变量和自己的局部变量，不能访问它们被 Function 构造函数创建时所在的作用域的变量。这一点与使用 eval() 执行创建函数的代码不同。

  // var x = 10;

  // function createFunction1() {
  //     var x = 20;
  //     return new Function('return x;'); // 这里的 x 指向最上面全局作用域内的 x
  // }
  
  // function createFunction2() {
  //     var x = 20;
  //     function f() {
  //         return x; // 这里的 x 指向上方本地作用域内的 x
  //     }
  //     return f;
  // }
  
  // var f1 = createFunction1();
  // console.log(f1());          // 10
  // var f2 = createFunction2();
  // console.log(f2());          // 20


  // 这段代码可以在浏览器中正常运行，但在 Node.js 中 f1() 会产生一个“找不到变量 x”的 ReferenceError。这是因为在 Node 中顶级作用域不是全局作用域，而 x 其实是在当前模块的作用域之中。




  











  // 定义函数方式二：常用          函数声明
  // function fun2() {
  //   console.log("您好，明天!");
  // }
  
  // fun2();
  
  // console.log(typeof fun2)
  // console.log()



  // function
//  函数声明  定义一个具有指定参数的函数。

// 语法：

// function name([param,[, param,[..., param]]]) {
//   [statements]
// }

// name
// 函数名

// param
// 要传递给函数的参数的名称。不同引擎中的最大参数数量不同。

// statements
// 包含函数体的语句。



// 一个被函数声明创建的函数是一个 Function 对象，具有 Function 对象的所有属性、方法和行为


// 默认情况下，函数是返回 undefined 的。想要返回一个其他的值，函数必须通过一个 return 语句指定返回值。














  // 定义函数方式三：声明函数的方式，一般要在`{}`后面加上`;`
  /**
   * 注意是：方式三是将声明函数赋值给fun3，这种方式
   * 一般是需要在`{}`后面加上`;`
   */
  // var fun3 = function () {
  //   console.log("您好，海康!");
  // };

  // fun3();

  // console.log(typeof fun3)


















  //定义函数方式四
  var demo3 = new function () {
      console.log("嘿嘿嘿");
  }
  demo3;  //直接调用












// 定义函数方式五：箭头函数













  // 当有2个相同名称的函数，但是传参不一样，JavaScript 中没有重载，python中也没有重载， java中有重载    没有重载即是被覆盖了，后面的覆盖前面的
