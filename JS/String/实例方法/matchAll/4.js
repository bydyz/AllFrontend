const str = "Prices: $25, $30, $45";

const regex = /\$(\d+)/g;
const matches = str.matchAll(regex);

// 转为数组，方便后续处理
const results = Array.from(matches);

console.log(results);