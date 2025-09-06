import * as actionTypes from "./constants"
import axios from "axios"

export const addNumberAction = (num) => ({
  type: actionTypes.ADD_NUMBER,
  num
})

export const subNumberAction = (num) => ({
  type: actionTypes.SUB_NUMBER,
  num
})


export const changeBannersAction = (banners) => ({
  type: actionTypes.CHANGE_BANNERS,
  banners
})

export const changeRecommendsAction = (recommends) => ({
  type: actionTypes.CHANGE_RECOMMENDS,
  recommends
})



export const fetchHomeMultidataAction = () => {
  // 如果是一个普通的action, 那么我们这里需要返回action对象

  // 问题: 对象中是不能直接拿到从服务器请求的异步数据的
  // 处理：返回一个函数

  // 提供两个传参  store  的  dispatch 和 getState
  return function(dispatch, getState) {
    // 异步操作: 网络请求
    // console.log("foo function execution-----", getState().counter)
    axios.get("http://123.207.32.32:8000/home/multidata").then(res => {
      const banners = res.data.data.banner.list
      const recommends = res.data.data.recommend.list

      // dispatch({ type: actionTypes.CHANGE_BANNERS, banners })
      // dispatch({ type: actionTypes.CHANGE_RECOMMENDS, recommends })
      dispatch(changeBannersAction(banners))
      dispatch(changeRecommendsAction(recommends))
    })
  }

  // 问题: 如果返回的是一个函数, 那么redux是不支持的
  // 处理：安排一个中间件才可派发函数  redux-thunk  在store中导入并使用

  // redux-thunk 支持派发函数的思路：执行派发的函数
}

