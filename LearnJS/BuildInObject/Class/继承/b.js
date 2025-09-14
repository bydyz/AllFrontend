function Parent(name) {
  this.name = name;
}

Parent.prototype.sayHello = function() {
  console.log('Hello, ' + this.name);
};

function Child(name, age) {
  this.age = age;
}

// 设置子类的原型为父类的一个实例
Child.prototype = new Parent();

// 添加子类特有的方法
Child.prototype.sayAge = function() {
  console.log('I am ' + this.age + ' years old.');
};

const child = new Child('Charlie', 35);
child.sayHello(); // 输出: Hello, undefined (注意：这里name未被正确初始化)
child.sayAge();   // 输出: I am 35 years old.