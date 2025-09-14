function greet(greeting) {
  console.log(`${greeting}, ${this.name}`);
}

const person = { name: 'Alice' };

// 使用 call 调用 greet 函数，并指定 this 为 person 对象
greet.call(person, 'Hello'); // 输出: Hello, Alice