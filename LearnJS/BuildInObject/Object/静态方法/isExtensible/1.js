// Object.isExtensible() 静态方法判断一个对象是否是可扩展的（是否可以在它上面添加新的属性）。


const object1 = {};

console.log(Object.isExtensible(object1));
// Expected output: true

Object.preventExtensions(object1);

console.log(Object.isExtensible(object1));
// Expected output: false