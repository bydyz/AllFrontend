// XMLHttpRequest 是一个用于在前端 JavaScript 中进行 HTTP 请求的对象，它提供了与服务器进行通信的功能，可以用于获取、发送和处理数据。以下是关于 XMLHttpRequest 的各种信息

// 属性/方法	                              描述

// 属性	
// onreadystatechange	                    一个事件处理程序，用于在请求状态发生变化时触发。常用于检测请求完成或失败。
// readyState	                            表示请求的状态，有 5 个可能的值，从 0 到 4，分别表示不初始化、已启动、已发送、已接收、完成。
// status	HTTP                            状态码，表示请求的结果。200 表示成功，404 表示未找到，等等。
// statusText	HTTP                        状态码对应的文本描述。
// response	                              从服务器返回的响应数据，可以是文本、XML、JSON 或二进制数据，具体取决于 responseType 的设置。
// responseText	                          以字符串形式返回的响应文本数据。
// responseXML	                          以 XML 文档形式返回的响应数据。
// responseType	                          设置响应类型，可以是 "text"、"arraybuffer"、"blob"、"document"、"json" 等。

// 方法	
// open(method, url, async)	              初始化一个请求。method 表示请求方法（GET、POST 等），url 表示请求的 URL，async 表示请求是否为异步。
// send(data)	                            发送请求，可选择性传递请求数据。
// setRequestHeader(name, value)	        设置请求头，如设置请求的内容类型、授权信息等。
// abort()	中止请求。
// getAllResponseHeaders()	              获取所有响应头信息。
// getResponseHeader(name)	              获取指定响应头的值。












// 创建 XMLHttpRequest 对象
var xhr = new XMLHttpRequest();

// 配置请求
xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts/1', true);

// 设置请求完成后的处理程序
xhr.onreadystatechange = function() {

  // ! 执行3次，  readyState 的值为  2  3  4
  console.log('11111111111111111111111111111111111111111111111111111111', xhr)
  console.log('22222222222222222222222222222222222222222222222222222222', JSON.parse(xhr.responseText))

  if (xhr.readyState === 4 && xhr.status === 200) {
    // 请求成功，处理响应数据
    var response = JSON.parse(xhr.responseText);
    console.log('Response:', response);
  } else if (xhr.readyState === 4 && xhr.status !== 200) {
    // 请求失败
    console.log('Request failed with status:', xhr.status);
  }
};

// 发送请求
// xhr.send();


// 在此示例中，我们创建了一个 XMLHttpRequest 对象，然后使用它发送 GET 请求到指定的 URL。我们设置了 onreadystatechange 处理程序，以在请求完成后处理响应数据。如果请求成功，我们解析响应的 JSON 数据，并将其打印到控制台。如果请求失败，我们记录失败的 HTTP 状态码。这是一个基本的 XMLHttpRequest 示例，用于发送和处理 HTTP 请求。

















var xhr2 = new XMLHttpRequest()
xhr2.open('GET', 'http://112.125.90.247:81/api/Data/GetAsync', true)
// 
xhr2.responseType = 'blob'
xhr2.onload = () => {
  if(xhr2.status === 200) {
    console.log('3333333333333333333333333333333333', xhr2)
  }
}
xhr2.send()


// onload 是 XMLHttpRequest 对象的事件处理程序属性之一，它用于处理请求成功完成时触发的事件。当请求完成并且服务器返回响应时，onload 事件会被触发。

// 当请求完成时，onload 事件会触发，然后我们检查 xhr.status 来确定请求是否成功。如果状态码为 200，表示请求成功，我们可以处理响应数据；否则，我们记录请求失败。

// 注意事项:

// 兼容性：onload 事件处理程序适用于现代浏览器，但在旧版本的 Internet Explorer（IE）中可能存在兼容性问题。在处理旧浏览器时，需要注意。

// HTTP 状态码：在 onload 事件处理程序中，通常使用 xhr.status 来检查HTTP响应状态码。状态码为 200 表示成功，但您也可以根据需要处理其他状态码。

// 异步请求：onload 事件通常用于处理异步请求的响应。异步请求不会阻塞JavaScript执行，因此在请求完成之前，JavaScript将继续执行其他代码。

// 处理响应：在 onload 处理程序中，您可以访问 xhr.responseText 来获取响应文本数据，或使用 xhr.response 来获取其他响应类型，如 JSON、二进制数据等。

// 错误处理：如果请求失败，onload 处理程序中的错误处理非常重要。您可以检查 xhr.status 并采取适当的措施，如重新尝试请求或显示错误消息。

// 跨域请求：在跨域请求中，浏览器会执行预检请求，检查跨域请求是否被服务器允许。在跨域请求的情况下，您需要处理跨域请求的复杂性，包括设置 CORS 头和处理潜在的安全问题。

// 总之，onload 方法是用于处理 XMLHttpRequest 请求成功完成的事件的一种方式。它允许您根据请求的状态码来处理响应数据，并执行相应的操作。在处理异步请求时，onload 是一种常用的处理方式。









