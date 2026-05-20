// searchParams 是 URL 对象特有的，location 没有直接对应属性
const urlObj = new URL('https://example.com?name=John&age=30&city=NewYork');

console.log('=== searchParams 对比 ===');

// URL 对象的 searchParams
console.log('urlObj.searchParams:', urlObj.searchParams);
// URLSearchParams { 'name' => 'John', 'age' => '30', 'city' => 'NewYork' }

console.log('urlObj.searchParams.get("name"):', urlObj.searchParams.get('name')); // "John"
console.log('urlObj.searchParams.toString():', urlObj.searchParams.toString()); // "name=John&age=30&city=NewYork"

// window.location 需要手动处理 search
console.log('window.location.search:', '?name=John&age=30&city=NewYork');



// 手动解析 search 参数
// const searchParams = new URLSearchParams(window.location.search);
// console.log('手动解析的 searchParams:', searchParams);