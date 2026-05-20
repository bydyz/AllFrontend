// 1.一般导出:
// // 1.1. 定义函数
// function parseLyric() {
//   return ["歌词"]
// }

// const name = "aaaa"

// // export {
// //   parseLyric,
// //   name
// // }









// 2.定义标识符直接作为默认导出   没有定义函数名
export default function() {
  return ["新歌词"]
}

// 注意事项: 一个模块只能有一个默认导出，但可以有其他导出

export const name = 'aaaaa'
