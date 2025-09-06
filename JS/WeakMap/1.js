
    // WeakMap 是 JavaScript 中的一种集合类型，它允许你创建一个键值对的映射，其中 键是对象 而 值可以是任意类型。与 Map 不同的是，WeakMap 中的键是弱引用的，这意味着如果没有其他引用指向键对象，它们可能会被垃圾回收。

    // 1. 创建 WeakMap：
    // const myWeakMap = new WeakMap();

    // 2. 添加键值对：
    // const keyObj = {};   // 键 是对象
    // const value = 'Hello, WeakMap!';
    // myWeakMap.set(keyObj, value);
    // console.log(myWeakMap)

    // 3. 获取值：
    // const retrievedValue = myWeakMap.get(keyObj);
    // console.log(retrievedValue); // 输出: Hello, WeakMap!

    // 4. 检查键是否存在：
    // const keyExists = myWeakMap.has(keyObj);
    // console.log(keyExists); // 输出: true

    // 5. 删除键值对：
    // myWeakMap.delete(keyObj);




    // 6. 弱引用特性：
    // WeakMap 的键是弱引用的，这意味着如果没有其他引用指向键对象，它们可能会被垃圾回收。这有助于避免内存泄漏，因为 WeakMap 不会阻止其键对象被垃圾回收。


    // 7. 限制和注意事项：
    // WeakMap 的键必须是对象，而值可以是任意类型。
    // WeakMap 是不可迭代的，因此没有类似于 Map 的 forEach 方法。
    // 由于键是弱引用的，WeakMap 不具备 size 属性和 clear 方法。


    // 8. 应用场景：
    // WeakMap 通常用于存储对象的私有数据，因为键是弱引用的，不会导致对象无法被垃圾回收。
    // WeakMap 不会泄漏信息，因为它不可遍历，外部无法直接获取到内部信息。











































    // 有点怪怪的！！！！！！
    // 使用 WeakMap 存储私有对象数据
    const privateDataMap = new WeakMap();

    class MyClass {
      constructor() {
        // 在构造函数中，使用 WeakMap 存储私有数据
        privateDataMap.set(this, {
          privateField: 'This is private!'
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
    console.log(privateDataMap.get(myObject).privateField)

    // 通过方法获取私有数据
    console.log(myObject.getPrivateField()); // 输出: This is private!

    

     // WeakMap 更适合存储私有对象数据的主要原因是其键是弱引用的，这意味着键对象不会阻止垃圾回收。这样一来，当键对象被销毁或不再被引用时，相应的键值对也会被自动地从 WeakMap 中移除，从而有助于避免内存泄漏。

    // 垃圾回收： 当 myObject 对象被销毁或不再被引用时，与之关联的私有数据也会被垃圾回收，不会造成内存泄漏。

    // 安全性： 外部代码无法直接访问 privateDataMap 或私有数据，因为它们都是私有的。

    // 轻量级： WeakMap 不会增加对象的引用计数，对于对象的生命周期没有影响，因此是一种轻量级的存储私有数据的方式。

    // 相比之下，如果使用对象属性来存储私有数据，这些属性可能会一直存在于对象上，即使对象不再被使用，可能导致内存泄漏。而 WeakMap 的弱引用特性有助于避免这个问题。

  















    // WeakMap 是 JavaScript 中的一种集合类型，它允许你创建一个键值对的映射，其中 键是对象 而 值可以是任意类型。与 Map 不同的是，WeakMap 中的键是弱引用的，这意味着如果没有其他引用指向键对象，它们可能会被垃圾回收。

    // 1. 创建 WeakMap：
    // const myWeakMap = new WeakMap();

    // 2. 添加键值对：
    // const keyObj = {};   // 键 是对象
    // const value = 'Hello, WeakMap!';
    // myWeakMap.set(keyObj, value);
    // console.log(myWeakMap)

    // 3. 获取值：
    // const retrievedValue = myWeakMap.get(keyObj);
    // console.log(retrievedValue); // 输出: Hello, WeakMap!

    // 4. 检查键是否存在：
    // const keyExists = myWeakMap.has(keyObj);
    // console.log(keyExists); // 输出: true

    // 5. 删除键值对：
    // myWeakMap.delete(keyObj);




    // 6. 弱引用特性：
    // WeakMap 的键是弱引用的，这意味着如果没有其他引用指向键对象，它们可能会被垃圾回收。这有助于避免内存泄漏，因为 WeakMap 不会阻止其键对象被垃圾回收。


    // 7. 限制和注意事项：
    // WeakMap 的键必须是对象，而值可以是任意类型。
    // WeakMap 是不可迭代的，因此没有类似于 Map 的 forEach 方法。
    // 由于键是弱引用的，WeakMap 不具备 size 属性和 clear 方法。


    // 8. 应用场景：
    // WeakMap 通常用于存储对象的私有数据，因为键是弱引用的，不会导致对象无法被垃圾回收。
    // WeakMap 不会泄漏信息，因为它不可遍历，外部无法直接获取到内部信息。