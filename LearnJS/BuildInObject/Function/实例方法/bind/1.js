function greet(greeting) {
  console.log(`${greeting}, ${this.name}`);
}

const person = { name: 'Alice' };

// 使用 bind 创建一个新的函数，并指定 this 为 person 对象
const boundGreet = greet.bind(person);

boundGreet('Hello'); // 输出: Hello, Alice