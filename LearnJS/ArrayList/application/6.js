const str = 'hello';
str[0] = 'H'; // 这不会改变原始字符串
console.log(str); // 仍然是 'hello'（字符串是不可变的）

// 要修改字符串，需要创建新字符串
const newStr = 'H' + str.slice(1);