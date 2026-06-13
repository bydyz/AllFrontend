// 语法
//   dateObj.setUTCMonth(monthValue[, dayValue])


// 参数
//   monthValue
//     一个 0-11 的整数，代表 1 月到 12 月。

//   dayValue
//     可选参数：一个 1-31 的整数，代表一个月的天数。


// 返回值
//   这个数值是从 1970 年 1 月 1 号 00:00:00 到当前时间的毫秒数（国际通用时间）


// 描述
//   如果你没有明确书写dayValue 这个参数，那么就会从getUTCDate() 方法返回对应的数值。

//   如果你写了一个超过在规定的范围内的参数。setUTCMonth() 就会试图相应的更新时间信息在 Data 对象中。例如，如果你用 15 作为 monthValue 的值，那么年份就会加 1，并且月份会变成 3。（15=12+3）



const dateItem = new Date("December 31, 1975 23:15:30 GMT-3:00");

console.log(dateItem.toUTCString());
// Expected output: "Thu, 01 Jan 1976 02:15:30 GMT"

console.log(dateItem.getUTCMonth());
// Expected output: 0

dateItem.setUTCMonth(11);

console.log(dateItem.toUTCString());
// Expected output: "Wed, 01 Dec 1976 02:15:30 GMT"