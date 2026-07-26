// for...of 语句执行一个循环，该循环处理来自可迭代对象的值序列。可迭代对象包括内置对象的实例，例如 Array、String、TypedArray、Map、Set、NodeList（以及其他 DOM 集合），还包括 arguments 对象、由生成器函数生成的生成器，以及用户定义的可迭代对象。


const array = [1, 2, 3];
for (const item of array) {
  console.log(item); // 1, 2, 3
}



const str = "hello";
for (const char of str) {
  console.log(char); // 'h', 'e', 'l', 'l', 'o'
}



const map = new Map([['a', 1], ['b', 2]]);
for (const [key, value] of map) {
  console.log(key, value); // 'a' 1, 'b' 2
}



const set = new Set([1, 2, 3]);
for (const value of set) {
  console.log(value); // 1, 2, 3
}



const typedArray = new Uint8Array([1, 2, 3]);
for (const value of typedArray) {
  console.log(value); // 1, 2, 3
}



function test() {
  for (const arg of arguments) {
    console.log(arg);
  }
}
test(1, 2, 3); // 1, 2, 3