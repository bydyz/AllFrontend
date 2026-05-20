function example() {
    console.log(arguments);        // [Arguments] { '0': 1, '1': 2, '2': 3 }
    console.log(arguments.length); // 3
    console.log(arguments[0]);     // 1
    console.log(Array.isArray(arguments)); // false
}
example(1, 2, 3);





// 不能直接在类数组对象上调用数组方法。但你可以通过 Function.prototype.call() 间接调用它们。
function printArguments() {
  Array.prototype.forEach.call(arguments, (item) => {
    console.log(item);
  });
}

// 数组原型方法也可以用于字符串，因为它们以类似于数组的方式提供对其中字符的顺序访问
Array.prototype.forEach.call("a string", (chr) => {
  console.log(chr);
});