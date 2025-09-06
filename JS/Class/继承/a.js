function Parent(name) {
  this.name = name;
}

Parent.prototype.sayName = function() {
  console.log(this.name);
};

function Child(name, age) {
  Parent.call(this, name); // 调用父类构造函数初始化实例属性
  this.age = age;
}

// 设置继承关系
Child.prototype = Object.create(Parent.prototype);

console.log(Parent.prototype)
console.log(Child.prototype)

// 注意：这里没有设置 Child.prototype.constructor = Child;

Child.prototype.sayAge = function() {
  console.log(this.age);
};

const childInstance = new Child('Alice', 25);
childInstance.sayName(); // 输出: Alice
childInstance.sayAge();  // 输出: 25

console.log(childInstance instanceof Child);   // 输出: true
console.log(childInstance instanceof Parent);  // 输出: true
console.log(Child.prototype.constructor === Child); // 输出: false
console.log(Child.prototype.constructor === Parent); // 输出: true


const parentInstance = new Parent('AliceParent');
parentInstance.sayName(); // 输出: AliceParent
// 没有 sayAge  所以 Child.prototype = Object.create(Parent.prototype); 后的两个 prototype 是相互独立的
// parentInstance.sayAge();  // 输出: 25