// 规则优先级
// 学习了四条规则，接下来开发中我们只需要去查找函数的调用应用了哪条规则即可，但是如果一个函数调用位置应用了多条规则，优先级谁更高呢？

//! 1.默认规则的优先级最低

// 毫无疑问，默认规则的优先级是最低的，因为存在其他规则时，就会通过其他规则的方式来绑定this


//! 2.显示绑定优先级高于隐式绑定

// 显示绑定和隐式绑定哪一个优先级更高呢？这个我们可以测试一下：

// 结果是obj2，说明是显示绑定生效了
// function foo() {
//   console.log(this);
// }

// var obj1 = {
//   name: "obj1",
//   foo: foo
// }

// var obj2 = {
//   name: "obj2",
//   foo: foo
// }

// // 隐式绑定
// obj1.foo(); // obj1
// obj2.foo(); // obj2

// // 隐式绑定和显示绑定同时存在
// obj1.foo.call(obj2); // obj2, 说明显式绑定优先级更高


//! 3.new绑定优先级高于隐式绑定

// 结果是foo，说明是new绑定生效了
// function foo() {
//   console.log(this);
// }

// var obj = {
//   name: "why",
//   foo: foo
// }

// new obj.foo(); // foo对象, 说明new绑定优先级更高


//! 4.new绑定优先级高于bind

// new绑定和call、apply是不允许同时使用的，所以不存在谁的优先级更高

// 但是new绑定是否可以和bind后的函数同时使用呢？可以

// 结果显示为foo，那么说明是new绑定生效了
// function foo() {
//   console.log(this);
// }

// var obj = {
//   name: "obj"
// }

// var bar = foo.bind(obj);
// var foo = new bar(); // 打印foo, 说明使用的是new绑定
// 优先级总结：

//! new绑定 > 显示绑定（bind）> 隐式绑定 > 默认绑定