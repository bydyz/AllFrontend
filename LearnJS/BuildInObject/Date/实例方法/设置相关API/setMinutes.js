// setMinutes() 方法根据本地时间为一个日期对象设置分钟数。


const dateItem = new Date("August 19, 1975 23:15:30");

dateItem.setMinutes(45);

console.log(dateItem.getMinutes());
// Expected output: 45

console.log(dateItem);
// Expected output: "1975-08-19T15:45:30.000Z"