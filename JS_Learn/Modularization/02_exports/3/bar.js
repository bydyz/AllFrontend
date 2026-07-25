// 在Node中每一个js文件都是一个单独的模块；


let name = "bar"

exports.name = name        //第一个name是exports中的属性，第二个name是本模块中的变量或函数

// 2.4s之后获取
setTimeout(() => {
  console.log(exports.name)
}, 4000)
