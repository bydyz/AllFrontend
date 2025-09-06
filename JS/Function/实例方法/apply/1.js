function greet(greeting) {
  console.log(`${greeting}, ${this.name}`);
}

const person = { name: 'Alice' };

// 使用 apply 调用 greet 函数，并指定 this 为 person 对象   ['Hello']会自动解构
greet.apply(person, ['Hello']); // 输出: Hello, Alice