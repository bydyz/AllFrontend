import axios from 'axios';

// 加 type 这样写就是为了babel 等有好的提示       
//!  AxiosInstance是axios中给axios.create定义的返回值类型
//!  AxiosRequestConfig 是axios原先给config的定义
//!  AxiosRequestConfig 不支持在创建axios的实例时，传 为自己特别添加的拦截器函数，故需要对AxiosRequestConfig进行扩展
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';


//!  对AxiosRequestConfig进行扩展
// interface PlusAxiosRequestConfig extends AxiosRequestConfig {
//   interceptors?: {
//     ExtraRequestSuccess?: (config: AxiosRequestConfig) => AxiosRequestConfig,
//     ExtraRequestFailure?: (err: any) => any,
//     ExtraResponseSuccess?: (res: AxiosResponse) => AxiosResponse,
//     ExtraResponseFailure?: (err: any) => any
//   }
// }

// 对AxiosRequestConfig进行扩展  代码优化
interface ExtraInterceptors {
  ExtraRequestSuccess?: (config: AxiosRequestConfig) => AxiosRequestConfig,
  ExtraRequestFailure?: (err: any) => any,
  ExtraResponseSuccess?: (res: AxiosResponse) => AxiosResponse,
  ExtraResponseFailure?: (err: any) => any
}
interface PlusAxiosRequestConfig extends AxiosRequestConfig {
  interceptors?: ExtraInterceptors
}


class HYRequest {
  instance: AxiosInstance



  // axios 实例
  // constructor(config: AxiosRequestConfig) {
  constructor(config: PlusAxiosRequestConfig) {
    this.instance = axios.create(config)

    // 每个instance实例都添加拦截器
    // this.instance.interceptors.request.use(fn1, fn2)
    // this.instance.interceptors.response.use(fn1, fn2)

    // 全局请求 请求前的拦截
    this.instance.interceptors.request.use((config) => {
      console.log("此处可以执行，全局请求成功 但未发出前 要进行的操作")

      console.log("比如说：修改header，对传参进行修改")

      return config
    }, err => {
      console.log("此处可以执行，全局请求失败 且未发出前 要进行的操作")

      // 如提示以下信息
      // Message.error('请求超时!')
      // return Promise.reject(err)

      return err
    })

    // 全局请求 响应前的拦截
    this.instance.interceptors.response.use((res) => {
      console.log("此处可以执行，对即将返回给客户端的数据进行操作 的操作")

      // 在此可对不同的数据类型进行不同的处理

      return res
    }, err => {

      // 可进行如下操作
      // switch (err.response.status) {
      //   case 401:
      //     await store.dispatch('system/logout')
      //   default:
      //     break
      // }

      // return Promise.reject(err)

      return err
    })




    // 添加特定的 interceptors          通过类型缩小添加特定的拦截器
    // if(config.interceptors) {
    //   this.instance.interceptors.request.use(config.interceptors.ExtraRequestSuccess, config.interceptors.ExtraRequestFailure)

    //   this.instance.interceptors.response.use(config.interceptors.ExtraResponseSuccess, config.interceptors.ExtraResponseFailure)
    // }

    // 用可选链缩小添加特定的拦截器         若有 interceptors 且有函数，则添加拦截器，否则添加的是undefined
    this.instance.interceptors.request.use(config.interceptors?.ExtraRequestSuccess, config.interceptors?.ExtraRequestFailure)

    this.instance.interceptors.response.use(config.interceptors?.ExtraResponseSuccess, config.interceptors?.ExtraResponseFailure)


    //!    axios.interceptors.request.use 和 axios.interceptors.response.use 可以多次调用，用于添加多个拦截器（过滤器）。添加后的拦截器会按照 添加顺序 依次执行，形成类似“中间件”的链式调用。
  }



  // 拦截器: 蒙版Loading/token/修改配置
  /**
   * 两个难点:
   *  1.拦截器进行精细控制
   *    > 全局拦截器
   *    > 实例拦截器
   *    > 单次请求拦截器
   * 
   *  2.响应结果的类型处理(泛型)
   */




  // 网络请求的方法
  request(requestConfig: AxiosRequestConfig) {
    return this.instance.request(requestConfig)
  }


  get() {

  }
  post() {

  }
}

export default HYRequest


// 对于请求前的拦截器：越早添加越后执行
// 对于响应前的拦截器：越早添加越早执行
