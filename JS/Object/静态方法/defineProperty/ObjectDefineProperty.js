// Object.defineProperty 是 JavaScript 中用于定义对象属性的方法。它允许你精确地添加或修改对象的属性，并指定它们的特性。以下是 Object.defineProperty 的详细用法：

// 用法
// Object.defineProperty(obj, prop, descriptor)
// obj：目标对象。
// prop：要定义或修改的属性的名称。
// descriptor：属性的描述符对象，包含属性的特性。

// 描述符对象属性：
// value：属性的值，默认为 undefined。
// writable：属性值是否可写，默认为 false。
// enumerable：属性是否可枚举，默认为 false。
// configurable：属性是否可配置，默认为 false。


// 1. 定义一个新属性
const obj = {};

Object.defineProperty(obj, 'newProp', {
  value: 'Hello, World!',
  writable: true,
  enumerable: true,
  configurable: true
});

console.log(obj.newProp); // 输出: Hello, World!





// 2. 修改属性的特性：
const obj = {
  existingProp: 'Initial Value'
};

Object.defineProperty(obj, 'existingProp', {
  value: 'New Value',
  writable: false,
  enumerable: false,
  configurable: false
});

console.log(obj.existingProp); // 输出: New Value







// 3. 使用 get 和 set 定义属性：
const obj = {
  _value: 0
};

Object.defineProperty(obj, 'value', {
  get() {
    console.log('Getting value');
    return this._value;
  },
  set(newValue) {
    console.log('Setting value');
    this._value = newValue;
  },
  enumerable: true,
  configurable: true
});

obj.value = 42; // 输出: Setting value
console.log(obj.value); // 输出: Getting value, 42

// 在这个例子中，我们使用 get 和 set 方法定义了一个名为 value 的属性，每次读取和设置属性时，都会触发相应的方法。


// 注意事项：
// 使用 Object.defineProperty 定义的属性默认情况下是  不可枚举  的，这意味着它们在 for...in 循环中不会出现。
// 在严格模式下，尝试修改不可配置的属性（例如，通过 delete 删除属性）会抛出错误。
// 描述符对象的属性默认值为 undefined。
// Object.defineProperty 是一个强大的工具，可以用于精细地控制对象属性的行为。然而，对于一般情况下，通常使用简化的语法如 obj.property = value 来定义属性。