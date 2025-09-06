var aFileParts = ['<a id="a"><b id="b">hey!</b></a>']; 

var oMyBlob = new Blob(aFileParts, {type : 'text/html'});

var objectURL = URL.createObjectURL(oMyBlob);

console.log(objectURL)
// => blob:http://127.0.0.1:5500/7a9566a6-6470-405a-bbe6-5eccd1750549  前面的是打开的本地服务



/* 

Blob URL
前面介绍了如何获取或者创建Blob。下面来介绍如何对获取或者创建的Blob进行操作。其中最简单的就是可以创建一个URL来指向该Blob。随后，可以以一般的URL形式在任何地方使用该URL：在D0M中、在样式表中、甚至可以作为XMLHttpRequest的目标

【createObjectURL()】

使用createObjectURL()函数可以创建一个Blob URL。URL.createObjectURL()静态方法会创建一个DOMString，它的URL表示参数中的对象。这个URL的生命周期和创建它的窗口中的document绑定。这个新的URL对象表示着指定的File对象或者Blob对象

objectURL = URL.createObjectURL(blob);
1
传递一个Blob给createObjectURL()方法会返回一个URL(以普通字符串形式)。该URL以blob://开始，紧跟着是一小串文本字符串，该字符串用不透明的唯一标识符来标识Blob

var xhr = new XMLHttpRequest();     
xhr.open('GET','test/p5.gif');    
xhr.responseType = 'blob';    
xhr.onload = function(){ 
    //blob:http://127.0.0.1/539ae798-70db-44db-b216-fc932b358285
    console.log(URL.createObjectURL(xhr.response));
}    
xhr.send(null);
1
2
3
4
5
6
7
8
[注意]blob://URL和data://URL是不同的，data://URL会对内容进行编码。blob://URL只是对浏览器存储在内存中或者磁盘上的Blob的一个简单引用

【file URL】

blob://URL和file://URL也是不同的，file://URL直接指向本地文件系统中的一个文件，仅暴露了文件的路径、浏览目录的许可等，除此之外任何内容都会带来安全问题的

Blob URL和创建它们的脚本拥有同样的源。这使得它们比file://URL更加灵活，由于file://URL是非同源的，因此要在Web应用中使用它们相对比较麻烦。Blob://URL只有在同源的文档中才是有效的。比如，如果将一个Blob URL通过postMessage()传递给一个非同源窗口，则该URL对于该窗口来说是没有任何意义的

Blob URL并不是永久有效的。一旦用户关闭了或者离开了包含创建Blob URL脚本的文 档，该Blob URL就失效了。比如，将Blob URL保存到本地存储器中，然后当用户开始一个新的Web应用会话的时再使用它，是不可能的

【URL.revokeObjectURL()】

URL.revokeObjectURL()静态方法用来释放一个之前通过调用URL.createObjectURL() 创建的已经存在的URL对象。当结束使用某个URL对象时，应该通过调用这个方法来让浏览器知道不再需要保持这个文件的引用了

window.URL.revokeObjectURL(objectURL);
1
参数objectURL是一个DOMString，表示通过调用URL.createObjectURL()方法产生的URL对象

之所以提供这样的方式，是因为这和内存管理问题有关。一旦使用之后，Blob就不再需要了，应当回收它。但是，如果Web浏览器正维护创建的Blob和Blob URL之间的映射关系，那么即使该Blob已经不用了，也不会被回收。javascript解释器无法跟踪字符串的使用情况，如果URL仍然是有效的，那么它只能认为该URL可能还在用。这就意味着，在手动撤销该URL之前，是不会将其回收的

用之后，Blob就不再需要了，应当回收它。但是，如果Web浏览器正维护创建的Blob和Blob URL之间的映射关系，那么即使该Blob已经不用了，也不会被回收。javascript解释器无法跟踪字符串的使用情况，如果URL仍然是有效的，那么它只能认为该URL可能还在用。这就意味着，在手动撤销该URL之前，是不会将其回收的

*/

