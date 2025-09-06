import { PureComponent } from 'react'

// 定义组件: 给一些需要特殊数据的组件, 注入props
function enhancedUserInfo(OriginComponent) {

  //   <Home banners={["轮播1", "轮播2"]}/>  即是下面组件的应用

  class NewComponent extends PureComponent {
    constructor(props) {
      super(props)

      this.state = {
        userInfo: {
          name: "coderwhy",
          level: 99
        }
      }
    }

    render() {
      // 此处将 props、state.userInfo 作为属性传递到 OriginComponent ，
      // 即 function(props) {
      //   return <h1>Home: {props.name} {props.level} {props.banners}</h1>
      // }
      // this.props 是数组，通过 {...this.props} 即将数组传递到了子组件
      return <OriginComponent {...this.props} {...this.state.userInfo}/>
    }
  }

  return NewComponent
}

export default enhancedUserInfo
