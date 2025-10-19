import HYRequest from '..';

interface IHomeData {
  data: any,
  returnCode: string,
  success: boolean
}

HYRequest.request<IHomeData>({
  url: "/home/multidata"
}).then(res => {
  console.log(res.data, res.success, res.returnCode)
})