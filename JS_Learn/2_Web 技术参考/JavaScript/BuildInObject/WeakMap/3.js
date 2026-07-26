// 有点怪怪的！！！！！！
// 使用 WeakMap 存储私有对象数据
const privateDataMap = new WeakMap();

class MyClass {
  constructor() {
    // 在构造函数中，使用 WeakMap 存储私有数据
    privateDataMap.set(this, {
      privateField: "This is private!",
    });
  }

  getPrivateField() {
    // 在方法中，通过 WeakMap 获取私有数据
    return privateDataMap.get(this).privateField;
  }
}

// 创建类实例
const myObject = new MyClass();


// 在外部无法直接访问私有数据
console.log(myObject.privateField); // 输出: undefined


// 这样可以获取哦
console.log(privateDataMap.get(myObject));


// 通过方法获取私有数据
console.log(myObject.getPrivateField()); // 输出: This is private!


// WeakMap 更适合存储私有对象数据的主要原因是其键是弱引用的，这意味着键对象不会阻止垃圾回收。
// 这样一来，当键对象被销毁或不再被引用时，相应的键值对也会被自动地从 WeakMap 中移除，从而有助于避免内存泄漏。

// 垃圾回收： 当 myObject 对象被销毁或不再被引用时，与之关联的私有数据也会被垃圾回收，不会造成内存泄漏。

// 安全性： 外部代码无法直接访问 privateDataMap 或私有数据，因为它们都是私有的。

// 轻量级： WeakMap 不会增加对象的引用计数，对于对象的生命周期没有影响，因此是一种轻量级的存储私有数据的方式。

// 相比之下，如果使用对象属性来存储私有数据，这些属性可能会一直存在于对象上，即使对象不再被使用，可能导致内存泄漏。
// 而 WeakMap 的弱引用特性有助于避免这个问题。
