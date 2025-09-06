const fs = require("fs")
const path = require("path")

const state = fs.readFileSync(path.resolve(__dirname, "./foo.txt"), { encoding: 'utf-8' })

console.log(state)

console.log("证明它是同步的打印")