import type { AxiosRequestConfig, AxiosResponse } from "axios"


//! 针对AxiosRequestConfig配置进行扩展
//! 此处的 HYInterceptors 就是个普通的泛型接口，后面为 interceptors 设置类型
export interface HYInterceptors<T = AxiosResponse> {
  requestSuccessFn?: (config: AxiosRequestConfig) => AxiosRequestConfig 
  requestFailureFn?: (err: any) => any 
  responseSuccessFn?: (res: T) => T
  responseFailureFn?: (err: any) => any 
}

export interface HYRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: HYInterceptors<T>
}