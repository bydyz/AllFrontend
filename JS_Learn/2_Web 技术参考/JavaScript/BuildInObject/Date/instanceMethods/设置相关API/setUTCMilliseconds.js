// 语法
//   dateObj.setUTCMilliseconds(millisecondsValue)


// 参数
//   millisecondsValue
//     0 - 999 之间的数值，代表毫秒数。


// 返回值
//   返回更新后的时间距 1970 年 1 月 1 日 00:00:00 (UTC) 的毫秒数。


// 描述
//   如果传递的参数超出了指定的范围，setUTCMilliseconds() 方法会相应地尝试更新储存在 Date 的时间信息。例如，假设你传递参数的值是 1100，存储在 Date 的秒数会加 1，然后使用 100 来作为毫秒数。



const date1 = new Date("2018-01-24T12:38:29.069Z");

console.log(date1.getUTCMilliseconds());
// Expected output: 69

date1.setUTCMilliseconds(420);

console.log(date1.getUTCMilliseconds());
// Expected output: 420