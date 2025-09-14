// 语法
//   setUTCHours(hoursValue)
//   setUTCHours(hoursValue, minutesValue)
//   setUTCHours(hoursValue, minutesValue, secondsValue)
//   setUTCHours(hoursValue, minutesValue, secondsValue, msValue)


// 参数
//   hoursValue
//     0 到 23 之间的整数，表示小时数。

//   minutesValue 可选
//     0 到 59 之间的整数，表示分钟数。

//   secondsValue 可选
//     0 到 59 之间的整数，代表秒数。如果指定了 secondsValue，则必须同时指定 minutesValue。

//   msValue 可选
//     0 到 999 之间的整数，表示毫秒数。如果指定了 msValue，则必须同时指定 minutesValue 和 secondsValue。


// 返回值
// 该方法会原地修改 Date 对象，并返回其新的时间戳。如果参数为 NaN（或其他会被强制转换为 NaN 的值，例如 undefined），则日期会被设置为无效日期，并返回 NaN。


// 描述
//   如果你未指定 minutesValue、secondsValue 和 msValue 参数，那么将使用 getUTCMinutes()、getUTCSeconds() 和 getUTCMilliseconds() 方法返回的值。

//   如果你指定的参数超出了预期范围，setUTCHours() 会尝试相应地更新 Date 对象中的日期信息。例如，如果你将 secondsValue 设置为 100，分钟数将增加 1（minutesValue + 1），而秒数将变为 40。


const dateItem = new Date("August 19, 1975 23:15:30 GMT-3:00");

console.log(dateItem.toUTCString());
// Expected output: "Wed, 20 Aug 1975 02:15:30 GMT"

console.log(dateItem.getUTCHours());
// Expected output: 2

dateItem.setUTCHours(23);

console.log(dateItem.toUTCString());
// Expected output: "Wed, 20 Aug 1975 23:15:30 GMT"