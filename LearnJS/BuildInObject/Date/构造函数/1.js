const today = new Date();
console.log(today)

const birthday1 = new Date("December 17, 1995 03:24:00"); // 不被鼓励，可能不会在所有运行时环境起作用
console.log(birthday1)

const birthday2 = new Date("1995-12-17T03:24:00"); // 这是符合 ISO-8601 标准的，将可靠地工作
console.log(birthday2)

const birthday3 = new Date(1995, 11, 17); // 月份是以 0 为索引的
console.log(birthday3)

const birthday4 = new Date(1995, 11, 17, 3, 24, 0);
console.log(birthday4)

const birthday5 = new Date(628021800000); // 传递纪元时间戳参数
console.log(birthday5)