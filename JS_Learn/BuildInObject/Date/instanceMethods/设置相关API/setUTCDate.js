// setUTCDate() 方法就是根据全球时间设置特定 date 对象的日期。


const dateItem = new Date("August 19, 1975 23:15:30 GMT-3:00");
console.log(dateItem)

console.log(dateItem.getUTCDate());
// Expected output: 20

dateItem.setUTCDate(19);

console.log(dateItem.getUTCDate());
// Expected output: 19