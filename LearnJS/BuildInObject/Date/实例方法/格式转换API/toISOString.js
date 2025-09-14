// 语法
//   dateObj.toISOString()



const dateItem = new Date("05 October 2011 14:48 UTC");
console.log(dateItem.toString());
// Expected output: "Wed Oct 05 2011 16:48:00 GMT+0200 (CEST)"
// Note: your timezone may vary

console.log(dateItem.toISOString());
// Expected output: "2011-10-05T14:48:00.000Z"