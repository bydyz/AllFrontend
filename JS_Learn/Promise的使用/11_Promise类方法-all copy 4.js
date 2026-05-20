// Promise.all 例子
// 情景：data.records是表格的原始数据，后面对每一行要请求一个接口获取数据并将数据插入到对应行的位置
// let tableData = await Promise.all((data.records || []).map(item => {
//   return new Promise(resolve => {
//       this.getPicUnderCategory(item.id).then(res => {
//           resolve({
//               ...item,
//               coverUrlList: res || []
//           })
//       }).catch(e => resolve({
//           ...item,
//           coverUrlList: []
//       }))
//   })
// }))

// this.tableData = tableData




// 情景：提交表单，表单里有多个文件需要上传，需要在文件上传后再提交表单，此处的代码即是上传文件
// let attachList = await Promise.all(this.fileList.map((item) => {
//   return new Promise(resolve => {
//       this.cos.uploadFile({
//           file: item.context,
//           onSuccess: (attachUrl) => resolve({
//               attachName: item.attachName,
//               attachCode: item.attachCode,
//               attachUrl,
//           }),
//           onError: (err) => resolve(null),
//       })
//   })
// }))
// attachList = attachList.filter((a) => a)





