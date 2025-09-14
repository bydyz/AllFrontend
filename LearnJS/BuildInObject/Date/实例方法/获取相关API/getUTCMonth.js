// getUTCMonth() 方法以世界时为标准，返回一个指定的日期对象的月份，它是从 0 开始计数的（0 代表一年的第一个月）。


const date1 = new Date("December 31, 1975, 23:15:30 GMT+11:00");
const date2 = new Date("December 31, 1975, 23:15:30 GMT-11:00");

// December
console.log(date1.getUTCMonth());
// Expected output: 11

// January
console.log(date2.getUTCMonth());
// Expected output: 0