// 导入后导出

// 方式一
import { formatCount, formatDate } from './format.js'
import { parseLyric } from './parse.js'

export {
  formatCount,
  formatDate,
  parseLyric
}





// 方式二
// 优化一:   export和import混用也可以用as
// export { formatCount, formatDate } from './format.js'
// export { parseLyric } from './parse.js'





// 方式三
// 优化二:   export和import混用可以用 * ，导出全部，此时不会展示变量名和函数名，不是很方便，因为导入时需要相应的名称
// export * from './format.js'
// export * from './parse.js'



//！ 似乎export用 * 时是需要在混用时使用的
// export *