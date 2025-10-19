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

// 添加属性
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



export {}