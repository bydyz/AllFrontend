// ObjectIs


// 1、 Object.is()
// Object.is用来比较两个值是否严格相等，与严格比较运算符（===）的行为基本一致。

let a = {major:'英语',class:'五年一班'};
let aClone = { ...a };//使用扩展运算符将对象a的数据复制到aClone1中
console.log(aClone === a); //false
console.log(Object.is(aClone,a)) //false，使用对象上的is进行判断是否相同
