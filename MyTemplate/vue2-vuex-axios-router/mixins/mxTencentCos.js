import {TencentCos, TencentVod} from '@/lib'
import flvjs from 'flv.js/dist/flv.js'
import path from 'path'
import url from 'url'

// TODO 该混合 待优化

export default {
  created() {
    this.cos = new TencentCos()
    this.vod = new TencentVod()
  },
  data() {
    return {
      cos: null,
      vod: null,
      flvjs,
      // 腾讯云COS 文档转HTML支持的格式
      COSProcessType: [
        'pptx', 'ppt', 'pot', 'potx', 'pps', 'ppsx', 'dps', 'dpt', 'pptm', 'potm', 'ppsm',
        'doc', 'dot', 'wps', 'wpt', 'docx', 'dotx', 'docm', 'dotm',
        'xls', 'xlt', 'et', 'ett', 'xlsx', 'xltx', 'csv', 'xlsb', 'xlsm', 'xltm', 'ets',
        'pdf', 'lrc', 'c', 'cpp', 'h', 'asm', 's', 'java', 'asp', 'bat', 'bas', 'prg', 'cmd', 'rtf', 'txt', 'log', 'xml', 'htm', 'html'
      ]
    }
  },
  methods: {
    // 获取 - iframe可预览链接
    async getIframePreviewUrl(fileUrl) {
      fileUrl = decodeURIComponent(fileUrl)

      let oFileUrlCos = await this.cos.getObjectUrl(/^http(s)?:\/\/.+/.test(fileUrl) ? fileUrl : `https:${fileUrl}`)
      let oFileUrl = new URL(oFileUrlCos)

      if (!this.COSProcessType.includes(path.extname(oFileUrl.pathname).slice(1))) return oFileUrl.toString()

      oFileUrl.searchParams.set('dstType', 'html')
      oFileUrl.searchParams.set('ci-process', 'doc-preview')
      return oFileUrl.toString()
    },

    async getCosFileBody(fileUrl) {
      if (!/^http(s)?:/.test(fileUrl)) fileUrl = `https:${fileUrl}`
      let filePath = url.parse(fileUrl).pathname
      return new Promise((resolve, reject) => {
        this.cos.cos.getObject({
          ...this.cos.config,
          Key: decodeURI(filePath),
          DataType: 'blob'
        }, (err, data) => {
          if (err) {
            reject(err)
          } else {
            resolve(data)
          }
        })
      })
    },

    // 格式化 - 文件地址
    formatFileUrl(filePath) {
      if (!/^http(s)?:/.test(filePath)) filePath = `https:${filePath}`
      filePath = decodeURIComponent(filePath)
      return filePath
    },

    // 操作 - 腾讯下载资源
    async onTencentDownLoad({filePath, fileName}) {
      try {
        filePath = this.formatFileUrl(filePath)
        let params = {
          name: fileName
        }
        console.log('下载文件', filePath)
        if (/vod2\.myqcloud\.com/.test(filePath)) {
          // 云点播下载
          params.url = filePath
          params.url += `?download_name=[${fileName.replace(/\.\w+$/, '')}]`
        } else {
          // 储存桶下载
          // let {Body} = await this.getCosFileBody(filePath)
          // params.body = Body

          params.url = await this.cos.getObjectUrl(filePath)
          params.url += params.url.includes('?') ? '&' : '?'
          params.url += 'response-content-disposition=attachment'
        }
        // await this.$utils.DownloadFile(params) // 会先在 浏览器缓存中 下载完资源， 才会 弹窗 下载
          let ifr = document.createElement('iframe')
          ifr.style.display = 'none'
          ifr.src = params.url
          document.body.appendChild(ifr)
      } catch (e) {
        console.error(e)
      }
    }
  }
}
