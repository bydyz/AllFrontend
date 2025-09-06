import ContentType from './ContentType.json'
import path from 'path'
import jszip from 'jszip'
import {FormatNumber} from '../Data'
import html2canvas from 'html2canvas'

export const GetContentType = url => ContentType[path.extname(url).slice(1)]

// 工具 - 获取文件blob
export const GetFileBlob = (fileUrl, contentType = 'image/png') => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
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