// WeakMap 是 JavaScript 中的一种集合类型，它允许你创建一个键值对的映射，其中 键是对象 而 值可以是任意类型。
// 与 Map 不同的是，WeakMap 中的键是弱引用的，这意味着如果没有其他引用指向键对象，它们可能会被垃圾回收。

// 1. 创建 WeakMap：
const myWeakMap = new WeakMap();

// 2. 添加键值对：
const keyObj = {}; // 键 是对象
const value = "Hello, WeakMap!";
myWeakMap.set(keyObj, value);
console.log(myWeakMap);

// 3. 获取值：
const retrievedValue = myWeakMap.get(keyObj);
console.log(retrievedValue); // 输出: Hello, WeakMap!

// 4. 检查键是否存在：
const keyExists = myWeakMap.has(keyObj);
console.log(keyExists); // 输出: true

// 5. 删除键值对：
myWeakMap.delete(keyObj);

console.log(myWeakMap);
