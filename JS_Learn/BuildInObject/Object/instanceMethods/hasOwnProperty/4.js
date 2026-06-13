// 在支持 Object.hasOwn 的浏览器中，建议使用 Object.hasOwn()，而非 hasOwnProperty()。

function Person(name) {
  this.name = name;
}

Person.prototype.species = 'Human';

const john = new Person('John');

console.log(john.hasOwnProperty('name'));    // true (自有属性)
console.log(john.hasOwnProperty('species')); // false (继承属性)

// 但属性仍然可以访问
console.log(john.species); // 'Human'