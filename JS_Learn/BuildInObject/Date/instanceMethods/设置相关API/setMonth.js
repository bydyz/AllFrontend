// setMonth() 方法根据本地时间为一个日期对象设置月份。


const dateItem = new Date("August 19, 1975 23:15:30");

dateItem.setMonth(3);

console.log(dateItem.getMonth());
// Expected output: 3

console.log(dateItem);
// 1975-04-19T15:15:30.000Z
