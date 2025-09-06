import React, { createRef, PureComponent } from 'react'
import { CSSTransition } from "react-transition-group"
import "./style.css"

export class App extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      isShow: true
    }

    this.sectionRef = createRef()
  }

  render() {
    const { isShow } = this.state

    return (
      <div>
        <button onClick={e => this.setState({isShow: !isShow})}>切换</button>
        {/* { isShow && <h2>哈哈哈</h2> } */}

        <CSSTransition 
          nodeRef={this.sectionRef}
          in={isShow} 
          unmountOnExit={true} 
          classNames="why" 
          timeout={200000}
          // appear
          onEnter={e => console.log("开始进入动画")}
          onEntering={e => console.log("执行进入动画")}
          onEntered={e => console.log("执行进入结束")}
          onExit={e => console.log("开始离开动画")}
          onExiting={e => console.log("执行离开动画")}
          onExited={e => console.log("执行离开结束")}
        >
          <div className='section' ref={this.sectionRef}>
            <h2>哈哈哈</h2>
            <p>我是内容, 哈哈哈</p>
          </div>
        </CSSTransition>

        {/* 
        ◼ CSSTransition是基于Transition组件构建的：
        ◼ CSSTransition执行过程中，有三个状态：appear、enter、exit；
        ◼ 它们有三种状态，需要定义对应的CSS样式：
           第一类，开始状态：对于的类是-appear、-enter、exit；
           第二类：执行动画：对应的类是-appear-active、-enter-active、-exit-active；
           第三类：执行结束：对应的类是-appear-done、-enter-done、-exit-done；
        ◼ CSSTransition常见对应的属性：
        ◼ in：触发进入或者退出状态
           如果添加了unmountOnExit={true}，那么该组件会在执行退出动画结束后被移除掉；
           当in为true时，触发进入状态，会添加-enter、-enter-acitve的class开始执行动画，当动画执行结束后，会移除两个class，并且添加-enter-done的class；
           当in为false时，触发退出状态，会添加-exit、-exit-active的class开始执行动画，当动画执行结束后，会移除两个class，并且添加-enter-done的class； 

        ◼ classNames：动画class的名称
           决定了在编写css时，对应的class名称：比如card-enter、card-enter-active、card-enter-done；
        ◼ timeout：
           过渡动画的时间
        ◼ appear：
           是否在初次进入添加动画（需要和in同时为true）
        ◼ unmountOnExit：退出后卸载组件
        ◼ 其他属性可以参考官网来学习：
           https://reactcommunity.org/react-transition-group/transition
        ◼ CSSTransition对应的钩子函数：主要为了检测动画的执行过程，来完成一些JavaScript的操作
           onEnter：在进入动画之前被触发；
           onEntering：在应用进入动画时被触发；
           onEntered：在应用进入动画结束后被触发；
        */}
      </div>
    )
  }
}

export default App