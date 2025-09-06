import React, { PureComponent, createRef, forwardRef } from 'react'


// forwardRef  可以帮助获取函数式组件内部的dom

// ◼ 函数式组件是没有实例的，所以无法通过ref获取他们的实例：
//    但是某些时候，我们可能想要获取函数式组件中的某个DOM元素；
//    这个时候我们可以通过 React.forwardRef ，后面我们也会学习 hooks 中如何使用ref；

const HelloWorld = forwardRef(function(props, ref) {
  return (
    <div>
      <h1 ref={ref}>Hello World</h1>
      <p>哈哈哈</p>
    </div>
  )
})


export class App extends PureComponent {
  constructor() {
    super()

    this.hwRef = createRef()
  }

  getComponent() {
    console.log(this.hwRef.current)
  }

  render() {
    return (
      <div>
        <HelloWorld ref={this.hwRef}/>
        <button onClick={e => this.getComponent()}>获取组件实例</button>
      </div>
    )
  }
}

export default App