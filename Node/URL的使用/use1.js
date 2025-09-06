let a = '8fa43ae1b7b274b097429a452e80e0ddcb7a15bec291606ead0d342dbea5bed7a2dae7b3659f6eb3a68b211174f1257570fb36c621d80f805eb6f7ffc667dec490f53a482d0a924b3051be62d2fdbb6b5431a6bf3dc635bd8ad33f8ea7b6a1bac1b4bec3fb002c559e346fde176c858a5bbf63bafdd0e6ff0f748d2f49b90315c50d68eb96c4c194e6d01e3177c857f5779542604725a537ad7ee8d78bbedebef61b6a9178b1079f9957081a5a6be6b67e3e64e07e7f58bc9455475fb4238802d3e042'

// 安装了一个  js-base64  插件，用以base64加密和解密
/* 
  npm install --save js-base64

  let Base64 = require('js-base64').Base64

  Base64.encode('你好')   // 5L2g5aW9
  Base64.decode('5L2g5aW9')  // 你好
*/


var Base64 = require('js-base64').Base64

let c = Base64.decode(a);

// let d = decodeURIComponent(b)

console.log(c)
