import {sum} from "./utils/math"

const message = "Hello, World"
console.log(message)
console.log(sum(100, message.length))


console.log(sum(20, 30))
console.log(sum(20, 100))


// 对默认浏览器的适配情况下，不会对 箭头函数 进行装换
const bar = () => {
  console.log("bar function execution!")
}

bar()
bar()


// 对默认浏览器的适配情况下，不会对 includes 打补丁
const EnName = 'Avery'
console.log(EnName.includes('Av'))