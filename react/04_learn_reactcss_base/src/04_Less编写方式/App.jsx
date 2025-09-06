import React, { PureComponent } from 'react'
// less写的样式并不会生效，因为webpack 不会解析，因为没有loader，
// 处理方式：通过安装 craco 来配置webpack，感觉有点类似vue.config.js的作用

/* 

1.npm install @craco/cracro

*/
import "./App.less"

export class App extends PureComponent {
  render() {
    return (
      <div className='app'>
        <div className='section'>
          <h2 className='title'>我是标题</h2>
          <p className='content'>我是内容, 哈哈哈</p>
        </div>
      </div>
    )
  }
}

export default App
