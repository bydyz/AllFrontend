// 隐式绑定

// 另外一种比较常见的调用方式是通过某个对象进行调用的：

//! 也就是它的调用位置中，是通过某个对象发起的函数调用


      // 1.通过对象调用函数

      //! foo的调用位置是obj.foo()方式进行调用的，那么foo调用时this会隐式的被绑定到obj对象上

      // function foo() {
      //   console.log(this); // obj对象
      // }

      // var obj = {
      //   name: "why",
      //   foo: foo
      // }

      // obj.foo();


      //！ 2.我们通过obj2又引用了obj1对象，再通过obj1对象调用foo函数；那么foo调用的位置上其实还是obj1被绑定了this；
      function foo() {
        console.log(this); // obj对象
      }

      var obj1 = {
        name: "obj1",
        foo: foo
      }

      var obj2 = {
        name: "obj2",
        obj1: obj1
      }

      obj2.obj1.foo();


      // 3.隐式丢失

      // 结果最终是window，为什么是window呢？因为foo最终被调用的位置是bar，而bar在进行调用时没有绑定任何的对象，也就没有形成隐式绑定；相当于是一种默认绑定；
      // function foo() {
      //   console.log(this);
      // }

      // var obj1 = {
      //   name: "obj1",
      //   foo: foo
      // }

      // // 讲obj1的foo赋值给bar
      // var bar = obj1.foo;
      // bar();