import React, { PureComponent, StrictMode } from 'react'
import { findDOMNode } from "react-dom"
import Home from './pages/Home'
import Profile from './pages/Profile'

export class App extends PureComponent {

  componentDidMount() {

    // 不够安全，容易出bug，未来可能会被废弃
    // 使用 findDOMNode 获取组件底层的 DOM 节点
    const node = findDOMNode(this);
    // 对底层 DOM 节点进行操作
    if (node) {
      node.style.color = "red";
    }
  }

  render() {
    return (
      <div className='appDiv'>
        {/* 
        ◼ StrictMode 是一个用来突出显示应用程序中潜在问题的工具：
           与 Fragment 一样，StrictMode 不会渲染任何可见的 UI；
           它为其后代元素触发额外的检查和警告；
           严格模式检查仅在开发模式下运行；它们不会影响生产构建；
        ◼ 可以为应用程序的任何部分启用严格模式：
           不会对 Header 和 Footer 组件运行严格模式检查；
           但是，StrictMode包裹的组件 以及它们的所有后代元素都将进行检查； 
          
          
          
          到底检测什么呢？
            ◼ 1.识别不安全的生命周期：
            ◼ 2.使用过时的ref API
            ◼ 3.检查意外的副作用
               这个组件的constructor会被调用两次；
               这是严格模式下故意进行的操作，让你来查看在这里写的一些逻辑代码被调用多次时，是否会产生一些副作用；
               在生产环境中，是不会被调用两次的；
            ◼ 4.使用废弃的findDOMNode方法
               在之前的React API中，可以通过findDOMNode来获取DOM，不过已经不推荐使用了，可以自行学习演练一下
            ◼ 5.检测过时的context API
               早期的Context是通过static属性声明Context对象属性，通过getChildContext返回Context对象等方式来使用Context的；
               目前这种方式已经不推荐使用，大家可以自行学习了解一下它的用法；
          */}
          
        {/* <StrictMode> */}
          <Home/>
        {/* </StrictMode> */}
        <Profile/>
      </div>
    )
  }
}

export default App