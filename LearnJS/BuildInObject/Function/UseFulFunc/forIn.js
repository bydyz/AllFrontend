// forIn

// 语法：

// ​ for(let 变量 in 对象){

// ​ 语句…

// ​ }

// for ... in语句，对象中有几个属性，循环体就会执行几次每次执行时，会将对象中的一个属性的名字赋值给变量







var obj = {
  name:"海康",
  age:23,
  sex:"男",
  address:"湛江海康",
};
/**
 * 枚举对象的语法：
 * for(变量 in 对象名){
 *     语句...
 * }
 */

for (const objKey in obj) {
  console.log("对象属性名:"+objKey);
  console.log("对象属性值:"+obj[objKey]);
  console.log()
}