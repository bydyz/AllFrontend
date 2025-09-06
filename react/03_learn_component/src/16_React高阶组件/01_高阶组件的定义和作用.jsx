import React, { PureComponent } from 'react'

// 定义一个高阶组件
function hoc(Cpn) {
  // 1.定义类组件
  class NewCpn extends PureComponent {
    render() {
      // 给 Cpn 传入了一个name属性，其值为 why
      //! 在 Cpn 组件内部，你可以通过 this.props.name 来访问这个属性
      //! 在 React 中，DOM 元素的类名应该使用 className 而不是 class 属性。如果 Cpn 是一个普通的 DOM 元素，那么这个类名就会被应用到该元素上。
      return <Cpn name="why" className="whatFuck"/>
    }
  }
  return NewCpn
}

class HelloWorld extends PureComponent {
  render() {
    //! 会打印两遍  第一次是空，第二次是 { name: "why", className: "whatFuck"}
    console.log("props", this.props)
    return <h1>Hello World</h1>
  }
}

const HelloWorldHOC = hoc(HelloWorld)

//! 三层   App > NewCpn > HelloWorld

export class App extends PureComponent {
  render() {
    return (
      <div>
        <HelloWorldHOC/>
      </div>
    )
  }
}

export default App