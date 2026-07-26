// 使用数组方法处理类数组
function processArguments() {
    // 过滤参数
    const numbers = Array.from(arguments)
        .filter(arg => typeof arg === 'number');
    
    // 映射参数
    const doubled = Array.from(arguments)
        .map(arg => arg * 2);
    
    // 查找参数
    const firstString = Array.from(arguments)
        .find(arg => typeof arg === 'string');
}