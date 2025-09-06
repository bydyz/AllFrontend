import React, { PureComponent, useState } from 'react'

class HelloWord extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      message: "Hello World"
    }
  }

  changeText() {
    this.setState({ message: "你好啊, 李银河!" })
  }

  render() {
    const { message } = this.state

    return (
      <div>
        <h2>内容: {message}</h2>
        <button onClick={e => this.changeText()}>修改文本</button>
      </div>
    )
  }
}



function HelloWorld2(props) {
  let message = "Hello World"

  // 函数式组件存在的最大的缺陷:
  // 1.组件不会被重新渲染: 修改message之后, 组件知道自己要重新进行渲染吗? 
  // 2.如果页面重新渲染: 函数会被重新执行, 第二次重新执行时, 会重新给message赋值为hello world
  // 3.类似于生命周期的回调函数: 也是没有的

  console.log('11111111111111111111111111111111111111111111111111111111', message)
  return (
    <div>
      <h2>内容2: {message}</h2>
      <button onClick={e => message = "你好啊, 李银河!"}>修改文本</button>
    </div>
  )
}

// 在 React 中，组件的 UI 是由其 props 和 state 决定的。在函数式组件中，props 是不可变的，而 state 是可变的。在你的 HelloWorld2 组件中，message 是一个普通的 JavaScript 变量，而不是 React 组件的 state。

  // 当你在点击按钮时修改 message 的值，虽然 message 的值发生了改变，但这并不会触发 React 的重新渲染。因为 React 并不知道 message 的变化，也不会去监听这个普通变量的变化。

  // 为了让 React 知道 message 的变化并触发重新渲染，你应该将 message 存储在组件的状态中。这样，当你调用 setState 修改状态时，React 会知道状态发生了变化，并重新渲染组件。以下即是实例

function HelloWorld3(props) {
  // 使用 useState 定义 message 的状态
  const [message, setMessage] = useState("Hello World");

  console.log('message:', message);

  return (
    <div>
      <h2>内容2: {message}</h2>
      {/* 点击按钮时调用 setMessage 修改 message 的值 */}
      <button onClick={() => setMessage("你好啊, 李银河!")}>修改文本</button>
    </div>
  );
}

export class App extends PureComponent {
  render() {
    return (
      <div>
        <HelloWord/>
        <hr />
        <HelloWorld2/>
        <hr />
        <HelloWorld3/>
      </div>
    )
  }
}

export default App