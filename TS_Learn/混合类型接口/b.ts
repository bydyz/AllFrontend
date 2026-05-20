interface IBar {
  //！ 以下四个属性可以不要
  name: string

  //！ 这里定义了额外的属性，在下面需要赋值，否则会报错
  age: number
  height: number
  weight: number

  // 函数可以调用: 函数调用签名
  (num1: number): number
}







// 创建一个符合 IBar 接口的对象
const myBar: IBar = (function(num1: number): number {
  return num1 * 2;
}) as IBar;


// !函数调用签名中设置里变量，但是必须进行初始化
// 添加属性

//! 函数的name属性是只读的，不能设置    但是只会在运行时才会报错
/* 
报错信息：

Cannot assign to read only property 'name' of function '(num1) => {
    return 123;
}'

*/
// myBar.name = "MyFunction";     name 是只读的

myBar.age = 10;
myBar.height = 100;
myBar.weight = 50;
console.log(myBar, myBar.name)










// 或者使用 Object.assign
const myBar2: IBar = Object.assign(
  function(num1: number): number {
    return num1 + 10;
  },
  {
    // name: "AnotherFunction",     //name 是只读的
    age: 5,
    height: 200,
    weight: 30
  }
);
console.log(myBar2, myBar2.name)











// ！ 在 TypeScript 中，接口可以定义既包含属性又包含调用签名的结构，但是直接创建一个同时满足这种接口定义的实体对象是不可行的。
// ！ 这是因为函数和对象在 JavaScript（以及 TypeScript）中是不同的实体类型。
// ！ 如此写，不行啊！！！
// const myObject: IBar = {
//   name: "John",
//   age: 25,
//   height: 180,
//   weight: 70,

//   (num1: number): number {
//     return num1 * num1;
//   }
// };

export {}