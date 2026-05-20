const ContentType = require('./ContentType.json') 
// console.log(ContentType)
// console.log()
// console.log(ContentType.aas)
// console.log()
// console.log(ContentType['aas'])
// console.log()

const path = require('path')

const GetContentType = url => ContentType[path.extname(url).slice(1)]
console.log(path.extname('a.pdf'))
/* 
path.extname() 方法返回 path 的扩展名，即 path 的最后一部分中从最后一次出现的 .（句点）字符到字符串的结尾。 如果 path 的最后一部分中没有 .，或者除了 path 的基本名称（参见 path.basename()）的第一个字符之外没有 . 个字符，则返回空字符串。

path.extname('index.html');
// 返回: '.html'

path.extname('index.coffee.md');
// 返回: '.md'

path.extname('index.');
// 返回: '.'

path.extname('index');
// 返回: ''

path.extname('.index');
// 返回: ''

path.extname('.index.md');
// 返回: '.md'
如果 path 不是字符串，则抛出 TypeError。
*/
let accept = '.ppt, .pptx, .doc, .docx, .pdf'

console.log(accept.split(', ').map(item => GetContentType('a' + item)))