// 导入格式如下：require(X)

//! 1.根据路径导入自己编写模块  X是以 ./ 或 ../ 或 /（根目录）开头的
//   ◼ 第一步：将X当做一个文件在对应的目录下查找；
//      1.如果有后缀名，按照后缀名的格式查找对应的文件
//      2.如果没有后缀名，会按照如下顺序：
//       ✓ 1> 直接查找文件X
//       ✓ 2> 查找X.js文件
//       ✓ 3> 查找X.json文件
//       ✓ 4> 查找X.node文件
//   ◼ 第二步：没有找到对应的文件，将X作为一个目录
//      查找目录下面的index文件
//       ✓ 1> 查找X/index.js文件
//       ✓ 2> 查找X/index.json文件
//       ✓ 3> 查找X/index.node文件
//   ◼ 如果没有找到，那么报错：not found








//! 2.导入node提供给内置模块
// const path = require("path")
// const http = require("http")
// console.log(path, http)








// 3.情况三: 名称不是路径, 也不是一个内置模块，回到node_modules中查找
const why = require("why")
console.log(why.name)

// const axios = require("axios")
// console.log(axios)

console.log(this)