// matchAll(regexp)

// 参数
//   regexp
//     一个正则表达式对象
//     是任何具有 Symbol.matchAll 方法的对象。

//   如果 regexp 不是一个 RegExp 对象，并且没有 Symbol.matchAll 方法，
//   它将通过 new RegExp(regexp, 'g') 被隐式转换为一个 RegExp 对象。

//   如果 regexp 是一个正则表达式，那么它必须设置了全局（g）标志，否则会抛出 TypeError 异常。

// 返回值
//   一个匹配结果的可迭代迭代器对象（它不可重新开始）。
//   每个匹配结果都是一个数组，其形状与 RegExp.prototype.exec() 的返回值相同。

// 异常
//   TypeError
//     如果 regexp 是一个正则表达式，且没有设置全局（g）标志（其 flags 属性不包含 "g"），则会抛出该异常。


const str = `
  Contact us at:
  - admin@example.com
  - support@help.org
  - sales@company.co.uk
`;

// 匹配邮箱，并用捕获组提取用户名和域名
const regex = /(\w+)@(\w+\.\w+(?:\.\w+)?)/g;

const matches = str.matchAll(regex);
console.log(matches)

for (const match of matches) {
  console.log("match的内容", match)
  console.log({
    full: match[0],        // 完整邮箱
    username: match[1],    // 用户名
    domain: match[2],      // 域名
    position: match.index,  // 在原文中的位置
    input: match.input,
    groups: match.groups
  });
}