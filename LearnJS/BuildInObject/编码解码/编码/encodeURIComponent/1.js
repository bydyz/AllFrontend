// encodeURIComponent(URI)

// 参数
//   URI
//     一个完整的 URI。

// 返回值
//   一个新字符串，表示提供的字符串编码为统一资源标识符 (URI)。

// 保留不编码的字符：A-Z a-z 0-9 - _ . ! ~ * ' ( )

console.log(encodeURIComponent('{'))
console.log(encodeURIComponent('}'))
console.log(encodeURIComponent('|'))
console.log(encodeURIComponent('\\'))
console.log(encodeURIComponent('^'))
console.log(encodeURIComponent('['))
console.log(encodeURIComponent(']'))


// U+013D
console.log(encodeURIComponent('Ľ'))   // %C4%BD