import ContentType from './ContentType.json'
import path from 'path'
import jszip from 'jszip'
import {FormatNumber} from '../Data'
import html2canvas from 'html2canvas'


// Content-Type（MediaType），即是Internet Media Type，互联网媒体类型，也叫做MIME类型。在互联网中有成百上千中不同的数据类型，HTTP在传输数据对象时会为他们打上称为MIME的数据格式标签，用于区分数据类型。最初MIME是用于电子邮件系统的，后来HTTP也采用了这一方案。

// 在HTTP协议消息头中，使用Content-Type来表示请求和响应中的媒体类型信息。它用来告诉服务端如何处理请求的数据，以及告诉客户端（一般是浏览器）如何解析响应的数据，比如显示图片，解析并展示html等等。

// Content-Type的格式：
// Content-Type：type/subtype ;parameter

// type：主类型，任意的字符串，如text，如果是*号代表所有；
// subtype：子类型，任意的字符串，如html，如果是*号代表所有，用“/”与主类型隔开；
// parameter：可选参数，如charset，boundary等。

export const GetContentType = url => ContentType[path.extname(url).slice(1)]


// 工具 - 获取文件blob
export const GetFileBlob = (fileUrl, contentType = 'image/png') => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    // ！ 全局将字符串中的  \   替换成   /
    xhr.open('GET', fileUrl.replace(/\\/g, '/'), true)
    xhr.responseType = 'blob'
    xhr.setRequestHeader('Content-Type', contentType)//设置请求头
    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(xhr.response)
      }
    }
    xhr.send()
  })
}






/**
 * DownloadBase 下载文件
 * @dom:element 下载文件流
 * @filename:string = 'base' 下载文件名
 * */
export const DownloadBase = (data, filename = 'base') => {
  // ! 利用a标签，什么类型的数据都可以下载   a标签 牛逼
  // ! 似乎a标签只能对已经下载下来的base url 进行下载
  const a = document.createElement('a')
  a.href = data
  a.download = `${filename}`
  a.style.display = 'none'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}






/**
 * DownloadElement 下载html元素
 * @dom:element 下载的元素
 * @filename:string = 'image' 下载文件名
 * */
export const DownloadElement = (dom, filename = 'image') => {
  return new Promise(resolve => {
    html2canvas(dom).then(canvas => {
      const a = document.createElement('a')
      a.href = canvas.toDataURL('image/png')
      a.download = `${filename}.png`
      a.style.display = 'none'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      resolve(a.href)
    })
  })
}






// 下载外链
// ！
export const DownloadFile = async (options = {}) => {
  let {url, body, name = 'image', contentType} = options

  if (!url && !body) return console.error('需要传递 url、data之一')

  // 1. 將 url 转换成 文件流 （针对外链）
  if (url) {
    contentType = contentType || GetContentType(url) || 'image/png'
    body = await GetFileBlob(url, contentType)
  }

  // 2. 將 body 转换成 Blob
  let fileData = (window.URL || window.webkitURL || window).createObjectURL(new Blob([body], {type: contentType}))
  // 下载资源
  DownloadBase(fileData, name)
}

export const DownloadPDF = options => DownloadFile({name: 'pdf', contentType: 'application/pdf', ...options})
export const DownloadExcel = options => DownloadFile({
  name: 'excel',
  contentType: 'application/vnd.ms-excel', ...options
})

// 批量下载 - zip压缩包
export const DownloadFileAsZip = async (options = {}) => {
  let {fileList, name = 'zip'} = options
  let zip = new jszip()

  for (const file of fileList) {
    let {url, contentType, body, name} = file
    if (url) {
      contentType = contentType || GetContentType(url) || 'image/png'
      body = await GetFileBlob(url, contentType)
    }
    zip.file(name, body, {binary: true})
  }

  let content = await zip.generateAsync({type: 'blob'})
  const fd = new FileReader()
  fd.readAsDataURL(content)
  fd.onload = () => DownloadBase(fd.result, name)
}


export const ByteConvert = (value, to = null, from = 'B') => {
  let unit = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  let fromIndex = unit.findIndex(a => a.toLowerCase() === from.toLowerCase())
  let toIndex = 0
  if (to) {
    toIndex = unit.findIndex(a => a.toLowerCase() === to.toLowerCase())
  } else {
    while (value >= Math.pow(1024, toIndex)) {
      toIndex++
    }
  }

  let n = FormatNumber((value || 0) * Math.pow(1024, fromIndex - toIndex))
  if (!to) return n + unit[toIndex]
  return n
}