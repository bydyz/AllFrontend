// getDay() 方法根据本地时间，返回一个具体日期中一周的第几天，0 表示星期天。

const birthday = new Date("August 19, 1975 23:15:30");
const day1 = birthday.getDay();
// Sunday - Saturday : 0 - 6

console.log(day1);
// Expected output: 2