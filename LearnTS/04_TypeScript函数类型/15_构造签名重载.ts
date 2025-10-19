interface PersonInstance {
  name: string;
  age: number;
  greet(): string;
}

// 定义一个接口包含构造签名
// !    最终是利用  这个构造签名  来限定类，要求，属性和方法，只多不少
interface Person {
  new (name: string, age: number): PersonInstance;
}