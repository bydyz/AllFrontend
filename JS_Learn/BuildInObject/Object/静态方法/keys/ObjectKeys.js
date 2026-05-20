// Object.keys() 静态方法返回一个由给定对象自身的可枚举的字符串键属性名组成的数组。


// ES5 引入了Object.keys方法，返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键名。


var obj = { foo: 'bar', baz: 42 };

Object.keys(obj)

// ["foo", "baz"]
