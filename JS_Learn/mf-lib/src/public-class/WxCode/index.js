// console.log(new URL('http://127.0.0.1:5500/REPLACE?customParams=%257B%2522currentPath%2522%253A%2522%252F%253ForgId%253D71%2522%257D&orgId=71'))


// // 里面的url是二维码的src   其中的redirect_uri是微信扫码后回调的url
// console.log(new URL("https://open.weixin.qq.com/connect/qrconnect?login_type=jssdk&appid=wxff447f63362a0dd2&scope=snsapi_login&redirect_uri=https%3A%2F%2Ftest-inner.cwasp.com%2FCourse%2FList%3FbusinessUrl%3Dhttp%25253A%25252F%25252Flocalhost%25253A8080%25252Fwechat%25252Flogin%25253FcustomParams%25253D%252525257B%2525252522currentPath%2525252522%252525253A%2525252522%252525252F%252525253ForgId%252525253D71%2525252522%252525257D%252526orgId%25253D71&self_redirect=true&styletype=&sizetype=&bgcolor=&rst="))


// // 其中的redirect_uri是微信扫码后回调的url
// console.log(new URL("https://test-inner.cwasp.com/wechat.html?businessUrl=http%253A%252F%252F127.0.0.1%253A5500%252Fwechat%252Flogin%253FcustomParams%253D%2525257B%25252522currentPath%25252522%2525253A%25252522%2525252F%2525253ForgId%2525253D71%25252522%2525257D%2526orgId%253D71"))


// console.log(new URL("http://127.0.0.1:5500/wechat/login?customParams=%257B%2522currentPath%2522%253A%2522%252F%253ForgId%253D71%2522%257D&orgId=71"))


// // 扫码回调url
// console.log(new URL("http://localhost:8080/wechat/login?customParams=%257B%2522currentPath%2522%253A%2522%252F%253ForgId%253D71%2522%257D&orgId=71&code=041aS3000VdapP18NY000AYe844aS30W"
// ))

let a = new URL("http://localhost:8080/wechat/login?customParams=%257B%2522currentPath%2522%253A%2522%252F%253ForgId%253D71%2522%257D&orgId=71&code=041aS3000VdapP18NY000AYe844aS30W")
console.log(a)



"http%253A%252F%252F127.0.0.1%253A5500%252Fwechat%252Flogin%253FcustomParams%253D%2525257B%25252522currentPath%25252522%2525253A%25252522%2525252F%2525253ForgId%2525253D71%25252522%2525257D%2526orgId%253D71"

"http://127.0.0.1:5500/wechat/login?customParams=%257B%2522currentPath%2522%253A%2522%252F%253ForgId%253D71%2522%257D&orgId=71"