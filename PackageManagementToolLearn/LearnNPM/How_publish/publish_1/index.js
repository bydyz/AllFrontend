#!/usr/bin/env node   //加上 bin 字段后需加此，表示解析js的是node
function main() {
  console.log('Hello World!')
}

console.log('main函数执行了！！！')

export default main

export function hello(name) {
  console.log(`Hello ${name}`)
}