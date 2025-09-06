import React, { Component } from 'react'
import ThemeContext from './context/theme-context'
import UserContext from './context/user-context'

export class HomeInfo extends Component {
  render() {
    // 4.第四步操作: 获取数据, 并且使用数据
    console.log("HomeInfo里面用context", this.context)

    return (
      <div>
        {/* 使用 contextType */}
        <h2>HomeInfo: {this.context.color}</h2>

        {/* 使用  UserContext.Consumer*/}
        <UserContext.Consumer>
          {
            value => {
              return <h2>Info User: {value.nickname}</h2>
            }
          }
        </UserContext.Consumer>
      </div>
    )
  }
}

// 3.第三步操作: 设置组件的contextType为某一个Context
HomeInfo.contextType = ThemeContext

export default HomeInfo