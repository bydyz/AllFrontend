// 有些时候，我们会调用一些JavaScript的内置函数，或者一些第三方库中的内置函数。

//   这些内置函数会要求我们传入另外一个函数；
//   我们自己并不会显示的调用这些函数，而且JavaScript内部或者第三方库内部会帮助我们执行；
//   这些函数中的this又是如何绑定的呢？


  //! setTimeout中会传入一个函数，这个函数中的this通常是window

  // setTimeout(function() {
  //   console.log(this); // window
  // }, 1000);

  // 为什么这里是window呢？

  // 这个和setTimeout源码的内部调用有关；
  // setTimeout内部是通过apply进行绑定的this对象，并且绑定的是全局对象；


  //! 数组有一个高阶函数forEach，用于函数的遍历：在forEach中传入的函数打印的也是Window对象；
  // 这是因为默认情况下传入的函数是自动调用函数（默认绑定）；

  // var names = ["abc", "cba", "nba"];
  // names.forEach(function(item) {
  //   console.log(this); // 三次window
  // });

  // var names = ["abc", "cba", "nba"];
  // var obj = {name: "why"};
  // names.forEach(function(item) {
  //   console.log(this); // 三次obj对象
  // }, obj);