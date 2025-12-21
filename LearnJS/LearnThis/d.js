// 显示绑定

  //! 隐式绑定有一个前提条件：必须在调用的对象内部有一个对函数的引用（比如一个属性）；

    // 如果没有这样的引用，在进行调用时，会报找不到该函数的错误；
    // 正是通过这个引用，间接的将this绑定到了这个对象上；


  //！ 倘若不希望在 对象内部 包含这个函数的引用，同时又希望在这个对象上进行强制调用，该如何处理？
  //   JavaScript所有的函数都可以使用call和apply方法（这个和Prototype有关）。
  //！   call和apply方法，第一个参数是相同的，后面的参数，apply为数组，call为参数列表；
  //   这两个函数的第一个参数都要求是一个对象，这个对象的作用是什么呢？就是给this准备的。
  //   在调用这个函数时，会将this绑定到这个传入的对象上。
  //   因为上面的过程，我们明确的绑定了this指向的对象，所以称之为 显示绑定


    // 通过call或者apply绑定this对象

    // 显示绑定后，this就会明确的指向绑定的对象

    // function foo() {
    //   console.log(this);
    // }

    // foo.call(window); // window
    // foo.call({name: "why"}); // {name: "why"}
    // foo.call(123); // Number对象,存放时123


  //！ 如果我们希望一个函数总是显示的绑定到一个对象上，可以怎么做呢？

    //！ 方案一：自己手写一个辅助函数（了解）
    
    //   我们手动写了一个bind的辅助函数
    //   这个辅助函数的目的是在执行foo时，总是让它的this绑定到obj对象上
    //   function foo() {
    //     console.log(this);
    //   }
      
    //   var obj = {
    //     name: "why"
    //   }
      
    //   function bind(func, obj) {
    //     return function() {
    //       return func.apply(obj, arguments);
    //     }
    //   }
      
    //   var bar = bind(foo, obj);
      
    //   bar(); // obj对象
    //   bar(); // obj对象
    //   bar(); // obj对象


    //！ 方案二：使用Function.prototype.bind

    // function foo() {
    //   console.log(this);
    // }

    // var obj = {
    //   name: "why"
    // }

    // //！ 似乎函数调用 bind 方法后，返回的新函数绑定了 对象
    // var bar = foo.bind(obj);

    // bar(); // obj对象
    // bar(); // obj对象
    // bar(); // obj对象