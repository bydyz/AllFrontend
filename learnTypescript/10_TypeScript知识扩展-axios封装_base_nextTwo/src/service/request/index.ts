import axios from 'axios';
// 加 type 这样写就是为了babel 等有好的提示       
// AxiosInstance是axios中给axios.create定义的返回值类型           AxiosRequestConfig 是axios原先给config的定义
// AxiosRequestConfig 不支持在创建axios的实例时，传 为自己特别添加的拦截器函数，故需要对AxiosRequestConfig进行扩展
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';





// 对AxiosRequestConfig进行扩展
// interface PlusAxiosRequestConfig extends AxiosRequestConfig {
//   interceptors?: {
//     ExtraRequestSuccess?: (config: AxiosRequestConfig) => AxiosRequestConfig,
//     ExtraRequestFailure?: (err: any) => any,
//     ExtraResponseSuccess?: (res: AxiosResponse) => AxiosResponse,
//     ExtraResponseFailure?: (err: any) => any
//   }
// }

// 对AxiosRequestConfig进行扩展  代码优化
// interface ExtraInterceptors {
//   ExtraRequestSuccess?: (config: AxiosRequestConfig) => AxiosRequestConfig,
//   ExtraRequestFailure?: (err: any) => any,
//   ExtraResponseSuccess?: (res: AxiosResponse) => AxiosResponse,
//   ExtraResponseFailure?: (err: any) => any
// }
// interface PlusAxiosRequestConfig extends AxiosRequestConfig {
//   interceptors?: ExtraInterceptors
// }

// 为下方添加具体接口拦截器时，执行 res = requestConfig.interceptors.ExtraResponseSuccess(res)  而进行的代码优化
interface ExtraInterceptors<T = AxiosResponse> {
  ExtraRequestSuccess?: (config: AxiosRequestConfig) => AxiosRequestConfig,
  ExtraRequestFailure?: (err: any) => any,
  ExtraResponseSuccess?: (res: T) => T,
  ExtraResponseFailure?: (err: any) => any
}
interface PlusAxiosRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: ExtraInterceptors<T>
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
      return config
    }, err => {
      console.log("此处可以执行，全局请求失败 且未发出前 要进行的操作")
      return err
    })

    // 全局请求 响应前的拦截
    this.instance.interceptors.response.use((res) => {
      console.log("此处可以执行，对即将返回给客户端的数据进行操作 的操作")
      // 在全局的拦截响应上，返回res.data
      return res.data
    }, err => {
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
  // request(requestConfig: AxiosRequestConfig) {
  //   return this.instance.request(requestConfig)
  // }

  // 网络请求的方法
  request<T = any>(requestConfig: PlusAxiosRequestConfig<T>) {

    // 利用此方法给某一个实例添加拦截器
    if(requestConfig.interceptors?.ExtraRequestSuccess) {
      requestConfig = requestConfig.interceptors?.ExtraRequestSuccess(requestConfig)
    }

    // 在全局的拦截响应上，返回res.data       但是我们一般想要拿到更加具体的类型，故不能用Promise<any>，而是应该用全局拦截器中的res.data的类型，做法：request<T = any>
    return new Promise<T>((resolve, reject) => {
      // this.instance.request<any, T>  的第二个参数  会决定  then的res的类型，因此利用泛型如此设置，res就需要符合 泛型 T
      this.instance.request<any, T>(requestConfig).then(res => {

        // this.instance.request(requestConfig)  即是完成了请求，它的res即是  返回值，故需要用  ExtraResponseSuccess 处理
        if(requestConfig.interceptors?.ExtraResponseSuccess) {
          // 上面的 interface ExtraInterceptors 有限定 requestConfig.interceptors.ExtraResponseSuccess(res) 传入的参数 res 须符合类型要求 AxiosResponse，故此处会报错。因此只要将上面设置 ExtraResponseSuccess 的类型为any 即可解决此问题，但是我们通常想要更加具体的类型而不是any。返回数据的类型会因为接口的不同而不同，因此上面也无法写为某一种类型，因此需要用泛型
          res = requestConfig.interceptors.ExtraResponseSuccess(res)
        }

        // resolve(res as any as T)
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }


  get<T = any>(getConfig: PlusAxiosRequestConfig<T>) {
    return this.request( {...getConfig, method: "GET"} )
  }
  post<T = any>(postConfig: PlusAxiosRequestConfig<T>) {
    return this.request( {...postConfig, method: "POST"} )
  }
  delete<T = any>(deleteConfig: PlusAxiosRequestConfig<T>) {
    return this.request( {...deleteConfig, method: "DELETE"} )
  }
}

export default HYRequest


// 对于请求前的拦截器：越早添加越后执行
// 对于响应前的拦截器：越早添加越早执行
