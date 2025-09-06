// this绑定规则
// this无非就是在函数调用时被绑定的一个对象，我们就需要知道它在不同的场景下的绑定规则即可。


// 默认绑定
  // 什么情况下使用默认绑定呢？独立函数调用。

  // 独立的函数调用我们可以理解成函数没有被绑定到某个对象上进行调用；


    //!1.普通函数调用

    // 该函数直接被调用，并没有进行任何的对象关联；
    // 这种独立的函数调用会使用默认绑定，通常默认绑定时，函数中的this指向全局对象（window）；
    // function foo() {
    //   console.log(this); // window
    // }

    // foo();


    //!2.函数调用链（一个函数又调用另外一个函数）

    // 所有的函数调用都没有被绑定到某个对象上；
    // // 2.案例二:
    // function test1() {
    //   console.log(this); // window
    //   test2();
    // }

    // function test2() {
    //   console.log(this); // window
    //   test3()
    // }

    // function test3() {
    //   console.log(this); // window
    // }

    // test1();


    //! 3.将函数作为参数，传入到另一个函数中

    // function foo(func) {
    //   func()
    // }

    // function bar() {
    //   console.log(this); // window
    // }

    // foo(bar);


    //！ 4.打印的结果依旧是window
    //！ 原因非常简单，在真正函数调用的位置，并没有进行任何的对象绑定，只是一个独立函数的调用；
    function foo(func) {
      //！ 真正函数调用处没有任何对象绑定
      func()
    }

    function foo1() {
      //！ 真正函数调用处是由obj调用的
      obj.bar()
    }
    
    var obj = {
      name: "why",
      bar: function() {
        console.log(this); 
      }
    }
    
    foo(obj.bar);   // window

    foo1()          // obj对象