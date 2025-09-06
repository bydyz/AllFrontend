// Array.from(arrayLike)
// Array.from(arrayLike, mapFn)
// Array.from(arrayLike, mapFn, thisArg)


// arrayLike
//   想要转换成数组的类数组或可迭代对象。

// mapFn 可选
//   调用数组每个元素的函数。如果提供，每个将要添加到数组中的值首先会传递给该函数，然后将 mapFn 的返回值增加到数组中。使用以下参数调用该函数：

//     element
//       数组当前正在处理的元素。

//     index
//       数组当前正在处理的元素的索引。

// thisArg 可选
//   执行 mapFn 时用作 this 的值。

// 返回值
//   浅拷贝一个新的数组实例。



console.log(Array.from("foo"));
// [ "f", "o", "o" ]



const set = new Set(["foo", "bar", "baz", "foo"]);
console.log(set)
console.log(Array.from(set));
// [ "foo", "bar", "baz" ]



function f() {
  console.log(arguments)
  return Array.from(arguments);
}
console.log(f(1, 2, 3));
// [ 1, 2, 3 ]