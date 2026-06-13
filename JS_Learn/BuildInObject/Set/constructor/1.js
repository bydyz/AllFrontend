// Set 对象允许你存储任何类型（无论是原始值还是对象引用）的唯一值。

// Set() 构造函数创建 Set 对象

// new Set()
// new Set(iterable)

// iterable 可选
//   如果传入一个可迭代对象，它的所有元素将不重复地被添加到新的 Set 中。如果不指定此参数或其值为 null，则新的 Set 为空。

// Set() 只能用 new 构建。试图在没有 new 的情况下调用它，会抛出 TypeError。


const mySet = new Set();

mySet.add(1); // Set [ 1 ]
mySet.add(5); // Set [ 1, 5 ]
mySet.add(5); // Set [ 1, 5 ]
mySet.add("some text"); // Set [ 1, 5, 'some text' ]
const o = { a: 1, b: 2 };
mySet.add(o);