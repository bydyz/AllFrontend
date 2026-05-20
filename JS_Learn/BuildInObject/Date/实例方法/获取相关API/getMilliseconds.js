// getMilliseconds() 方法根据本地时间，返回一个指定的日期对象的毫秒数。

const moonLanding = new Date("July 20, 69 00:20:18");
moonLanding.setMilliseconds(123);

console.log(moonLanding)
// Expected output: 1969-07-19T16:20:18.123Z
console.log(moonLanding.getMilliseconds());
// Expected output: 123