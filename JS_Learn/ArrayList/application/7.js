const list = document.querySelectorAll('div');

// 现代浏览器中，NodeList 可能有这些方法
if (list.forEach) {
    list.forEach(item => console.log(item));
}

// 支持：forEach, entries, keys, values
// 不支持：map, filter, reduce 等