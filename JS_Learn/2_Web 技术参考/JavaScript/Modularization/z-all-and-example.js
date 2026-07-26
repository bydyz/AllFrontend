// CommonJs

// the first one
let name1 = 'rc'
exports.name = name

const {name} = require("")






// the second one
let name2 = 'rc'
let age2 = 25

module.exports.name2 = name2
module.exports.age2 = age2

const { name2, age2 } = require("") 






// the third one
let name3 = 'rc'
let age3 = 25

module.exports = {
  name3,
  age3
}

const { name3, age3} = require("")
or
const example = require("")














// ESModule.js


const name4 = "rc"
const age4 = 25
function sayHello4() {
  console.log("111")
}

export {
  name4,
  age4,
  sayHello4
}


export {
  name4 as name,
  age4,
  sayHello4
}

export const name5 = 'rc'


import {name4, age4, sayHello4} from ''

import {name4 as fname, age4 as fAge, sayHello4 as sayHello5} from ""

import * as example from ""




// 混用

// 似乎 * 是需要在混用时使用的
// export *

// 优化一:   export和import混用也可以用as
// export { formatCount, formatDate } from './format.js'
// export { parseLyric } from './parse.js'


// 优化二:   export和import混用可以用 * ，导出全部，此时不会展示变量名和函数名，不是很方便，因为导入时需要相应的名称
// export * from './format.js'
// export * from './parse.js'







// function parseLyric() {
//   return ["歌词"]
// }

// 1.默认导出
// export default parseLyric

// 2.定义标识符直接作为默认导出   没有定义函数名
export default function() {
  return ["新歌词"]
}

// export default function() {
//   return ["歌词"]
// }

// 注意事项: 一个模块只能有一个默认导出，但是可以有其他导出