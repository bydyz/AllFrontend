# 语法

```javascript
new Date()
new Date(value)
new Date(dateString)
new Date(dateObject)

new Date(year, monthIndex)
new Date(year, monthIndex, day)
new Date(year, monthIndex, day, hours)
new Date(year, monthIndex, day, hours, minutes)
new Date(year, monthIndex, day, hours, minutes, seconds)
new Date(year, monthIndex, day, hours, minutes, seconds, milliseconds)

Date()
```


# 参数

1. 无参数
  当没有提供参数时，新创建的 Date 对象代表当前的日期和时间。

2. 时间或时间戳值
  value 
    一个整数，代表自 UTC 1970 年 1 月 1 日 00:00:00（ECMAScript 纪元，与 UNIX 纪元相同）以来的毫秒数，忽略闰秒。
    请记住，大多数 UNIX 时间戳函数只精确到最近的秒。

3. 日期字符串
  dateString
    一个代表日期的字符串值，其格式由 Date.parse() 方法所识别。
    （ECMA262 规范规定了 ISO 8601 的简化版本，但其他格式可以由实现者定义，通常包括符合 IETF 的 RFC 2822 时间戳。）

4. 日期对象
  dateObject
    一个现有的 Date 对象。这实际上是在现有的 Date 对象上复制了一个相同的日期和时间。
    这等同于 new Date(dateObject.valueOf())，除了不调用 valueOf() 方法。