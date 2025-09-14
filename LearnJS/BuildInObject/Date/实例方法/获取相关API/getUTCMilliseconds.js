// getUTCMilliseconds() 方法以世界时为标准，返回一个指定的日期对象的毫秒数。


const exampleDate = new Date("2018-01-02T03:04:05.678Z"); // 2 January 2018, 03:04:05.678 (UTC)

console.log(exampleDate.getUTCMilliseconds());
// Expected output: 678