const str = "I love JavaScript and Python";

// ❌ 有 g 时，match 不返回捕获组
const result = str.match(/(\w+)/g);
console.log(result); // ["I", "love", "JavaScript", "and", "Python"] → 只有匹配值

// ✅ 如果想获取捕获组信息，去掉 g
const result2 = str.match(/(\w+)/);
console.log(result2); // ["I", "I", index: 0, ...] → 只有第一个