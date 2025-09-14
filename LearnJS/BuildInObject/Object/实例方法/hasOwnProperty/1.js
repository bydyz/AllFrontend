// hasOwnProperty() 方法返回一个布尔值，表示对象自有属性（而不是继承来的属性）中是否具有指定的属性


// 在支持 Object.hasOwn 的浏览器中，建议使用 Object.hasOwn()，而非 hasOwnProperty()。


const object1 = {};
object1.property1 = 42;

console.log(object1.hasOwnProperty("property1"));
// Expected output: true

console.log(object1.hasOwnProperty("toString"));
// Expected output: false

console.log(object1.hasOwnProperty("hasOwnProperty"));
// Expected output: false