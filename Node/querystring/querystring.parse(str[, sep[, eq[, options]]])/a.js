// querystring.parse(str[, sep[, eq[, options]]])：将一个查询字符串转换成一个 JavaScript 对象。


// querystring.parse(str, [sep], [eq], [options]);
//   str：要解析的查询字符串。
//   sep（可选）：键值对之间的分隔符，默认为 &。
//   eq（可选）：键和值之间的分隔符，默认为 =。
//   options（可选）：一个对象，包含以下可选属性：
//     decodeURIComponent：一个函数，用于将键和值从百分比编码转换为字符串，默认为 querystring.unescape。
//     maxKeys：一个数字，用于限制解析的键的数量，默认为 1000。


// 示例：

const querystring = require('querystring');

//! 由于 %20 是空格的 URL 编码，querystring.parse() 方法自动将其解码为一个空格。
const queryString = "name=John&age=30&city=New%20York";

const obj = querystring.parse(queryString);

console.log(obj);
// 输出: { name: 'John', age: '30', city: 'New York' }






//! 自定义分隔符和等号字符
// 如果你的查询字符串使用了非标准的分隔符或等号字符，你可以通过 sep 和 eq 参数来指定它们：

// const queryString = "name;John,age;30,city;New%20York";
// const obj = querystring.parse(queryString, ';', ',');

// console.log(obj);
// 输出: { name: 'John', age: '30', city: 'New York' }





//! 使用 decodeURIComponent
// 如果你想要使用不同的函数来解码 URL 编码的字符，可以传递一个 options 对象：

// const queryString = "name=John&age=30&city=New%20York";
// const customUnescape = (str) => Buffer.from(str, 'hex').toString('utf8');
// const obj = querystring.parse(queryString, null, null, { decodeURIComponent: customUnescape });

// console.log(obj);
// // 输出: { name: 'John', age: '30', city: 'New York' }
// 在这个例子中，我们传递了一个自定义的解码函数 customUnescape 作为 options 对象的一部分。







//! 如果解析的键的数量大于 maxKeys 设置的值，querystring.parse() 方法将抛出一个 RangeError 异常。这是为了防止潜在的拒绝服务（DoS）攻击，因为在某些情况下，攻击者可能会发送包含大量键的查询字符串，导致服务器消耗过多资源进行解析。通过使用 maxKeys，你可以更好地控制应用程序的安全性和稳定性，防止不必要的资源消耗。