// 频繁转换可能影响性能
// 如果需要多次操作，最好一次性转换
const nodeList = document.querySelectorAll('div');
const elements = Array.from(nodeList); // 只转换一次

// 然后多次使用
elements.forEach(el => el.style.color = 'red');
elements.forEach(el => el.classList.add('active'));