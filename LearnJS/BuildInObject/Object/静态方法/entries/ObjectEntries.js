// ObjectEntries


// Object.entries()方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值对数组（二维数组）。

const obj = { foo: 'bar', baz: 42 };

console.log(Object.entries(obj))
// [ ["foo", "bar"], ["baz", 42] ]
