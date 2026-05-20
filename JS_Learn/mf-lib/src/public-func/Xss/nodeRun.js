// 首先  npm install xss  然后下列代码即可运行    node_modules会安装到最上面的就已经存在的node_modules中

var xss = require('xss');

console.log(xss)

// //   onIgnoreTagAttr  的作用似乎是过滤  tag的标签的属性名
// var source = '<div a="1" b="2" data-a="3" data-b="4">hello</div>';
// var html = xss(source, {
//   onIgnoreTagAttr: function (tag, name, value, isWhiteAttr) {
//     if (name.substr(0, 5) === 'data-') {      //substr() 方法可在字符串中抽取从 start 下标开始的指定数目的字符。
//       // 通过内置的escapeAttrValue函数来对属性值进行转义
//       return name + '="' + xss.escapeAttrValue(value) + '"';
//     }
//   }
// }); 

// console.log('%s\nconvert to:\n%s', source, html);     
/* 
source
convert to 
html
*/



/* 
结果是：

<div a="1" b="2" data-a="3" data-b="4">hello</div>
convert to:
<div data-a="3" data-b="4">hello</div>

*/









// // onIgnoreTag  的作用似乎是过滤标签，符合要求的不过滤(转义)，不符合的转成   &lt  &gt
// var source = '<x><x-1>he<x-2 checked></x-2>wwww</x-1><a>';
// var html = xss(source, {
//   onIgnoreTag: function (tag, html, options) {
//     if (tag.substr(0, 2) === 'x-') {
//       // 不对其属性列表进行过滤
//       return html;
//     }
//   }
// });

// console.log('%s\nconvert to:\n%s', source, html);



/* 
结果是：

<x><x-1>he<x-2 checked></x-2>wwww</x-1><a>
convert to:
&lt;x&gt;<x-1>he<x-2 checked></x-2>wwww</x-1><a>

*/















// 将符合要求的标签的属性的值放到list
// var source = '<img src="img1">a<img src="img2">b<img src="img3">c<img src="img4">d';
// var list = [];
// var html = xss(source, {
//   onTagAttr: function (tag, name, value, isWhiteAttr) {
//     if (tag === 'img' && name === 'src') {
//       // 使用内置的friendlyAttrValue函数来对属性值进行转义，可将&lt;这类的实体标记转换成打印字符<
//       list.push(xss.friendlyAttrValue(value));
//     }
//     // 不返回任何值，表示还是按照默认的方法处理
//   }
// });

// console.log('image list:\n%s', list.join(', '));

// console.log('html', html)

/* 

结果是：

image list:
img1, img2, img3, img4

html    <img src>a<img src>b<img src>c<img src>d

*/













// var source = '<strong class="a">hello</strong><script>alert(/xss/);</script>end';
// var html = xss(source, {
//   whiteList:          {},        // 白名单为空，表示过滤所有标签
//   stripIgnoreTag:     true,      // 过滤所有非白名单标签的HTML，包括其中的所有内容
//   stripIgnoreTagBody: ['script'] // script标签较特殊，需要过滤标签中间的内容
// });

// console.log('text: %s', html);   // 结果： text: helloend