// XMLHttpRequest 对象的 responseType 属性用于指定请求的响应类型，决定了在 XMLHttpRequest 请求中如何处理响应数据。以下是 responseType 的取值以及它们的意义和默认值

// """ (空字符串)：
// 意义：默认值。浏览器将根据响应的内容类型自动处理响应数据。如果响应是 JSON 格式，浏览器会自动解析为 JavaScript 对象。如果是 XML，它会自动解析为 XML 文档。
// 示例：
var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://example.com/data.json', true);
xhr.send();
//! 默认情况下，响应数据会根据内容类型自动解析

// "text"：
// 意义：将响应数据作为纯文本（字符串）返回，不进行任何自动解析。
// 示例：
var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://example.com/data.xml', true);
xhr.responseType = 'text';
xhr.send();
// 响应数据会作为纯文本字符串返回

// "arraybuffer"：
// 意义：将响应数据作为 ArrayBuffer 对象返回，适用于处理二进制数据。
// 示例：
var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://example.com/binary-data', true);
xhr.responseType = 'arraybuffer';
xhr.send();
// 响应数据会作为ArrayBuffer返回

// "blob"：
// 意义：将响应数据作为 Blob 对象返回，通常用于处理二进制数据或文件下载。
// 示例：
var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://example.com/file.pdf', true);
xhr.responseType = 'blob';
xhr.send();
// 响应数据会作为Blob对象返回

// "document"：
// 意义：将响应数据解析为 HTML 或 XML 文档对象。
// 示例：
var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://example.com/page.html', true);
xhr.responseType = 'document';
xhr.send();
// 响应数据会作为HTML或XML文档对象返回

// "json"：
// 意义：将响应数据解析为 JavaScript 对象。适用于处理 JSON 格式的数据。
// 示例：
var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://example.com/data.json', true);
xhr.responseType = 'json';
xhr.send();
// 响应数据会作为JavaScript对象返回

// 设置 responseType 的值是为了告诉浏览器如何解释响应数据。根据不同的 responseType，浏览器会以不同的方式处理数据。这可以提高性能并简化处理响应的过程。例如，如果您知道响应是 JSON 格式，将 responseType 设置为 "json" 将自动解析 JSON 数据，无需手动执行 JSON.parse()。

// 请注意，一些 responseType 仅适用于特定类型的响应数据，例如 "blob" 和 "arraybuffer" 适用于处理二进制数据，而 "json" 适用于 JSON 数据。选择正确的 responseType 取决于您的需求以及服务器返回的数据类型。如果选择不当，可能会导致错误或不符合预期的结果。












// XMLHttpRequest 对象的 setRequestHeader 方法用于设置 HTTP 请求头。HTTP 请求头包含与请求相关的信息，如内容类型、授权信息等。以下是 setRequestHeader 方法可用的常见请求头以及它们的意义：

// "Accept":
// 意义: 指定客户端接受的响应内容类型，如 "application/json" 表示接受 JSON 格式的响应。
// 默认值: 无默认值。

// "Authorization":
// 意义: 用于在请求中发送身份验证信息，通常是用户名和密码或令牌。
// 默认值: 无默认值。

// "Content-Type":
// 意义: 指定请求体的媒体类型。用于告诉服务器请求中包含的数据类型，如 "application/json" 表示请求体是 JSON 数据。
// 默认值: 无默认值。

// "User-Agent":
// 意义: 标识发送请求的用户代理（浏览器或客户端应用程序）。
// 默认值: 通常由浏览器自动生成。

// "Referer":
// 意义: 表示请求是从哪个页面或 URL 发起的，用于跟踪请求的来源。
// 默认值: 通常由浏览器自动生成。

// "Accept-Encoding":
// 意义: 告知服务器客户端支持的内容编码方式，如 "gzip" 或 "deflate"。
// 默认值: 通常由浏览器自动生成。

// "Cookie":
// 意义: 用于在请求中发送服务器之前存储在客户端的 Cookie 数据。
// 默认值: 取决于浏览器，通常为空。

// "Origin":
// 意义: 标识请求的来源，用于执行同源策略的浏览器安全检查。
// 默认值: 通常由浏览器自动生成。

// 设置请求头的作用是为了提供与请求相关的信息，以便服务器能够正确处理请求。不同的请求头提供了不同类型的信息，如身份验证信息、内容类型、接受的响应类型等。设置请求头可以定制请求以满足特定需求，例如：

// 如果您要发送包含 JSON 数据的 POST 请求，可以设置 "Content-Type" 为 "application/json"，以告诉服务器请求体中包含的是 JSON 数据。
// 如果您需要在请求中包含身份验证令牌，可以设置 "Authorization" 请求头，以在服务器上进行身份验证。
// 请注意，设置请求头可能会受到浏览器的同源策略（Same-Origin Policy）的限制。某些请求头需要服务器允许跨域请求才能生效。如果您在进行跨域请求，要确保服务器已配置为允许您设置所需的请求头。

// 总之，setRequestHeader 方法用于自定义和定制HTTP请求的头部信息，以便与服务器通信并确保请求能够被正确处理。请求头的选择和设置依赖于您的应用程序需求和服务器的期望。













// var able = new XMLHttpRequest();

// console.log(able)