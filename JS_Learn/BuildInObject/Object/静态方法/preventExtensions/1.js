// Object.preventExtensions() 静态方法可以防止新属性被添加到对象中（即防止该对象被扩展）。
// 它还可以防止对象的原型被重新指定。


const object1 = {};

Object.preventExtensions(object1);

try {
  Object.defineProperty(object1, "property1", {
    value: 42,
  });
} catch (e) {
  console.log(e);
  // Expected output: TypeError: Cannot define property property1, object is not extensible
}