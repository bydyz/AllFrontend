const path = require('path')

const filepath = 'C://rc/age24/height170/aaa.text'



console.log(__dirname)                            // d:\allProject\Mine\why-vue3\Node\Path模块

console.log(path.resolve(__dirname, '/'))         // d:\
console.log(path.resolve(__dirname, '../'))       // d:\allProject\Mine\why-vue3\Node
console.log(path.resolve(__dirname, '../fs'))     // d:\allProject\Mine\why-vue3\Node\fs


// 1.从路径中获取信息
console.log(path.dirname(filepath))         //  C://rc/age24/height170
console.log(path.basename(filepath))        //  aaa.text
console.log(path.extname(filepath))         //  .text



// 2.路径的拼接   
const path1 = "/abc/cba"
const path2 = "../nba/abc.txt/"

// path.join(path1, path2, ...)  将后面的路径添加到前面，后面的操作符是针对于前面的操作符而言的
console.log(path.join(path1, path2))      //  \abc\nba\abc.txt\



// path.resolve 将多个路径拼接在一起，最终返回一个绝对路径
// 给定的路径的序列是从右往左被处理的，后面每个 path 被依次解析，直到构造完成一个绝对路径才停止
// 如果在处理完所有给定path的段之后，还没有生成绝对路径，则使用当前工作目录

// 从右往左处理，即从  /abc.text  开始处理，因为有  /  故已经是绝对路径了，然后放到当前所在盘下
console.log(path.resolve("./abc/cba", "./rc/rcc", "/abc.text"))   //  D:\abc.text

// 在处理完所有给定path的段之后，还没有生成绝对路径，则使用当前工作目录  d:\allProject\Mine\why-vue3
console.log(path.resolve("./abc/cba", "./rc/rcc", "./abc.text"))   //  d:\allProject\Mine\why-vue3\abc\cba\rc\rcc\abc.text

// 生成的路径被规范化并删除尾部斜杠，零长度path段被忽略；
console.log(path.resolve("./abc/cba", "", "./rc/rcc", "./abc.text/"))   //  d:\allProject\Mine\why-vue3\abc\cba\rc\rcc\abc.text

// 如果没有path传递段，path.resolve()将返回当前工作目录的绝对路径
console.log(path.resolve())     //  d:\allProject\Mine\why-vue3



const filepath2 = 'C://rc/age24/height170/aaa'
console.log(path.extname(filepath2))   // 返回''
console.log()
console.log(null)
console.log(undefined)
console.log('')