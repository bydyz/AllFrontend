import React, { Component } from 'react'
import Header from './c-cpns/Header'
import Footer from './c-cpns/Footer'
import Main from './c-cpns/Main'

// 此处多一个  export   ，    使用时多一个导入
export class App extends Component {
  render() {
    return (
      <div className='app'>
        <Header/>
        <Main/>
        <Footer/>
      </div>
    )
  }
}

// 注意，此不可略
export default App