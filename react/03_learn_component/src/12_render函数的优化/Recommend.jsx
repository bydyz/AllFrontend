import React, { PureComponent } from 'react'

export class Recommend extends PureComponent {

  // ◼ React给我们提供了一个生命周期方法 shouldComponentUpdate（很多时候，我们简称为SCU），这个方法接受参数，并且需要有返回值：
  // ◼ 该方法有两个参数：
  //    参数一：nextProps 修改之后，最新的props属性
  //    参数二：nextState 修改之后，最新的state属性
  // ◼ 该方法返回值是一个boolean类型：
  //    返回值为true，那么就需要调用render方法；
  //    返回值为false，那么久不需要调用render方法；
  //    默认返回的是true，也就是只要state发生改变，就会调用render方法；


  
  // shouldComponentUpdate(nextProps) {
  //   if (this.props.counter !== nextProps.counter) {
  //     return true
  //   }
  //   return false
  // }

  render() {
    console.log("Recommend render")
    return (
      <div>
        <h2>Recommend Page: {this.props.counter}</h2>
      </div>
    )
  }
}

export default Recommend