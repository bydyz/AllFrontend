import {HYRequestInstanceTwo } from '..';

HYRequestInstanceTwo.request({
  url: "/entire/list",
  params: {
    offset: 0,
    size: 20
  }
}).then(res => {
  // 给promise加上<AxiosResponse>即可       res.data 中才是服务器返回的数据，res中其他的是axios封装而来的
  // 在全局的拦截响应上，返回res.data
  console.log(res)
})


HYRequestInstanceTwo.request({
  url: "/home/highscore",

  // 此处添加的拦截器不会覆盖 类HYRequest 中的拦截器
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

}).then(res => {
  // 给promise加上<AxiosResponse>即可       res.data 中才是服务器返回的数据，res中其他的是axios封装而来的
  // 在全局的拦截响应上，返回res.data
  console.log(res)
})









// 容易发现，此处的  res  是unknown 类型         
new Promise((resolve, reject) => {
  resolve("哈哈哈")
}).then(res => {
  console.log(res)
})

// 这样写  res  即是string类型
new Promise<string>((resolve, reject) => {
  resolve("哈哈哈")
}).then(res => {
  console.log(res)
})