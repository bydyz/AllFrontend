var aFileParts = ['<a id="a"><b id="b">hey!</b></a>']; 

var oMyBlob = new Blob(aFileParts, {type : 'text/html'});

console.log(oMyBlob);
// => Blob {size: 32, type: 'text/html'}

console.log(oMyBlob.slice(0, 1024, 'text/html'))




/* 
Blob(array[, options])

Blob()构造函数返回一个新的Blob对象，blob的内容由参数数组中给出的值的串联组成

[注意]IE9-浏览器不支持

参数array是一个由ArrayBuffer、ArrayBufferView、Blob、DOMString等对象构成的Array，或者其他类似对象的混合体，它将会被放进Blob

参数options是一个可选项，它可能会指定如下两种属性：

1、类型，默认值为""，它代表了将会被放入到blob中的数组内容的MIME类型  https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_types

2、结束符，默认值为"transparent"，它代表包含行结束符\n的字符串如何被输出。它是以下两个值中的一个：“native”，代表行结束符会被更改为适合宿主操作系统文件系统的惯例，或者"transparent"，代表会保持blob中保存的结束符不变

var aFileParts = ['<a id="a"><b id="b">hey!</b></a>']; 
var oMyBlob = new Blob(aFileParts, {type : 'text/html'}); 
console.log(oMyBlob);//Blob {size: 32, type: "text/html"}

属性和方法
Blob是不透明的，能对它们进行直接操作的就只有获取它们的大小(以字节为单位)、MIME类型以及将它们分割成更小的Blob

Blob.size(只读):返回Blob对象中所包含数据的大小(字节)

Blob.type(只读):一个字符串，表明该Blob对象所包含数据的MIME类型。如果类型未知，则该值为空字符串

var myBlob = new Blob([1,2,3],{type:'text/plain'});
console.log(myBlob);//Blob {size: 3, type: "text/plain"}
console.log(myBlob.size);//3
console.log(myBlob.type);//'text/plain'



Blob.slice([start[, end[, contentType]]])

slice()方法返回一个新的Blob对象，包含了源Blob对象中指定范围内的数据

var subblob = blob.slice(0,1024, "text/plain");//Blob中前1KB视为文本
var last = blob.slice(blob.size-1024, 1024);//Blob中最后1KB视为无类型

Web浏览器可以将Blob存储到内存中或者磁盘上，Blob可以表示非常大的数据块(比如视频文件)，如果事先不用slice()方法将它们分割成为小数据块的话，无法存储在主内存中。正是因为Blob可以表示非常大的数据块，并且它可能需要磁盘的访问权限，所以使用它们的API是异步的(在Worker线程中有提供相应的同步版本)
*/