// toString() 方法返回当前 symbol 对象的字符串表示。


// Symbol 对象拥有自己的 toString 方法，因而遮蔽了原型链上的 Object.prototype.toString()。


// symbol 原始值不能转换为字符串，所以只能先转换成它的包装对象，再调用 toString() 方法：



// console.log(Symbol("foo") + "bar");
// TypeError: Can't convert symbol to string

console.log(Symbol("foo").toString() + "bar");
// "Symbol(foo)bar"，就相当于下面的：

console.log(Object(Symbol("foo")).toString() + "bar");
// "Symbol(foo)bar"