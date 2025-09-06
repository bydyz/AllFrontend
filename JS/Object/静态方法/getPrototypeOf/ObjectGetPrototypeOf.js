// ObjectGetPrototypeOf


// Object.getPrototypeOf方法返回参数对象的原型。这是获取原型对象的标准方法。

// 语法：Object.getPrototypeOf(Object)


var F = function () {};
var f = new F();
Object.getPrototypeOf(f) === F.prototype // true



// 几种特殊对象的方法：
// 空对象的原型是 Object.prototype
Object.getPrototypeOf({}) === Object.prototype // true

// Object.prototype 的原型是 null
Object.getPrototypeOf(Object.prototype) === null // true

// 函数的原型是 Function.prototype
function fun() {}
Object.getPrototypeOf(fun) === Function.prototype // true







