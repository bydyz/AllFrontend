import {isNotEmpty, isEmpty} from '../../public-func/TypesCheck/other.js'

export default class WxCode {
  debug = false
  WxCodeParams = {
    login_type: 'jssdk',
    appid: '',
    scope: 'snsapi_login',
    redirect_uri: '', // 与 appDomain + businessPath + customParams 二选一
    self_redirect: 'default',
    styletype: '',
    sizetype: '',
    bgcolor: '',
    rst: ''
  }

  appDomain = null // 域名 - 对应appid
  appPath = '/wechat.html' // 路径 - 统一解析页

  businessDomain = location.origin // 域名 - 解析后跳转的域名， 默认是当前域名
  businessPath = null // 路径 - 业务实现页
  businessParams = {}

  customParams = {} // 定制参数 - 提供给业务实现页的参数

  constructor(o = {}) {
    
    this.debug = Boolean(o.debug)
    this.checkConfig(o)
    this.updateWxCodeParams(o)

    if (o.dom) this.createIframe(o.dom)
  }

  // 检测配置   判断需要传参的参数有无正确传递
  checkConfig(o) {
    
    if (this.debug) return false
    let checkList = ['appid', 'redirect_uri']
    if (isEmpty(o['redirect_uri'])) checkList = ['appid', 'appDomain', 'businessPath', 'customParams']
    // console.log(checkList.filter(k => isEmpty(o[k])))
    // filter过滤出来符合条件的元素组成新的数组，对数组使用join方法，既是将其元素用  、  连接，组成巨大的字符串
    let errorKeys = checkList.filter(k => isEmpty(o[k])).join('、')
    if (errorKeys) return Promise.reject('没有传递参数：' + errorKeys)
  }



  // 更新 微信二维码参数    利用传入的参数补充类内部的变量
  updateWxCodeParams(o) {
    
    // 传入的参数包含  style，href，则将之保存到p
    let p = this.WxCodeParams
    console.log('77777777777', Object.keys(p).concat(['style', 'href']), isNotEmpty(o['style']))

    Object.keys(p).concat(['style', 'href']).forEach(k => {
      if (isNotEmpty(o[k])) p[k] = o[k]
    })
    console.log('888888888888', p)

    if (p.self_redirect !== 'default') p.self_redirect = Boolean(p.self_redirect)

    this.appDomain = o.appDomain
    if (o.appPath) this.appPath = o.appPath

    if (o.businessDomain) this.businessDomain = o.businessDomain
    this.businessPath = o.businessPath
    if (o.businessParams) this.businessParams = o.businessParams

    if (o.customParams) this.customParams = o.customParams

    this._wxCodeUrl = null
  }

