const message = 'Hello polyfill'
console.log(message)
console.log(message.length)


// 对默认浏览器的适配情况下，不会对 箭头函数 进行装换
const foo = () => {
  console.log('foo function exec~')
}
foo()
foo()


const obj = { name: 'rc', age: 18 }
const { name, age } = obj
console.log(name, age)


// 对默认浏览器的适配情况下，不会对 includes 打补丁
const EnName = 'Avery'
console.log(EnName.includes('Av'))