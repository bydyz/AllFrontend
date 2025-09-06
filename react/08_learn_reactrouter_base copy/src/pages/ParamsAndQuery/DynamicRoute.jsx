import React, { PureComponent } from 'react';
import { withRouter } from '../../hoc';

export class NeedParam extends PureComponent {
  // 通过react提供的 useParams 这个hooks 拿传递过来的参数

  render() {
    const { dynamicParam } = this.props.router

    return (
      <div>
        <h1>NeedParam</h1>
        <h2>{dynamicParam.id}</h2>
      </div>
    )
  }
}

// !  似乎只要是 APP 内部用上withRouter后，此处再用，withRouter会执行两遍
// ！ 就算把要用withRouter的部分抽离出去也是一样
// !  似乎只要 父子路由上 都运用了某个hooks，实际在子路由中触发hooks时，会根据父子路由数，多次触发
export default withRouter(NeedParam)