// toTimeString() 方法以人类易读形式返回一个日期对象时间部分的字符串，该字符串以美式英语格式化。



const dateItem = new Date("August 19, 1975 23:15:30");

console.log(dateItem.toTimeString());
// Expected output: "23:15:30 GMT+0200 (CEST)"