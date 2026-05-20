// 在Node中每一个js文件都是一个单独的模块；

console.log("bar的最上面")

let name = "bar"
exports.name = name        //第一个name是exports中的属性，第二个name是本模块中的变量或函数

console.log("bar的最下面")



// 注意：exports是一个对象，我们可以在这个对象中添加很多个属性，添加的属性会导出；