// 如果指定的对象自身有指定的属性，则静态方法 Object.hasOwn() 返回 true。
// 如果属性是继承的或者不存在，该方法返回 false。


// Object.hasOwn() 旨在取代 Object.prototype.hasOwnProperty()。


const object1 = {
  prop: "exists",
};

console.log(Object.hasOwn(object1, "prop"));
// Expected output: true

console.log(Object.hasOwn(object1, "toString"));
// Expected output: false

console.log(Object.hasOwn(object1, "undeclaredPropertyValue"));
// Expected output: false