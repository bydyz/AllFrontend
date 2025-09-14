function Animal(){   
  this.name="animal";   
  this.showName=function(){   
    console.log(this.name);   
  }   
}   
function Dog(){   
  this.name="dog";   
}   
var animal=new Animal();   
var dog=new Dog();       

// animal.call(dog);  //报错
// Animal.showName.call(Dog)  //报错

// animal.showName.call(dog);

//输出：dog
//在上面的代码中，我们可以看到Dog里并没有showName方法，那为什么（this.name）的值是dog呢？

//关键就在于最后一段代码（animal.showName.call(dog)），意思是把animal的方法放到dog上执行，也可以说，把animal 的showName()方法放到 dog上来执行，所以this.name 应该是 dog。
