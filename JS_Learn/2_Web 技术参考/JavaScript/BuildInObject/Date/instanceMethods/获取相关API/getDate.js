// 根据本地时间，返回一个指定的日期对象为一个月中的哪一日（从 1--31）。

const birthday = new Date("August 19, 1975 23:15:30");
const date1 = birthday.getDate();

console.log(date1);
// Expected output: 19