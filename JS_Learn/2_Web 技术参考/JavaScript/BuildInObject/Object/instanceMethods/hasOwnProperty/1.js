//    hasOwnProperty() 是 JavaScript 中用于检查对象是否具有特定  自有属性  的重要方法。

//    obj.hasOwnProperty(prop)
//        ● obj: 要检查的对象
//        ● prop: 要检查的属性名称（String 或 Symbol）
//        ● 返回值: Boolean - 如果对象具有该自有属性则返回 true，否则返回 false


// 在支持 Object.hasOwn 的浏览器中，建议使用 Object.hasOwn()，而非 hasOwnProperty()。


const person = {
  name: 'John',
  age: 30,
  [Symbol('id')]: 123 // Symbol属性
};

console.log(person.hasOwnProperty('name'));         // true
console.log(person.hasOwnProperty('age'));          // true
console.log(person.hasOwnProperty('gender'));       // false
console.log(person.hasOwnProperty('toString'));     // false (继承属性)     只检测有没有 自有属性 ， 继承属性 为 false
console.log(person.hasOwnProperty(Symbol('id')))    // false  这里的 Symbol('id') 和上面定义的 Symbol('id') 不同