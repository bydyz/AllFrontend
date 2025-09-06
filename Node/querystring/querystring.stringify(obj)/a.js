// querystring.stringify(obj)：将一个 JavaScript 对象转换成查询字符串。

// querystring.stringify(obj)

//！ 百分比编码
// 这个函数接受一个对象 obj 作为参数，返回一个查询字符串。对象的键和值会被转换成 key=value 的形式，并且键和值都会被进行百分比编码（percent-encode），以保证生成的字符串是有效的 URL 组件。

//！ URL编码
// querystring.stringify() 方法是 Node.js 的 querystring 模块提供的一个函数，用于将 JavaScript 对象转换成 URL 编码的查询字符串。这个方法对于构建 HTTP 请求的查询字符串部分非常有用。

// querystring.stringify(obj, [sep], [eq]);
//   obj：要转换为查询字符串的对象。
//   sep（可选）：键值对之间的分隔符，默认为 &。
//   eq（可选）：键和值之间的分隔符，默认为 =。

// 示例：

const querystring = require('querystring');

const obj = {
  name: 'John',
  age: 30,
  city: 'New York'
};

const queryString = querystring.stringify(obj);

console.log(queryString); // 输出: "name=John&age=30&city=New%20York"









//! 自定义分隔符和等号字符
// 如果你需要使用非标准的分隔符或等号字符，可以传递额外的 sep 和 eq 参数：

// const queryString = querystring.stringify(obj, ';', ':');
// console.log(queryString);

// // 输出: "name:John%20Doe;age:30;city:New%20York"









//! 嵌套对象和数组
// querystring.stringify() 也可以处理嵌套的对象和数组，但默认情况下可能不会按照你预期的方式工作。为了正确地处理这些复杂结构，你可能需要先手动转换它们为扁平对象：

// const obj = {
//   user: {
//     name: 'John Doe',
//     age: 30
//   },
//   hobbies: ['reading', 'swimming', 'traveling']
// };

//！ // 转换为扁平对象
// const flatObj = {
//   'user.name': obj.user.name,
//   'user.age': obj.user.age,
//   'hobbies[0]': obj.hobbies[0],
//   'hobbies[1]': obj.hobbies[1],
//   'hobbies[2]': obj.hobbies[2]
// };

// const queryString = querystring.stringify(flatObj);

// console.log(queryString);

// 输出: "user.name=John%20Doe&user.age=30&hobbies[0]=reading&hobbies[1]=swimming&hobbies[2]=traveling"

// 在这个例子中，我们首先将嵌套的对象和数组转换为一个扁平的对象，其中键表示路径。然后，我们使用 querystring.stringify() 方法来转换这个扁平对象。

// querystring.stringify() 方法是处理 HTTP 查询字符串的有用工具，特别是在开发 Web 应用程序和与 API 交互时。