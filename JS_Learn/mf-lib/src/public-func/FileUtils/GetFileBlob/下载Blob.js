/* 

下载Blob
在实际Web应用中，Blob更多是图片二进制形式的上传与下载，虽然其可以实现几乎任意文件的二进制传输

第二种获取Blob的形式是通过XHR下载Blob

var xhr = new XMLHttpRequest();    //创建一个新的XHR对象 
xhr.open('GET','p5.gif');            //指定要获取内容的URL
xhr.responseType = 'blob';        //以Blob的形式
xhr.onload = function(){         //onload 比onreadystatechange更容易
    //Blob {size: 944, type: "image/gif"} 
    console.log(xhr.response);  //response返回的就是Blob对象    
}                                
xhr.send(null);                    //发送请求 

*/



// ?工具 - 获取文件blob
// export const GetFileBlob = (fileUrl, contentType = 'image/png') => {
//   return new Promise((resolve, reject) => {
//     const xhr = new XMLHttpRequest()
//     xhr.open('GET', fileUrl.replace(/\\/g, '/'), true)
//     xhr.responseType = 'blob'
//     xhr.setRequestHeader('Content-Type', contentType)//设置请求头
//     xhr.onload = () => {
//       if (xhr.status === 200) {
//         resolve(xhr.response)
//       }
//     }
//     xhr.send()
//   })
// }