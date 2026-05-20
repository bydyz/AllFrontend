// 语法
//   setMilliseconds(millisecondsValue)

// 参数
//   millisecondsValue
//     一个在 0 到 999 之间的整数，表示毫秒数。

// 返回值
//   原地更改 Date 对象，并返回新的时间戳。如果 millisecondsValue 是 NaN（或任何其他经强制转换后得到 NaN 的值，如 undefined），日期会被设置为无效日期，并返回 NaN。

// 描述
//   如果指定的数字超出了合理范围，则 Date 对象的时间信息会被相应地更新。例如，如果指定了 1005，则秒数加 1，毫秒数为 5。
//   Date 实例的 setMilliseconds() 方法会根据本地时间设置一个日期对象的毫秒数。


const dateItem = new Date("August 19, 1975 23:15:30");

console.log(dateItem.getMilliseconds());
// Expected output: 0

dateItem.setMilliseconds(456);
console.log(dateItem)

console.log(dateItem.getMilliseconds());
// Expected output: 456