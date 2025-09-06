import React, { PureComponent } from 'react'
import { connect } from "react-redux"

import About from './pages/About'
import Home from './pages/Home'
import Profile from './pages/Profile'

import "./style.css"

export class App extends PureComponent {
  render() {
    const { counter } = this.props

    return (
      <div>
        <h2>App Counter: {counter}</h2>
        <div className='pages'>
          <Home/>
          <Profile/>
          <About/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  // 此处的 第一个counter 指的是 counter模块
  counter: state.counter.counter
})

export default connect(mapStateToProps)(App)
