interface IKun {
  name: string;
  age: number;
  slogan: string;

  playBasketball: () => void;
}

interface IRun {
  running: () => void;
}


// !    implements 需要类包含所有待实现接口的 属性 和 方法        可多不可少
class Person implements IKun, IRun {
  name: string;
  age: number;
  height: number;
  slogan: string;

  constructor(name: string, age: number, height: number, slogan: string) {
    this.name = name;
    this.age = age;
    this.height = height;
    this.slogan = slogan;
  }

  playBasketball() {
    console.log(`${this.name} is playing basketball.`);
  }

  running() {
    console.log(`${this.name} is running.`);
  }
}

// 创建 Person 类的实例
const kunRunner = new Person("John", 25, 170, "I love running and playing basketball.");

// 调用接口方法
kunRunner.playBasketball(); // 输出: John is playing basketball.
kunRunner.running();        // 输出: John is running.














// !    implements 需要类包含所有待实现接口的 属性 和 方法        可多不可少
// ！   因为没有限定构造函数，故构造函数可以任意
class Person1 implements IKun, IRun {
  name = 'rc';
  age: number;
  height: number;
  slogan: string;

  constructor(age: number, height: number, slogan: string) {
    this.age = age;
    this.height = height;
    this.slogan = slogan;
  }

  playBasketball() {
    console.log(`${this.name} is playing basketball.`);
  }

  running() {
    console.log(`${this.name} is running.`);
  }
}

// 创建 Person 类的实例
const kunRunner1 = new Person1(25, 170, "I love running and playing basketball.");

// 调用接口方法
kunRunner.playBasketball(); // 输出: John is playing basketball.
kunRunner.running();        // 输出: John is running.

export{}