// 普通字符串中的转义字符
console.log('Hello\nWorld'); 
// 输出:
// Hello
// World

// String.raw 中的转义字符
console.log(String.raw`Hello\nWorld`); 
// 输出: Hello\nWorld

// 对比其他转义字符
console.log('Tab:\tHere'); // Tab:    Here
console.log(String.raw`Tab:\tHere`); // Tab:\tHere

console.log('Backslash: \\'); // Backslash: \
console.log(String.raw`Backslash: \\`); // Backslash: \\