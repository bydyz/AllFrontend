function eat(x,y){   
  this.C = 8
  this.D = 88
  console.log(x+y);   
  console.log(this)
}   
function drink(x,y){ 
  this.A = 6
  this.B = 66  
  console.log(x-y);
}   
eat.call(drink,3,2);
eat(3,2)   //5   window


//输出：
// 5   
// [Function: drink] { C: 8, D: 88 }    这里的this包含drink，但是不像对象一样可以引用其中的变量
//这个例子中的意思就是用 eat 来替换 drink，eat.call(drink,3,2) == eat(3,2) ，所以运行结果为：console.log(5);
//注意：js 中的函数其实是对象，函数名是对 Function 对象的引用。