  // 获取 - 微信二维码地址
  get wxCodeUrl() {
    
    if (this._wxCodeUrl) return this._wxCodeUrl
    let p = this.WxCodeParams
    let oWxCodeUrl = new URL('https://open.weixin.qq.com/connect/qrconnect')
    for (const k in p) {
      oWxCodeUrl.searchParams.set(k, p[k])
    }

    // 似乎此时还没有对  searchParams  进行编码，就是没有那种奇怪的代码，对于k，p(k)是个空字符串的，等号后面是空的
    console.log('oWxCodeUrl', oWxCodeUrl, oWxCodeUrl.href.toString())
    //   oWxCodeUrl.href  即为  https://open.weixin.qq.com/connect/qrconnect?login_type=jssdk&appid=wxff447f63362a0dd2&scope=snsapi_login&redirect_uri=&self_redirect=true&styletype=&sizetype=&bgcolor=&rst=

    
    // 将 appDomain + businessPath + customParams 复合成 redirect_uri
    if (!p.redirect_uri) {
      // 格式化 - 定制参数    this.customParams = "/?orgId=71"
      let customParams = encodeURIComponent(JSON.stringify(this.customParams))  //不编码则给oBusinessUrl设置searchParams会报错

      
      // 格式化 - 业务实现页    this.businessDomain = location.origin（当前域名）
      let oBusinessUrl = new URL(this.businessDomain)
      oBusinessUrl.pathname = 'REPLACE'
      oBusinessUrl.searchParams.set('customParams', customParams)
      for (const k in this.businessParams) {      //this.businessParams  是  传入的{orgId: 71}
        oBusinessUrl.searchParams.set(k, this.businessParams[k])
      }
      // encodeURI不会进行编码的内容很多，decodeURL不会对其不会编码的内容解码，感觉限制好多
      console.log('no decodeURL url', oBusinessUrl.toString())      //http://127.0.0.1:5500/REPLACE?customParams=%257B%2522currentPath%2522%253A%2522%252F%253ForgId%253D71%2522%257D&orgId=71    其中只有 customParams 的value被编码了，此时直接对整个url进行编码是无效的，见下面的尝试
      // console.log('url', decodeURI(oBusinessUrl.toString()))   //解码失败


      // 对整个oBusinessUrl的url的解码      事实证明对整个url解码是没有作用的
       let a = decodeURIComponent(decodeURIComponent(decodeURIComponent(decodeURIComponent(oBusinessUrl.toString()))))
      // let a = decodeURIComponent(decodeURIComponent(decodeURIComponent(oBusinessUrl.toString())))
      // let a = decodeURIComponent(decodeURIComponent(oBusinessUrl.toString()))
      // let a = decodeURIComponent(oBusinessUrl.toString())
      console.log('对search解码两次', oBusinessUrl.toString())
      // 未解码               http://127.0.0.1:5500/REPLACE?customParams=%257B%2522currentPath%2522%253A%2522%252F%253ForgId%253D71%2522%257D&orgId=71
      // 对search解码一次     http://127.0.0.1:5500/REPLACE?customParams=%257B%2522currentPath%2522%253A%2522%252F%253ForgId%253D71%2522%257D&orgId=71
      // 对search解码两次     http://127.0.0.1:5500/REPLACE?customParams=%257B%2522currentPath%2522%253A%2522%252F%253ForgId%253D71%2522%257D&orgId=71
      // 对search解码三次     http://127.0.0.1:5500/REPLACE?customParams=%257B%2522currentPath%2522%253A%2522%252F%253ForgId%253D71%2522%257D&orgId=71
      // 对search解码四次     http://127.0.0.1:5500/REPLACE?customParams=%257B%2522currentPath%2522%253A%2522%252F%253ForgId%253D71%2522%257D&orgId=71



      // 对search的解码
      // let a = decodeURIComponent(decodeURIComponent(decodeURIComponent(decodeURIComponent(oBusinessUrl.search))))
      // let a = decodeURIComponent(decodeURIComponent(decodeURIComponent(oBusinessUrl.search)))
      // let a = decodeURIComponent(decodeURIComponent(oBusinessUrl.search))
      // let a = decodeURIComponent(oBusinessUrl.search)
      // oBusinessUrl.search = a
      console.log('对search解码两次', oBusinessUrl.toString())
      // 未解码               http://127.0.0.1:5500/REPLACE?customParams=%257B%2522currentPath%2522%253A%2522%252F%253ForgId%253D71%2522%257D&orgId=71
      // 对search解码一次     http://127.0.0.1:5500/REPLACE?customParams=%7B%22currentPath%22%3A%22%2F%3ForgId%3D71%22%7D&orgId=71
      // 对search解码两次     http://127.0.0.1:5500/REPLACE?customParams={%22currentPath%22:%22/?orgId=71%22}&orgId=71
      // 对search解码三次     http://127.0.0.1:5500/REPLACE?customParams={%22currentPath%22:%22/?orgId=71%22}&orgId=71
      // 对search解码四次     http://127.0.0.1:5500/REPLACE?customParams={%22currentPath%22:%22/?orgId=71%22}&orgId=71

      
      console.log('noReplace', oBusinessUrl)
      console.log('REPLACE', this.businessPath.replace(/\?.*/, '').replace(/^\//, ''))
      //当前数据下，oBusinessUrl为  http://127.0.0.1:5500/REPLACE?customParams="/orgId=71"&orgId=71  此为未编码的版本
      // this.businessPath  是  "/wechat/login"    经过replace后是      "wechat/login"
      let businessUrl = oBusinessUrl.toString().replace('REPLACE', this.businessPath.replace(/\?.*/, '').replace(/^\//, ''))
      // businessUrl 为  http://127.0.0.1:5500/wechat/login?customParams="/orgId=71"&orgId=71  此为未编码的版本


      // 格式化 - 统一解析页      this.appDomain  是传入的  "https://test-inner.cwasp.com/"
      let oAppParseUrl = new URL(this.appDomain)
      oAppParseUrl.pathname = this.appPath      //  this.appPath  是传入的  "wechat.html" 
      oAppParseUrl.searchParams.set('businessUrl', encodeURIComponent(businessUrl))
      // oAppParseUrl 为  https://test-inner.cwasp.com/wechat.html?businessUrl=http://127.0.0.1:5500/wechat/login?customParams="/orgId=71"&orgId=71

      

      // 复合成 redirect_uri
      let redirect_uri = oAppParseUrl.toString()
      oWxCodeUrl.searchParams.set('redirect_uri', redirect_uri)
      // 将上面生成的  redirect_uri  以searchParams的形式，放在   oWxCodeUrl  之中他
    }

    this._wxCodeUrl = oWxCodeUrl.toString()
    return this._wxCodeUrl
  }

  // 创建Iframe,插入到el内
  createIframe(dom) {
    if (this.debug && !dom) return Promise.reject('没有传递参数：dom')
    let iframe = document.createElement('iframe')
    iframe.src = this.wxCodeUrl
    iframe.frameBorder = '0'
    iframe.allowTransparency = 'true'
    iframe.scrolling = 'no'
    iframe.width = '300px'
    iframe.height = '400px'
    dom.innerHTML = ''
    console.log('99999999999999999999999999999999999999999999999999999999', )
    dom.appendChild(iframe)
  }
}