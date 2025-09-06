import React, { PureComponent } from 'react'

import "./style.css"

import store from "./store"

import Home from './pages/home'
import Profile from './pages/profile'
import About from './pages/about'
import Category from './pages/category'

export class App extends PureComponent {
  constructor() {
    super()

    // 因为有使用 combineReducers 将各个 reducer 合并到了一起，故 store.getState() 和 state的变量之间多了一层，即是 传入combineReducers的key
    this.state = {
      counter: store.getState().counter.counter
    }
  }

  componentDidMount() {
    store.subscribe(() => {
      const state = store.getState().counter
      this.setState({ counter: state.counter })
    })
  }

  render() {
    const { counter } = this.state

    return (
      <div>
        <h2>App Counter: {counter}</h2>

        <div className='pages'>
          <Home/>
          <Profile/>
          <About/>
          <Category/>
        </div>
      </div>
    )
  }
}

export default App
