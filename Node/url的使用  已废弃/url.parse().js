// url.parse(urlString[, parseQueryString[, slashesDenoteHost]])    相当于   Node.js url.parse(urlString, parseQueryString, slashesDenoteHost)
// urlString  是url字符串     parseQueryString是boolean,默认false     slashesDenoteHost是boolean,默认false


/* 
require(‘url’).parse(url, parseQueryString, slashesDenoteHost);

默认情况url.parse(url)等价于url.parse(url, false, false);

parseQueryString : 控制解析的 Url {……} 中的 query 字段的值是否为 JSON格式，即{……}；还是普通字符串格式，即 ‘……’。

slashesDenoteHost : 当url是 ‘http://’ 或 ‘ftp://’ 等标志的协议前缀打头的，或直接以地址打头，如 ‘127.0.0.1’ 或 ‘localhost’ 时候是没有区别的；当且仅当以2个斜杠打头的时候，比如 ‘//127.0.0.1’ 才有区别。这时候，如果其值为true，则第一个单个 ‘/’ 之前的部分被解析为 ‘host’ 和 ‘hostname’，如 ” host : ‘127.0.0.1’ “，如果为false，包括2个反斜杠在内的所有字符串被解析为pathname。
*/


var path = '//localhost/www/index?name=bob&password=123456';

console.log(url.parse(path));
/* 
Url {
  protocol: null,
  slashes: null,
  auth: null,
  host: null,
  port: null,
  hostname: null,
  hash: null,
  search: '?name=bob&password=123456',
  query: 'name=bob&password=123456',
  pathname: '//localhost/www/index',
  path: '//localhost/www/index?name=bob&password=123456',
  href: '//localhost/www/index?name=bob&password=123456'
}
 */

let a = url.parse(path)
console.log(JSON.stringify(a))
/* 
{"protocol":null,"slashes":null,"auth":null,"host":null,"port":null,"hostname":null,"hash":null,"search":"?name=bob&password=123456","query":"name=bob&password=123456","pathname":"//localhost/www/index","path":"//localhost/www/index?name=bob&password=123456","href":"//localhost/www/index?name=bob&password=123456"}
 */

console.log(url.parse(path,true));
/* 
Url {
  protocol: null,
  slashes: null,
  auth: null,
  host: null,
  port: null,
  hostname: null,
  hash: null,
  search: '?name=bob&password=123456',
  query: [Object: null prototype] { name: 'bob', password: '123456' },
  pathname: '//localhost/www/index',
  path: '//localhost/www/index?name=bob&password=123456',
  href: '//localhost/www/index?name=bob&password=123456'
}
*/

let b = url.parse(path,true)
console.log(JSON.stringify(b))
/* 
{"protocol":null,"slashes":null,"auth":null,"host":null,"port":null,"hostname":null,"hash":null,"search":"?name=bob&password=123456","query":{"name":"bob","password":"123456"},"pathname":"//localhost/www/index","path":"//localhost/www/index?name=bob&password=123456","href":"//localhost/www/index?name=bob&password=123456"}
*/

console.log(url.parse(path, true, true))
/* 
Url {
  protocol: null,
  slashes: true,
  auth: null,
  host: 'localhost',
  port: null,
  hostname: 'localhost',
  hash: null,
  search: '?name=bob&password=123456',
  query: [Object: null prototype] { name: 'bob', password: '123456' },
  pathname: '/www/index',
  path: '/www/index?name=bob&password=123456',
  href: '//localhost/www/index?name=bob&password=123456'
}
*/







// 以上内容需要用  REPL  来使用

//npm install url
import url from 'url'

// const router = new VueRouter({
//   path: '/index'
// })
// export default router
// 此处利用node运行，没有用！！！