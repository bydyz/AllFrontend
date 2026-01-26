// NodeList - 大部分查询方法返回的
const nodeList = document.querySelectorAll('div');
console.log(nodeList);       // NodeList [div, div, div]
console.log(nodeList.length); // 3
console.log(nodeList[0]);    // <div>元素

// HTMLCollection
const htmlCollection = document.getElementsByClassName('item');
const forms = document.forms;           // HTMLCollection
const images = document.images;         // HTMLCollection