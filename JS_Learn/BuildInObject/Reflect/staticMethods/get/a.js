// Reflect.get(target, propertyKey[, receiver])


const obj = {
  name: 'Alice',
  age: 25
};

// 等同于 obj.name
console.log(Reflect.get(obj, 'name')); // 'Alice'

// 等同于 obj.age  
console.log(Reflect.get(obj, 'age')); // 25

// 不存在的属性返回 undefined
console.log(Reflect.get(obj, 'gender')); // undefined