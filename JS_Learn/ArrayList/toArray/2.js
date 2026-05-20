function sum(...args) {
    // args 已经是真正的数组了
    return args.reduce((a, b) => a + b, 0);
}

const nodeList = document.querySelectorAll('div');
const array = [...nodeList]; // 转换为数组

const str = 'hello';
const chars = [...str]; // ['h', 'e', 'l', 'l', 'o']