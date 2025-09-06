import React, { Component } from 'react'
import ThemeContext from './context/theme-context'

export class Profile extends Component {
  render() {
    //! Profile组件外没有  ThemeContext  包裹，此处的context取默认值
    console.log('Profile里面的context', this.context)

    return (
      <div>Profile</div>
    )
  }
}

Profile.contextType = ThemeContext

export default Profile