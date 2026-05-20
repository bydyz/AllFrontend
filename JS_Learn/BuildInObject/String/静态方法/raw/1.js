// https://www.yuque.com/u51716160/gn8srq/pnh0t3s47t1za18h

// String.raw(strings, ...substitutions)

// String.raw`templateString`


// 参数
//   strings
//    格式正确的模板字符串数组对象，例如 { raw: ['foo', 'bar', 'baz'] }，
//    应该是一个具有 raw 属性的对象，其值是一个类数组的字符串对象。

//   ...substitutions
//    包含的替换表达式对应的值。

//   templateString
//    一个模板字符串，可以包含替换表达式（${...}）。

// 返回值
//   给定模板字符串的原始字符串。

// 异常
//   TypeError
//   如果第一个参数没有 raw 属性，或者 raw 属性的值为 undefined 或 null，则会抛出异常。



// String.raw() 静态方法是模板字符串的标签函数。它用于获取模板字符串的原始字符串形式——即，替换表达式（例如 ${foo}）会被替换处理，但转义序列（例如 \n）不会被处理。




// Windows 文件路径
const windowsPath = String.raw`C:\Users\John\Documents\file.txt`;
console.log(windowsPath); // C:\Users\John\Documents\file.txt

// 普通字符串会转义
const badPath = 'C:\Users\John\Documents\file.txt';
console.log(badPath); // C:UsersJohnDocumentsfile.txt (错误!)

// Linux/Mac 路径
const unixPath = String.raw`/home/user/docs/file.txt`;
console.log(unixPath); // /home/user/docs/file.txt