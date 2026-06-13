// Date 实例的 [Symbol.toPrimitive]() 方法返回表示当前日期的原始值。根据给定提示的不同，其可能是字符串或数字。



const date = new Date("20 December 2019 14:48");

console.log(date[Symbol.toPrimitive]("string"));
// Expected output: "Fri Dec 20 2019 14:48:00 GMT+0530 (India Standard Time)"

console.log(date[Symbol.toPrimitive]("number"));
// Expected output: 1576833480000