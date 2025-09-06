import WxCode from "./WxCode.js";

function createWeiXinCode() {
  
  let a = new WxCode({
    self_redirect: true,

    // appid: this.wxAppId,
    appid: "wxff447f63362a0dd2",

    // appDomain: this.domain.wechat,
    appDomain: "https://test-inner.cwasp.com/",

    appPath: 'wechat.html',
    // appPath: 'dfsdfasfdsdf',

    // businessPath: this.businessPath,
    businessPath: "/wechat/login",

    // businessParams: {
    //   orgId: this.orgId
    // },
    businessParams: {
      orgId: 71
    },

    // customParams: {
    //   ...this.query,
    //   currentPath: this.$route.fullPath
    // },
    customParams: {
      // ...this.query,
      currentPath: "/?orgId=71"
    },

    dom: document.getElementById( 'code' ),

    // style: 111
  })

  return a
}




// 创建一个  WxCode  类实例对象
let a = createWeiXinCode()
// b即是最后生成的二维码的
let b = a.wxCodeUrl









// 以下是  wechat.html  的代码
let c = new URL(b)

// 扫码后回调的url    少了个扫码返回的code，下面会造给它
let d = "https://test-inner.cwasp.com/wechat.html?businessUrl=http%253A%252F%252F127.0.0.1%253A5500%252Fwechat%252Flogin%253FcustomParams%253D%2525257B%25252522currentPath%25252522%2525253A%25252522%2525252F%2525253ForgId%2525253D71%25252522%2525257D%2526orgId%253D71"

let e = new URL(d)
// 给url创造  code、state
e.searchParams.set('code', 'CODE')
e.searchParams.set('state', 'STATE')

console.log('')
console.log('SEARCH', e.search)
console.log('PART ONE OF SEARCH', e.search.slice(1))
console.log('PART TWO OF SEARCH', e.search.slice(1).split('&'))
console.log('')


// 将url的search进行转换
let searchList = e.search.slice(1).split('&')
var query = {}
// 原生格式化 - query     match(/([^=]+)=(.+)/)会将  searchParams  变为一个长度为3的数组
for (var i = 0; i < searchList.length; i++) {
  var searchItem = searchList[i].match(/([^=]+)=(.+)/)
  console.log()
  if (searchItem) {
    // 这里需要解码两次才可以获得第一层的编码前的url，why     再继续解码两次会获得最后的结果
    console.log(decodeURIComponent(decodeURIComponent(searchItem[2])))
    console.log(decodeURIComponent(decodeURIComponent(decodeURIComponent(decodeURIComponent(searchItem[2])))))
    query[searchItem[1]] = decodeURIComponent(decodeURIComponent(searchItem[2]))
  }
}

console.log(query)

// 原生格式化 - 生成业务页链接
var businessUrl = query.businessUrl + '&code=' + query.code

console.log(businessUrl)

// location.replace(businessUrl)      //有这个会报错，这个定位到达的页面最后还是处在iframe里面，因此下面的跳转有问题










// wechat.vue的逻辑可以通过直接在测试服打断点查看，注意现在teach-inner-client现在是是history模式，若在url有#的情况下扫码登录，会无法跳转，处理措施见wechat.vue的toRedirectPage函数


//https://blog.csdn.net/qq_43208822/article/details/107574148?ops_request_misc=&request_id=&biz_id=102&utm_term=%E6%89%AB%E5%BE%AE%E4%BF%A1%E4%BA%8C%E7%BB%B4%E7%A0%81%E7%99%BB%E5%BD%95%E7%9A%84%E8%BF%94%E5%9B%9E%E5%80%BC&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduweb~default-1-107574148.142^v73^insert_down4,201^v4^add_ask,239^v1^control&spm=1018.2226.3001.4187