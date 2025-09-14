// 语法
//   toJSON()


// 描述
//   Date 实例引用一个具体的时间点。调用 toJSON() 返回一个 JSON 格式字符串（使用 toISOString()），表示该日期对象的值。
//   默认情况下，这个方法常用于 JSON 序列化 Date 对象。



const dateItem = new Date("August 19, 1975 23:15:30 UTC");

const jsonDate = dateItem.toJSON();

console.log(jsonDate);
// Expected output: "1975-08-19T23:15:30.000Z"

console.log(new Date(jsonDate).toUTCString());
// Expected output: "Tue, 19 Aug 1975 23:15:30 GMT"