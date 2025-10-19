// 在 JavaScript 中，使用 "use strict"; 是为了启用严格模式（Strict Mode）。
// 严格模式是 ECMAScript 5 引入的一种更加严格的代码执行环境，它对一些容易出错的操作进行了限制，并引入了一些新的语法和错误处理机制。


// 启用严格模式的主要目的包括：
  // 消除一些不安全的操作： 严格模式禁止使用一些不安全的操作，例如使用 with 语句、禁止删除变量、禁止使用未声明的变量等，这有助于减少一些潜在的错误。
  // 提高代码可维护性： 严格模式强制执行一些更严格的语法规则，这可以帮助开发者编写更规范、更易读、更易维护的代码。
  // 提高性能： 有些优化只能在严格模式下生效，因此在一些情况下，严格模式下的代码可能会更快。


// 要使用严格模式，只需要在 JavaScript 文件或代码块的顶部添加 "use strict"; 即可：

// 如果是在函数内部使用，也可以将 "use strict"; 放在函数体的开头
  // function myFunction() {
  //   "use strict";

  //   // 在这里写你的代码
  // }



// exports.__esModule = true;
// string: TypeScript给我们定义标识符时, 提供的字符串类型
// String: JavaScript中字符串的包装类
var message = "Hello World";
message = "Hello TypeScript";
// message = true
console.log(message);
