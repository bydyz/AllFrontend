// apply(thisArg)
// apply(thisArg, argsArray)

// thisArg  必选    浏览器环境下


function greet(greeting, describe) {
  console.log(`${greeting}, ${this.name}, ${describe}`);
}

const person = { name: 'Alice' };

// 使用 apply 调用 greet 函数，并指定 this 为 person 对象   ['Hello']会自动解构
greet.apply(person, ['Hello', 'I am avery']); // 输出: Hello, Alice, I am avery