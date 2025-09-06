import React, { PureComponent } from 'react'

import { Link, Outlet, useNavigate } from 'react-router-dom'

export class Home extends PureComponent {
  navigateTo(path) {
    console.log(this.props.router)
    const { navigate } = this.props.router
    navigate(path)
  }

  render() {
    return (
      <div>
        <h1>Home Page</h1>

        <div>
          <Link to="/home/recommend">推荐</Link>

          <Link to="/home/ranking">排行</Link>

          <button onClick={e => this.navigateTo('/home/ranking')}>排行</button>
        </div>
        
        {/* 占位的组件 */}
        <Outlet/>
      </div>
    )
  }
}


//！ 通过给类组件添加一个增强函数，创建高阶组件，向类组件中添加 useNavigate 中的 navigate 方法，如此类组件中即可使用hooks
function withRouter(WrapperComponent) {
  return function(props) {
    const navigate = useNavigate()
    const router = { navigate }

    return <WrapperComponent { ...props } router={router}/>
  }
}

export default withRouter(Home)