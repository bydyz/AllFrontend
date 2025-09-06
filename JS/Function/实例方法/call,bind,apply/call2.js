function class1(){   
  this.name = function(){   
    console.log("我是class1内的方法");   
  }   
}   
function class2(){ 
  class1.call(this);  //此行代码执行后，当前的this指向了class1（也可以说class2继承了class1）
  // 似乎这里  有无 return 均可   但是前面有个new，why？ 是不是就是不应该要 return
}   

var f = new class2();   
f.name();   //调用的是class1内的方法，将class1的name方法交给class2使用