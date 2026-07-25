import './testToTest'

// 直接改此处代码等同于改入口代码，都没有热更新功能，会发生浏览器更新
console.log("testToIndexJs执行了！！！！！")

if(module.hot) {
  module.hot.accept('./testToTest.js', () => {
    console.log("更新了！！！")
  })
}