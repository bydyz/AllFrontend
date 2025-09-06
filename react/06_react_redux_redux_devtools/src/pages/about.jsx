import React, { PureComponent } from 'react'
import { connect } from "react-redux"
// import store from "../store"
import { addNumberAction, subNumberAction } from '../store/actionCreators'

export class About extends PureComponent {

  calcNumber(num, isAdd) {
    if (isAdd) {
      console.log("加", num)
      this.props.addNumber(num)
    } else {
      console.log("减", num)
      this.props.subNumber(num)
    }
  }

  render() {
    const { counter, banners, recommends } = this.props

    return (
      <div>
        <h2>About Page: {counter}</h2>
        <div>
          <button onClick={e => this.calcNumber(6, true)}>+6</button>
          <button onClick={e => this.calcNumber(88, true)}>+88</button>
          <button onClick={e => this.calcNumber(6, false)}>-6</button>
          <button onClick={e => this.calcNumber(88, false)}>-88</button>
        </div>

        <div className='banner'>
          <h2>轮播图数据:</h2>
          <ul>
            {
              banners.map((item, index) => {
                return <li key={index}>{item.title}</li>
              })
            }
          </ul>
        </div>
        
        <div className='recommend'>
          <h2>推荐数据:</h2>
          <ul>
            {
              recommends.map((item, index) => {
                return <li key={index}>{item.title}</li>
              })
            }
          </ul>
        </div>
      </div>
    )
  }
}

// connect()返回值是一个高阶组件，需要传入函数，以告知state的那些内容和About组件映射

// 此处的state就是store中的state，然后上面 About 组件就可以通过 this.props.counter 使用了
const mapStateToProps = (state) => ({
  counter: state.counter,
  banners: state.banners,
  recommends: state.recommends
})

// 此处的dispatch就是store中的需要的dispatch，然后上面 About 组件就可以通过 this.props.addNumber(num) 使用了
const mapDispatchToProps = (dispatch) => ({
  addNumber(num) {
    dispatch(addNumberAction(num))
  },
  subNumber(num) {
    dispatch(subNumberAction(num))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(About)
