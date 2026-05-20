// 语法
//   Date.UTC(year)
//   Date.UTC(year, month)
//   Date.UTC(year, month, day)
//   Date.UTC(year, month, day, hour)
//   Date.UTC(year, month, day, hour, minute)
//   Date.UTC(year, month, day, hour, minute, second)
//   Date.UTC(year, month, day, hour, minute, second, millisecond)


// 参数
//   year
//     一个表示年份的整数值。
//     从 0 到 99 的值会被映射到 1900 至 1999 年。其他的值则代表实际的年份。

//   month 可选
//     0（一月）到 11（十二月）之间的一个整数，表示月份。从 ECMAScript 2017 开始，如果忽略该值，则默认为 0。
//     （直到 ECMAScript 2016，month 都是必须的参数。而从 ES2017 开始，它不再是必须的。）

//   date 可选
//     1 到 31 之间的一个整数，表示某月当中的第几天。如果忽略该值，则默认为 1。

//   hour 可选
//     0 到 23 之间的一个整数，表示小时。如果忽略该值，则默认为 0。

//   minute 可选
//     0 到 59 之间的一个整数，表示分钟。如果忽略该值，则默认为 0。

//   second 可选
//     0 到 59 之间的一个整数，表示秒。如果忽略该值，则默认为 0。

//   millisecond 可选
//     0 到 999 之间的一个整数，表示毫秒。如果忽略该值，则默认为 0。

// 返回值
//   一个数字，表示从 1970 年 1 月 1 日 00:00:00 UTC 到给定时间的毫秒数。

// 描述
//   UTC() 方法接受以逗号隔开的时间参数，返回 1970 年 1 月 1 日 00:00:00 UTC 到指定的时间之间的毫秒数。

//   如果年份被指定为 0 到 99 之间，则该方法会将年份转换为 20 世纪的一个年份（即 1900 + year），例如，指定为 95，则年份为 1995。


// UTC() 方法与 Date 构造函数有两点不同：
//   Date.UTC() 方法使用协调世界时代替本地时间。
//   Date.UTC() 方法返回一个时间数值，而不是一个 Date 对象。

// 如果有一个指定的参数超出其合理范围，则 UTC 方法会通过更新其他参数直到该参数在合理范围内。
// 例如，为月份指定 15，则年份将会加 1（year + 1），然后月份将会使用 3。

// 由于 UTC() 是 Date 的一个静态方法，所以应该直接调用 Date.UTC()，而不要把它作为 Date 实例的方法。


const utc = Date.UTC(2018, 11, 1, 0, 0, 0)
console.log('utc1111', utc)

const utcDate = new Date(utc);
console.log('utcDate', utcDate)