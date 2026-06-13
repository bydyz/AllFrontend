// 语法
//   dateObj.toDateString()


// 描述
//   Date 对象实例引用一个具体的时间点。调用 toString 方法会以美式英语和人类易读的形式返回日期对象的格式化字符串。



const dateItem = new Date(1993, 6, 28, 14, 39, 7);

console.log(dateItem.toString());
// Expected output: "Wed Jul 28 1993 14:39:07 GMT+0200 (CEST)"
// Note: your timezone may vary

console.log(dateItem.toDateString());
// Expected output: "Wed Jul 28 1993"