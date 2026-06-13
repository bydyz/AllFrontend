// getTime() 方法返回一个时间的格林威治时间数值。

// 你可以使用这个方法把一个日期时间赋值给另一个Date 对象。这个方法的功能和 valueOf() 方法一样。

// 时间轴上有个计算机元年，名为格林威治时间（1970.01.01 00:00:00）,任意一个时间节点和格林威治时间相差的毫秒数就是时间戳的数值

const moonLanding = new Date("July 20, 69 20:17:40 GMT+00:00");

// Milliseconds since Jan 1, 1970, 00:00:00.000 GMT
console.log(moonLanding.getTime());
// Expected output: -14182940000