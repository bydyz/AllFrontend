// new Object(value)
// Object(value)


// 参数
//   value
//     任意值。

//   返回值
//     当调用或者构造 Object() 构造函数本身时，其返回值是一个对象：
//       如果该值是 null 或者 undefined，它会生成并返回一个空对象。
//       如果该值已经是一个对象，则返回该值。
//       否则，它将返回与给定值对应的类型的对象。例如，传递 BigInt 基本类型会返回一个 BigInt 封装对象。

//     当通过继承 Object 的类的构造函数中的 super() 隐式调用 Object() 时，它以 new.target.prototype 为原型初始化一个新对象。
//     传递给 super() 的任意值都将被忽略——例如，即使你传递一个数字，构造函数中的 this 值也不会变成 Number 实例。



// 两种方式都创建空对象
const empty1 = new Object();
const empty2 = Object();

console.log(empty1); // {}
console.log(empty2); // {}
console.log(empty1 === empty2); // false (不同对象)
console.log(typeof empty1); // "object"
console.log(typeof empty2); // "object"