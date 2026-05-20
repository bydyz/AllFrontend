// call(thisArg)
// call(thisArg, arg1)
// call(thisArg, arg1, arg2)
// call(thisArg, arg1, arg2, /* …, */ argN)

// thisArg  必选    浏览器环境下


function a(){
  this.a = 1
  console.log(this);   //输出函数a中的this对象
}


// 以下四种情况，this 是全局变量(node环境的全局变量是global，浏览器环境下是window)

console.log(a)
a()                            // window 包含 { a: 1 }
a.call();                      // window
a.call(null);                  // window
a.call(undefined);             // window



a.call(1);                     // Number
a.call('');                    // String
a.call(true);                  // Boolean
a.call(b);                     // function b(){}  {a: 1}