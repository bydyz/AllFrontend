import React, { PureComponent } from 'react'
import Detail from './pages/Detail'

export class App extends PureComponent {

  UNSAFE_componentWillMount() {
    console.log("App的UNSAFE_componentWillMount执行了")
  }

  componentDidMount() {
    console.log("App的componentDidMount执行了")
  }

  render() {
    return (
      <div>
        <Detail/>
      </div>
    )
  }
}

export default App