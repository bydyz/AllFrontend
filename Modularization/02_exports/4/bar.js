// 在Node中每一个js文件都是一个单独的模块；


let name = "bar"

exports.name = name        //第一个name是exports中的属性，第二个name是本模块中的变量或函数

// 1.2s之后修改
setTimeout(() => {
  exports.name = "why"
}, 2000)
