// 旧式函数，arguments 是类数组
function legacySum() {
    let total = 0;
    // 不能直接使用 arguments.forEach
    for (let i = 0; i < arguments.length; i++) {
        total += arguments[i];
    }
    return total;
}

// 更好的方式：转换为数组
function betterSum() {
    const args = Array.from(arguments);
    return args.reduce((a, b) => a + b, 0);
}

// 最佳方式：使用 rest 参数（ES6+）
function bestSum(...args) {
    return args.reduce((a, b) => a + b, 0);
}