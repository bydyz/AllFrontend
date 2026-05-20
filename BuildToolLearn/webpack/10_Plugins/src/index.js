import {sum} from "utils/math"

console.log("Hello World")

console.log(sum(20, 30))


const bar = () => {
  console.log("bar function execution!")
}

bar()


console.log(BASE_URL)
console.log(VERSION)
console.log(MY_NAME)
console.log(__VUE_OPTIONS_API__)
console.log(__VUE_PROD_DEVTOOLS__)


// DefinePlugin 默认注入的变量
console.log(process.env.NODE_ENV)