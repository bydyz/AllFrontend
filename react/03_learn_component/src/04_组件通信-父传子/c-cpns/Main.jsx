import React, { Component } from 'react'
import axios from "axios"

import MainBanner from './MainBanner'
import MainProductList from './MainProductList'

export class Main extends Component {
  constructor() {
    super()

    this.state = {
      banners: [],
      productList: []
    }
  }

  // React内部为了告诉我们当前处于哪些阶段，会对我们组件内部实现的某些函数进行回调，这些函数就是生命周期函数：
    //  比如实现componentDidMount函数：组件已经挂载到DOM上时，就会回调；
    //  比如实现componentDidUpdate函数：组件已经发生了更新时，就会回调；
    //  比如实现componentWillUnmount函数：组件即将被移除时，就会回调；

  componentDidMount() {
    axios.get("http://123.207.32.32:8000/home/multidata").then(res => {
      const banners = res.data.data.banner.list
      const recommend = res.data.data.recommend.list
      this.setState({
        // banners: banners
        banners,
        
        productList: recommend
      })
    })
  }

  render() {
    const { banners, productList } = this.state

    return (
      <div className='main'>
        <div>Main</div>
        <MainBanner banners={banners} title="轮播图"/>
        <MainBanner/>
        <MainProductList productList={productList}/>
      </div>
    )
  }
}

export default Main