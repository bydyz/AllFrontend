// 如果在显示绑定中，我们传入一个null或者undefined，那么这个显示绑定会被忽略，使用默认规则：

// function foo() {
//   console.log(this);
// }

// var obj = {
//   name: "why"
// }

// foo.call(obj); // obj对象
// foo.call(null); // window
// foo.call(undefined); // window

// var bar = foo.bind(null);
// bar(); // window

















// 另外一种情况，创建一个函数的 间接引用，这种情况使用默认绑定规则。

// 我们先来看下面的案例结果是什么？

// (num2 = num1)的结果是num1的值；
  // var num1 = 100;
  // var num2 = 0;
  // var result = (num2 = num1);
  // console.log(result); // 100


// 我们来下面的函数赋值结果：
  // 赋值(obj2.foo = obj1.foo)的结果是foo函数；
  // foo函数被直接调用，那么是默认绑定；
  // function foo() {
  //   console.log(this);
  // }

  // var obj1 = {
  //   name: "obj1",
  //   foo: foo
  // }; 

  // var obj2 = {
  //   name: "obj2"
  // }

  // obj1.foo(); // obj1对象
  // (obj2.foo = obj1.foo)();  // window
















// 在ES6中新增一个非常好用的函数类型：箭头函数

// 箭头函数不使用this的四种标准规则（也就是不绑定this），而是根据外层作用域来决定this。

// 我们来看一个模拟网络请求的案例：

  // 这里我使用setTimeout来模拟网络请求，请求到数据后如何可以存放到data中呢？
  // 我们需要拿到obj对象，设置data；
  // 但是直接拿到的this是window，我们需要在外层定义：var _this = this
  // 在setTimeout的回调函数中使用_this就代表了obj对象
  // var obj = {
  //   data: [],
  //   getData: function() {
  //     var _this = this;
  //     setTimeout(function() {
  //       // 模拟获取到的数据
  //       var res = ["abc", "cba", "nba"];
  //       _this.data.push(...res);
  //     }, 1000);
  //   }
  // }

  // obj.getData();
// 上面的代码在ES6之前是我们最常用的方式，从ES6开始，我们会使用箭头函数：

// 为什么在setTimeout的回调函数中可以直接使用this呢？
//! 因为箭头函数并不绑定this对象，那么this引用就会从上层作用域中找到对应的this
// var obj = {
//   data: [],
//   getData: function() {
//     setTimeout(() => {
//       // 模拟获取到的数据
//       var res = ["abc", "cba", "nba"];
//       this.data.push(...res);
//     }, 1000);
//   }
// }

// obj.getData();


//! 思考：如果getData也是一个箭头函数，那么setTimeout中的回调函数中的this指向谁呢？      答案是window；
// 依然是不断的从上层作用域找，那么找到了全局作用域；
// 在全局作用域内，this代表的就是window
// var obj = {
//   data: [],
//   getData: () => {
//     setTimeout(() => {
//       console.log(this); // window
//     }, 1000);
//   }
// }

// obj.getData();