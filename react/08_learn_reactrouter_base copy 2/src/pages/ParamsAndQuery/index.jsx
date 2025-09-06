import React, { PureComponent } from 'react'

import { Link, Outlet } from 'react-router-dom'

import { withRouter } from '../../hoc';

export class ParamsAndQuery extends PureComponent {

  navigateTo() {
    const { navigate } = this.props.router
    navigate('/paramsAndQuery/dynamicRoute/66')
  }

  render() {
    return (
      <div>
        <h1>ParamsAndQuery Page</h1>

        <div>
          <button onClick={e => this.navigateTo()}>dynamicRoute</button>

          <Link to="/paramsAndQuery/queryRoute?name=rc&age=26">queryRoute</Link>
        </div>
        
        {/* 占位的组件 */}
        <Outlet/>
      </div>
    )
  }
}


export default withRouter(ParamsAndQuery)