import React, { PureComponent } from 'react'
import { SwitchTransition, CSSTransition } from 'react-transition-group'
import "./style.css"

export class App extends PureComponent {
  constructor() {
    super() 

    this.state = {
      isLogin: true
    }
  }

  render() {
    const { isLogin } = this.state

    return (
      <div>
        <SwitchTransition mode='out-in'>
          <CSSTransition
            // 这里的key的作用尚未清楚？？？？？？？？
            key={isLogin ? "exit": "login"}
            classNames="login"
            timeout={5000}
          >
            <button onClick={e => this.setState({ isLogin: !isLogin })}>
              { isLogin ? "退出": "登录" }
            </button>
          </CSSTransition>
        </SwitchTransition>

{/* 
        ◼ SwitchTransition可以完成两个组件之间切换的炫酷动画：
           比如我们有一个按钮需要在on和off之间切换，我们希望看到on先从左侧退出，off再从右侧进入；
           这个动画在vue中被称之为 vue transition modes；
           react-transition-group中使用SwitchTransition来实现该动画；
        ◼ SwitchTransition中主要有一个属性：mode，有两个值
           in-out：表示新组件先进入，旧组件再移除；
           out-in：表示就组件先移除，新组建再进入；
        ◼ 如何使用SwitchTransition呢？
           SwitchTransition组件里面要有CSSTransition或者Transition组件，不能直接包裹你想要切换的组件；
           SwitchTransition里面的CSSTransition或Transition组件不再像以前那样接受in属性来判断元素是何种状态，取而代之的是key属性；


        key 属性在这里的作用是告诉 React Transition Group 在两个状态（"exit" 和 "login"）之间进行切换时，如何对应生成动画效果。当你点击按钮触发状态切换时，React Transition Group 会根据 key 的变化，决定是应用 "exit" 的动画还是 "login" 的动画。
 */}
      </div>
    )
  }
}

export default App