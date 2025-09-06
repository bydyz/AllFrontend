let a = new URL('https://test-lkl.cwasp.com/h5/#/pages/course/course')

console.log(a)
/* 
URL {
  href: 'https://test-lkl.cwasp.com/h5/#/pages/course/course',
  origin: 'https://test-lkl.cwasp.com',
  protocol: 'https:',
  username: '',
  password: '',
  host: 'test-lkl.cwasp.com',
  hostname: 'test-lkl.cwasp.com',
  port: '',
  pathname: '/h5/',
  search: '',
  searchParams: URLSearchParams {},
  hash: '#/pages/course/course'
}
*/

a.pathname = '/h6/'
console.log(a)
/* 
URL {
  href: 'https://test-lkl.cwasp.com/h6/#/pages/course/course',
  origin: 'https://test-lkl.cwasp.com',
  protocol: 'https:',
  username: '',
  password: '',
  host: 'test-lkl.cwasp.com',
  hostname: 'test-lkl.cwasp.com',
  port: '',
  pathname: '/h6/',
  search: '',
  searchParams: URLSearchParams {},
  hash: '#/pages/course/course'
}
*/

// 其他属性类似，直接修改





// 以上内容需要用  REPL  来使用

let a = new URL('https://open.weixin.qq.com/connect/qrconnect?login_type=jssdk&appid=wxff447f63362a0dd2&scope=snsapi_login&redirect_uri=https%3A%2F%2Ftest-inner.cwasp.com%2Fwechat.html%3FbusinessUrl%3Dhttp%25253A%25252F%25252Flocalhost%25253A8080%25252Fwechat%25252Flogin%25253FcustomParams%25253D%252525257B%2525252522currentPath%2525252522%252525253A%2525252522%252525252F%252525253ForgId%252525253D71%2525252522%252525257D%252526orgId%25253D71&self_redirect=true&styletype=&sizetype=&bgcolor=&rst=')

let b = new URL('https://test-inner.cwasp.com/wechat.html?businessUrl=http%253A%252F%252Flocalhost%253A8080%252Fwechat%252Flogin%253FcustomParams%253D%2525257B%25252522currentPath%25252522%2525253A%25252522%2525252F%2525253ForgId%2525253D71%25252522%2525257D%2526orgId%253D71')