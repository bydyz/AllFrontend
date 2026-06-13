// Object.seal() 静态方法密封一个对象。

// 密封一个对象会阻止其扩展并且使得现有属性不可配置。

// 密封对象有一组固定的属性：
// 不能添加新属性、
// 不能删除现有属性或更改其可枚举性和可配置性、
// 不能重新分配其原型。

// 只要现有属性的值是可写的，它们仍然可以更改。seal() 返回传入的同一对象。



const object1 = {
  property1: 42,
};

Object.seal(object1);
object1.property1 = 33;
console.log(object1.property1);
// Expected output: 33

delete object1.property1; // Cannot delete when sealed
console.log(object1.property1);
// Expected output: 33