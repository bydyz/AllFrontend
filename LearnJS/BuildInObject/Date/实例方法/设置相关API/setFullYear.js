// setFullYear() 方法根据本地时间为一个日期对象设置年份。


const dateItem = new Date("August 19, 1975 23:15:30");

dateItem.setFullYear(1969);

console.log(dateItem.getFullYear());
// Expected output: 1969

dateItem.setFullYear(0);

console.log(dateItem.getFullYear());
// Expected output: 0