import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// 原本我们通过redux-thunk中间件让dispatch中可以进行异步操作， Redux Toolkit默认已经给我们继承了Thunk相关的功能：createAsyncThunk

// createAsyncThunk: 接受一个动作类型字符串和一个返回承诺的函数，并生成一个pending/fulfilled/rejected基于该承诺分派动作类型的 thunk
export const fetchHomeMultidataAction = createAsyncThunk(
  "fetch/homemultidata", 
  // 此处的  extraInfo  就是  派发  fetchHomeMultidataAction  时传入的参数
  async (extraInfo, { dispatch, getState }) => {
    // console.log(extraInfo, dispatch, getState)
    // 1.发送网络请求, 获取数据
    const res = await axios.get("http://123.207.32.32:8000/home/multidata")

    // 2.取出数据, 并且在此处直接dispatch操作(可以不做)
    const banners = res.data.data.banner.list
    const recommends = res.data.data.recommend.list

    dispatch(changeBanners(banners))
    dispatch(changeRecommends(recommends))

    // 3.返回结果, 那么action状态会变成fulfilled状态
    // 此处不能直接返回res  因为它无法序列化
    // 最后 返回的 res.data  会 传递到 fetchHomeMultidataAction.fulfilled 的 payload
    return res.data
  }
)

const homeSlice = createSlice({
  name: "home",
  initialState: {
    banners: [],
    recommends: []
  },
  reducers: {
    changeBanners(state, { payload }) {
      state.banners = payload
    },
    changeRecommends(state, { payload }) {
      state.recommends = payload
    }
  },

  // ◼ 当createAsyncThunk创建出来的action被dispatch时，会存在三种状态：
  //    pending：action被发出，但是还没有最终的结果；
  //    fulfilled：获取到最终的结果（有返回值的结果）；
  //    rejected：执行过程中有错误或者抛出了异常；
  // ◼ 我们可以在createSlice的entraReducer中监听这些结果：

  // extraReducers: {
  //  [ ]  计算属性名     获取其值作为对象的key值
  //   [fetchHomeMultidataAction.pending](state, action) {
  //     console.log("fetchHomeMultidataAction pending")
  //   },
  //   [fetchHomeMultidataAction.fulfilled](state, { payload }) {
  //     state.banners = payload.data.banner.list
  //     state.recommends = payload.data.recommend.list
  //   },
  //   [fetchHomeMultidataAction.rejected](state, action) {
  //     console.log("fetchHomeMultidataAction rejected")
  //   }
  // }

  // ◼ extraReducer还可以传入一个函数，函数接受一个builder参数。
  //    我们可以向builder中添加case来监听异步操作的结果：

  extraReducers: (builder) => {
    // builder.addCase(fetchHomeMultidataAction.pending, (state, action) => {
    //   console.log("fetchHomeMultidataAction pending")
    // }).addCase(fetchHomeMultidataAction.fulfilled, (state, { payload }) => {
    //   state.banners = payload.data.banner.list
    //   state.recommends = payload.data.recommend.list
    // })
  }
})

export const { changeBanners, changeRecommends } = homeSlice.actions
export default homeSlice.reducer
