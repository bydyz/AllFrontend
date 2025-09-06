import { createSlice } from "@reduxjs/toolkit"

// createSlice：接受reducer函数的对象、切片名称和初始状态值，并自动生成切片reducer，并带有相应的actions。
// createSlice主要包含如下几个参数：  1. name  可以理解为 模块名称      2. initialState  初始的state      3. reducers  相当于原型的reducer函数
// createSlice返回值是一个对象，包含所有的actions；
const counterSlice = createSlice({
  name: "counter",
  initialState: {
    counter: 888
  },
  reducers: {
    // dispatch 可以 解构为 { type, payload }    由外面的 dispatch(addNumber(num)) 调用
    addNumber(state, { payload }) {
      // 这里也不需要像原来一样 返回一个新的state了
      state.counter = state.counter + payload
    },
    subNumber(state, { payload }) {
      state.counter = state.counter - payload
    }
  }
})

// 此一句是导出要用到的操作函数
export const { addNumber, subNumber } = counterSlice.actions
 
// 此一句是导出 store 需要用的的reducer
export default counterSlice.reducer


// Redux Toolkit的数据不可变性
// ◼ 在React开发中，我们总是会强调数据的不可变性：
//    无论是类组件中的state，还是redux中管理的state；
//    事实上在整个JavaScript编码过程中，数据的不可变性都是非常重要的；

// ◼ 所以在前面我们经常会进行浅拷贝来完成某些操作，但是浅拷贝事实上也是存在问题的：
//    比如过大的对象，进行浅拷贝也会造成性能的浪费；
//    比如浅拷贝后的对象，在深层改变时，依然会对之前的对象产生影响；

// ◼ 事实上Redux Toolkit底层使用了immerjs的一个库来保证数据的不可变性。

// ◼ 在我们公众号的一片文章中也有专门讲解immutable-js库的底层原理和使用方法：
//    https://mp.weixin.qq.com/s/hfeCDCcodBCGS5GpedxCGg

// ◼ 为了节约内存，又出现了一个新的算法：Persistent Data Structure（持久化数据结构或一致性数据结构）；
//    用一种数据结构来保存数据；
//    当数据被修改时，会返回一个对象，但是新的对象会尽可能的利用之前的数据结构而不会对内存造成浪费；