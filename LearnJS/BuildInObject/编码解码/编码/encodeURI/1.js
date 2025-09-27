// encodeURI() 函数通过将特定字符的每个实例替换为一个、两个、三或四转义序列来对统一资源标识符 (URI) 进行编码。


// encodeURI(URI)

// 参数
//   URI
//     一个完整的 URI。

// 返回值
//   一个新字符串，表示提供的字符串编码为统一资源标识符 (URI)。


// 保留不编码的字符：A-Z a-z 0-9 ; , / ? : @ & = + $ - _ . ! ~ * ' ( ) #

console.log(encodeURI('{'))
console.log(encodeURI('}'))
console.log(encodeURI('|'))
console.log(encodeURI('\\'))
console.log(encodeURI('^'))
console.log(encodeURI('['))
console.log(encodeURI(']'))


// U+013D
console.log(encodeURI('Ľ'))   // %C4%BD