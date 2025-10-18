// 示例 URL: https://www.example.com:8080/products/search?id=123&category=books#reviews

const url = new URL('https://www.example.com:8080/products/search?id=123&category=books#reviews');

console.log('=== URL 组成部分 ===');
console.log('href (完整URL):', url.href);
// https://www.example.com:8080/products/search?id=123&category=books#reviews

console.log('protocol (协议):', url.protocol);
// https:

console.log('hostname (主机名):', url.hostname);
// www.example.com

console.log('port (端口):', url.port);
// 8080

console.log('host (主机):', url.host);
// www.example.com:8080  (hostname + port)

console.log('origin (源):', url.origin);
// https://www.example.com:8080  (protocol + host)

console.log('pathname (路径):', url.pathname);
// /products/search

console.log('search (查询参数):', url.search);
// ?id=123&category=books

console.log('searchParams (参数对象):', url.searchParams);
// URLSearchParams { 'id' => '123', 'category' => 'books' }

console.log('hash (哈希):', url.hash);
// #reviews