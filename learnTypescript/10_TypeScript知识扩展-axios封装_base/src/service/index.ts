// 此种写法不知为何不可
// import { HYRequest } from '..';

import HYRequest from './request';
import { BASE_URL, TIME_OUT} from './config';


const HYRequestInstanceOne = new HYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT
})

export default HYRequestInstanceOne


export const HYRequestInstanceTwo = new HYRequest({
  baseURL: "http://codercba.com:1888/airbnb/api",
  timeout: 8000,

  //!  此处添加的拦截器不会覆盖 类HYRequest 中的拦截器
  interceptors: {
    ExtraRequestSuccess: config => {
      return config
    },
    ExtraRequestFailure: err => {
      return err
    },
    ExtraResponseSuccess: res => {
      return res
    },
    ExtraResponseFailure: err => {
      return err
    }
  }
})

// HYRequestInstanceOne只有通用的拦截器       HYRequestInstanceTwo除了有通用的拦截器，还有新建实例时加上的额外的拦截器