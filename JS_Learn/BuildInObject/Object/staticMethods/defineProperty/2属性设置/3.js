//  Object.defineProperty
//    1. 作用
//      ○ 设置对象值（单个)
//        ■ 新增属性
//        ■ 修改属性
//      ○ 设置属性的描述符
//    2. 返回值
//      ○ 修改后的对象；两个对象指向同一个内存地址

//  属性描述符
//    ● 数据描述符：包含一个值的属性。可以设置 value, writable。
//    ● 存取描述符：由 getter-setter 函数对组成的属性。可以设置 get, set。
//    ● 通用特性：既可以应用于数据描述符也可以应用于访问器描述符，包括 enumerable 和 configurable



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