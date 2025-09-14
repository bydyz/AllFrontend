function a(){
  this.a = 1
  console.log(this);   //输出函数a中的this对象
}     





function b(){
  this.c = 2
}       

var c = {name:"call"};    //定义对象c  



// 以下四种情况，this 是全局变量(node环境的全局变量是global，浏览器环境下是window)
// a()                            // window 包含 { a: 1 }
// a.call();                      //window
// a.call(null);                  //window
// a.call(undefined);             //window



// a.call(1);                        //Number
// a.call('');                    //String
// a.call(true);                  //Boolean
// a.call(b);                     //function b(){}  {a: 1}



//！     这个是常用的
a.call(c);                     // { name: 'call' }




// a.call(this)                      // window 包含 { a: 1 }