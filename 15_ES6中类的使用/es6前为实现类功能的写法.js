//! 在JavaScript中，ES6引入了class关键字，它是一种语法糖，提供了更清晰、更面向对象的类定义方式。在ES6之前，JavaScript并没有原生的类的概念，开发者通常使用构造函数和原型链来实现类似的面向对象模式。

// class Animal {
//   constructor(name) {
//     this.name = name;
//   }

//   speak() {
//     console.log(`${this.name} makes a noise.`);
//   }
// }

// class Dog extends Animal {
//   constructor(name, breed) {
//     super(name);
//     this.breed = breed;
//   }

//   bark() {
//     console.log(`${this.name} barks.`);
//   }
// }

// const myDog = new Dog('Buddy', 'Golden Retriever');
// myDog.speak();  // Output: Buddy makes a noise.
// myDog.bark();   // Output: Buddy barks.



























// !  以上是es6后引入了 class 关键字后的写法，下方是对应的原生的实现方式

function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function() {
  console.log(`${this.name} makes a noise.`);
}

function Dog(name, breed) {
  Animal.call(this, name);
  this.breed = breed;
}

Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.bark = function() {
  console.log(`${this.name} barks.`);
}

const myDog = new Dog('Buddy', 'Golden Retriever');
myDog.speak();  // Output: Buddy makes a noise.
myDog.bark();   // Output: Buddy barks.
