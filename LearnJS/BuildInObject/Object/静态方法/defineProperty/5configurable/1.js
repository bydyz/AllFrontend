//    用于控制属性是否可被修改或删除

//    核心作用：
//      1. 锁定属性定义：决定属性描述符（value, writable, enumerable, configurable 自身）是否可被修改。
//      2. 控制删除：决定属性是否可被 delete 操作符删除。
//      3. 禁止类型转换：阻止属性在数据属性和访问器属性（getter/setter）之间切换。



// 通过 字面量声明 的属性：configurable: true

const obj = { name: "Alice" };
const desc = Object.getOwnPropertyDescriptor(obj, "name");
console.log(desc.configurable); // true