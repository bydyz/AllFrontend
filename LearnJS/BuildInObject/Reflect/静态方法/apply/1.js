// Reflect.apply(target, thisArgument, argumentsList)

// target
//   目标函数。

// thisArgument
//   target 函数调用时绑定的 this 对象。

// argumentsList
//   target 函数调用时传入的实参列表，该参数应该是一个类数组的对象。



// Reflect.apply() 通过指定的参数列表发起对目标 (target) 函数的调用。


console.log(Reflect.apply(Math.floor, undefined, [1.75]));
// Expected output: 1

console.log(
  Reflect.apply(String.fromCharCode, undefined, [104, 101, 108, 108, 111]),
);
// Expected output: "hello"

console.log(
  Reflect.apply(RegExp.prototype.exec, /ab/, ["confabulation"]).index,
);
// Expected output: 4

console.log(Reflect.apply("".charAt, "ponies", [3]));
// Expected output: "i"