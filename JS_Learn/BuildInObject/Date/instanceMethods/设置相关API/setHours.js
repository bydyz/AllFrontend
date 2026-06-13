// 语法
//   dateObj.setHours(hoursValue[, minutesValue[, secondsValue[, msValue]]])

// JavaScript 1.3 版本之前
//   dateObj.setHours(hoursValue)


// 参数
//   hoursValue
//     一个 0 到 23 的整数，表示小时。

//   minutesValue
//     一个 0 到 59 的整数，表示分钟。

//   secondsValue
//     一个 0 到 59 的整数，表示秒数。如果指定了 secondsValue 参数，则必须同时指定 minutesValue 参数。

//   msValue
//     一个 0 到 999 的数字，表示微秒数，如果指定了 msValue 参数，则必须同时指定 minutesValue 和 secondsValue 参数。


// 描述
//   如果不指定 minutesValue，secondsValue 和 msValue 参数，则会使用getMinutes()，getSeconds() 和getMilliseconds() 方法的返回值。

//   如果有一个参数超出了合理范围，setHours 会相应地更新日期对象中的日期信息。例如，如果为 secondsValue 指定了 100，则分钟会加 1，然后秒数使用 40。

//   setHours() 方法根据本地时间为一个日期对象设置小时数，返回从 1970-01-01 00:00:00 UTC 到更新后的 日期 对象实例所表示时间的毫秒数。


const dateItem = new Date("August 19, 1975 23:15:30");
console.log(dateItem)

dateItem.setHours(20);
console.log(dateItem);
// Expected output: "Tue Aug 19 1975 20:15:30 GMT+0200 (CEST)"
// Note: your timezone may vary

dateItem.setHours(20, 21, 22);
console.log(dateItem);
// Expected output: "Tue Aug 19 1975 20:21:22 GMT+0200 (CEST)"