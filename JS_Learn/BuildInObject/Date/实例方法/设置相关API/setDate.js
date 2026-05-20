// setDate() 方法根据本地时间来指定一个日期对象的天数


const dateItem = new Date("August 19, 1975 23:15:30");

dateItem.setDate(24);

console.log(dateItem) // 08-24
console.log(dateItem.getDate());
// Expected output: 24

dateItem.setDate(32);
// Only 31 days in August!

console.log(dateItem) // 09-01
console.log(dateItem.getDate());
// Expected output: 1