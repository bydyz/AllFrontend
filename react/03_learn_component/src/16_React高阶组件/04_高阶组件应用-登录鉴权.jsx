import React, { PureComponent } from 'react'
import Cart from './pages/Cart'

export class App extends PureComponent {
  constructor() {
    super()

    this.state = {
      isLogin: false
    }
  }

  loginClick() {
    localStorage.setItem("token", "coderwhy")

    // 方式一: 通过管理组件的状态或者属性来触发更新
    this.setState({ isLogin: true })

    // 方式一: 强制更新
    // this.forceUpdate()

    // forceUpdate 是 React 中的一个方法，用于强制组件重新渲染。在 React 的正常数据流中，组件的状态或者属性发生变化时，React 会自动触发组件的重新渲染。然而，有时候可能需要手动强制组件进行重新渲染，而 forceUpdate 就提供了这样的功能。

    // 需要注意的是，一般情况下，不推荐频繁使用 forceUpdate，因为它打破了 React 的声明式更新模型，可能导致一些不可预测的行为。在大多数情况下，更推荐通过管理组件的状态或者属性来触发更新，以保持 React 的一致性和可维护性。
  }

  render() {
    return (
      <div>
        App
        <button onClick={e => this.loginClick()}>登录</button>
        
        <Cart/>
      </div>
    )
  }
}

export default App