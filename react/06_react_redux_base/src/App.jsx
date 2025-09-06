import React, { PureComponent } from 'react'

import "./style.css"

import store from "./store"

import Home from './pages/home'
import Profile from './pages/profile'

export class App extends PureComponent {
  constructor() {
    super()

    this.state = {
      counter: store.getState().counter
    }
  }

  componentDidMount() {
    store.subscribe(() => {
      const state = store.getState().counter
      this.setState({ counter: state })
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
        </div>
      </div>
    )
  }
}

export default App
