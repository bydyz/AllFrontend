// new Function(functionBody)
// new Function(arg0, functionBody)
// new Function(arg0, arg1, functionBody)
// new Function(arg0, arg1, /* …, */ argN, functionBody)

// Function(functionBody)
// Function(arg0, functionBody)
// Function(arg0, arg1, functionBody)
// Function(arg0, arg1, /* …, */ argN, functionBody)


// 调用 Function() 时可以使用或不使用 new。两者都会创建一个新的 Function 实例。


  // 参数
  //   argN 可选
  //     每个名称都必须是字符串，对应于一个有效的 JavaScript 参数（任何一个普通的标识符、剩余参数或解构参数，可选择使用默认参数），或用逗号分隔的此类字符串的列表。

  //     由于参数的解析方式与函数表达式的解析方式相同，所以接受空白和注释。例如："x", "theValue = 42", "[a, b] /* numbers */" 或 "x, theValue = 42, [a, b] /* numbers */"。（"x, theValue = 42", "[a, b]" 也是正确的，虽然有些难以阅读。）

  //   functionBody
  //     一个包含构成函数定义的 JavaScript 语句的字符串。




  
// 此示例可在你的 JavaScript 控制台下运行

// 创建一个接受两个参数的函数，并返回这些参数的和
const adder = new Function("a", "b", "return a + b");

// 调用函数
console.log(adder(2, 6));
// 8