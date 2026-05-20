// 抽象类
abstract class Animal {
  // 抽象属性
  abstract name: string;
  
  // 抽象方法
  abstract makeSound(): void;
  
  // 具体方法
  move(distance: number = 0): void {
    console.log(`${this.name} moved ${distance}m.`);
  }
  
  // 具体属性
  protected age: number = 0;
  
  // 具体方法
  getAge(): number {
    return this.age;
  }
}

// ❌ 不能实例化抽象类
// const animal = new Animal(); // 错误：无法创建抽象类的实例

// ✅ 具体类继承抽象类
class Dog extends Animal {
  // 必须实现抽象属性
  name: string;
  
  constructor(name: string) {
    super();
    this.name = name;
  }
  
  // 必须实现抽象方法
  makeSound(): void {
    console.log("Woof! Woof!");
  }
  
  // 可以添加额外方法
  fetch(): void {
    console.log(`${this.name} is fetching the ball.`);
  }
}

class Cat extends Animal {
  name: string;
  
  constructor(name: string) {
    super();
    this.name = name;
  }
  
  makeSound(): void {
    console.log("Meow! Meow!");
  }
  
  // 重写具体方法
  move(distance: number = 0): void {
    console.log(`${this.name} quietly moved ${distance}m.`);
  }
}

// 使用具体类
const dog = new Dog("Buddy");
const cat = new Cat("Whiskers");

dog.makeSound(); // "Woof! Woof!"
dog.move(10);    // "Buddy moved 10m."
dog.fetch();     // "Buddy is fetching the ball."


cat.makeSound(); // "Meow! Meow!"
cat.move(5);     // "Whiskers quietly moved 5m." (重写的方法)



export {}