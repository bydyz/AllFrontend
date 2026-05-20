const regex = /test(\d+)/g;
const str = 'test123 test456';
const matches = str.matchAll(regex);

for (const match of matches) {
    console.log(match); // ["test123", "123", index: 0, ...] - 类数组
    console.log(match[0]); // "test123"
    console.log(match[1]); // "123"
    console.log(match.index); // 0
}