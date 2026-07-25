// 在Node中每一个js文件都是一个单独的模块；


const UTIL_NAME = "util_name"

function formatCount() {
  return "200万"
}

function formatDate() {
  return "2022-10-10"
}

console.log(exports) // {}

exports.UTIL_NAME = UTIL_NAME
exports.formatCount = formatCount
exports.formatDate = formatDate

