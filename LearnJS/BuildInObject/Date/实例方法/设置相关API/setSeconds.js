// setSeconds() 方法根据本地时间设置一个日期对象的秒数。


const dateItem = new Date("August 19, 1975 23:15:30");

dateItem.setSeconds(42);

console.log(dateItem.getSeconds());
// Expected output: 42

console.log(dateItem);
// 1975-08-19T15:15:42.000Z