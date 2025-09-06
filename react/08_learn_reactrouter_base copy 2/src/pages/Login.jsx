import React, { PureComponent } from 'react'
import { Navigate } from 'react-router-dom'

export class Login extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      isLogin: false
    }
  }
  
  login() {
    this.setState({ isLogin: true })
  }

  render() {
    const { isLogin } = this.state

    return (
      <div>
        <h1>Login Page</h1>
        {/* 在 Login 页面，只要出现了  <Navigate to="/home"/>   就会根据其 to 属性进行路由跳转 */}
        {!isLogin ? <button onClick={e => this.login()}>登录</button> : <Navigate to="/home"/>}
      </div>
    )
  }
}

export default Login