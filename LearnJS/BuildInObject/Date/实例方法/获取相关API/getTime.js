// getTime() 方法返回一个时间的格林威治时间数值。

// 你可以使用这个方法把一个日期时间赋值给另一个Date 对象。这个方法的功能和 valueOf() 方法一样。


const moonLanding = new Date("July 20, 69 20:17:40 GMT+00:00");

// Milliseconds since Jan 1, 1970, 00:00:00.000 GMT
console.log(moonLanding.getTime());
// Expected output: -14182940000