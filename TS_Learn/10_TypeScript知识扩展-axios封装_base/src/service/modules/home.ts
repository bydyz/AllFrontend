// 此处这样写却是可以
import HYRequestInstanceOne from '..';

HYRequestInstanceOne.request({
  url: "/home/multidata"
}).then(res => {
  console.log(res.data)
})