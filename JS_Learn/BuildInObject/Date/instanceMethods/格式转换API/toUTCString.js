// toUTCString() 方法把一个日期转换为一个字符串，使用 UTC 时区。



const dateItem = new Date("14 Jun 2017 00:00:00 PDT");

console.log(dateItem.toUTCString());
// Expected output: "Wed, 14 Jun 2017 07:00:00 GMT"