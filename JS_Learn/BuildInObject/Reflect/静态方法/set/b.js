// 基本示例
const obj = {};

// 设置属性
const success = Reflect.set(obj, 'age', 25);
console.log(success); // true
console.log(obj.age); // 25



// 设置不存在的属性
const success2 = Reflect.set(obj, 'newProp', '新值');
console.log(success2); // true
console.log(obj.newProp); // "新值"



// 设置不可写属性
const frozenObj = Object.freeze({ fixed: '不可变值' });
const success3 = Reflect.set(frozenObj, 'fixed', '新值');
console.log(success3); // false
console.log(frozenObj.fixed); // "不可变值"