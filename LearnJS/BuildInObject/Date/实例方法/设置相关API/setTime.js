// setTime() 方法以一个表示从 1970-1-1 00:00:00 UTC 计时的毫秒数为来为 Date 对象设置时间。


const launchDate = new Date("July 1, 1999, 12:00:00");
const futureDate = new Date();

console.log(launchDate, futureDate)
// 1999-07-01T04:00:00.000Z 2025-09-13T15:31:52.460Z

futureDate.setTime(launchDate.getTime());
console.log(futureDate);
// Expected output: "Thu Jul 01 1999 12:00:00 GMT+0200 (CEST)"

const fiveMinutesInMillis = 5 * 60 * 1000;
futureDate.setTime(futureDate.getTime() + fiveMinutesInMillis);
console.log(futureDate);