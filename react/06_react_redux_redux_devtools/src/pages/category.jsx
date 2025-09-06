import React, { PureComponent } from 'react'
import { connect } from "react-redux"
import { fetchHomeMultidataAction } from "../store/actionCreators"

export class Category extends PureComponent {

  componentDidMount() {
    this.props.fetchHomeMultidata()
  }

  render() {
    return (
      <div>
        <h2>Category Page: {this.props.counter}</h2>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  counter: state.counter
})

const mapDispatchToProps = (dispatch) => ({
  fetchHomeMultidata() {
    // 在此处  派发函数  用react-thunk插件进行支持，然后即会执行派发的函数，然后可在函数中执行相应的函数
    dispatch(fetchHomeMultidataAction())
  }
})

export default connect(mapStateToProps, mapDispatchToProps )(Category)