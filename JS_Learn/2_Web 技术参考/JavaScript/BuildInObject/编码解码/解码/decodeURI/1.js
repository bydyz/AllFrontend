// decodeURI() 函数能解码由encodeURI 创建或其他流程得到的统一资源标识符（URI）。


// decodeURI(encodedURI)

// 参数
//   encodedURI
//     一个完整的编码过的 URI

// 返回值
//   返回一个给定编码统一资源标识符 (URI) 的未编码版本的新字符串。


console.log(decodeURI(
  "https://developer.mozilla.org/ru/docs/JavaScript_%D1%88%D0%B5%D0%BB%D0%BB%D1%8B",
));
// "https://developer.mozilla.org/ru/docs/JavaScript_шеллы"