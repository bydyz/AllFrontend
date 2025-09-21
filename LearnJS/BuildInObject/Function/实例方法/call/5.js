function Animal() {
  this.name = "animal";
  this.showName = function () {
    console.log(this.name);
  };
}
console.log('打印Animal', Animal.showName)    // undefined

function Dog() {
  this.name = "dog";
}
console.log('打印Dog', Dog)

var animal = new Animal();
var dog = new Dog();

// animal.call(dog);            //报错
// Animal.showName.call(Dog)    //报错

animal.showName()               // animal
animal.showName.call(dog);      // dog
