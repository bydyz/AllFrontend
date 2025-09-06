//继承
function Animal(name){   
  this.name=name;   
  this.showName=function(){   
    console.log(this.name);   
  }   
}   
function Dog(name){   
  Animal.call(this,name);   
}   

var dog=new Dog("Crazy dog");   

dog.showName();

//输出：Crazy dog
//Animal.call(this) 的意思就是使用 Animal对象代替this对象，那么Dog就能直接调用Animal的所有属性和方法。
