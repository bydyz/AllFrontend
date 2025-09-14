// Function 实例的 name 数据属性表示函数在创建时指定的名称
// 如果函数是匿名函数，则名称可以是 anonymous 或 ''（空字符串）。


const func1 = function () {};

const object = {
  func2: function () {},
};

console.log(func1.name);
// Expected output: "func1"

console.log(object.func2.name);
// Expected output: "func2"