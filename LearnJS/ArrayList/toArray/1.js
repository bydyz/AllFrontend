const nodeList = document.querySelectorAll('div');
const realArray = Array.from(nodeList);

function example() {
    const argsArray = Array.from(arguments);
    argsArray.push(4); // 现在可以使用数组方法了
}

// 带映射函数的转换
const str = '123';
const numArray = Array.from(str, Number); // [1, 2, 3]