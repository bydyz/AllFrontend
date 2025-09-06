const fs = require("fs")
const path = require("path")

function readDirectory(dir) {
  fs.readdir(
    path.resolve(__dirname, dir),
    { withFileTypes: true },
    (err, files) => {
      console.log('11111111111111111111111111111111111111111111111111111111', files)
      
      files.forEach(item => {
        console.log("打印item", item)

        //!  isDirectory() 是 Node.js 文件系统模块中的方法，用于检查指定路径是否是一个目录。  是则返回true，否则返回false  如果出现错误（例如指定的路径不存在或无法访问），则会抛出异常或者在回调函数中返回错误对象。
        if(item.isDirectory()) {
          // !!!  递归调用
          readDirectory(`${dir}/${item.name}`)
        } else {
          console.log('item.name', item.name)
        }
      })

      console.log('')
    }
  )
}

readDirectory('../')