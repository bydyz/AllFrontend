const fs = require("fs")
const path = require("path")

fs.readdir(
  path.resolve(__dirname),
  { withFileTypes: true },
  (err, files) => {
    console.log(files)
  }
)

fs.readdir(
  path.resolve(__dirname, '../../FOperateFolder'),
  { withFileTypes: true },
  (err, files) => {
    console.log(files)
  }
)