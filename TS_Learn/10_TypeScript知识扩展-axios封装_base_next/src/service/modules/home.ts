// 此处这样写却是可以
import HYRequestInstanceOne from '..';

HYRequestInstanceOne.request({
  url: "/home/multidata"
}).then(res => {
  // 给promise加上<AxiosResponse>即可       res.data 中才是服务器返回的数据，res中其他的是axios封装而来的
  console.log(res.data)
})