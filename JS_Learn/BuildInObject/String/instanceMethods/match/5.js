let idNumber = "421125199809047317";

// 只匹配整个字符，即获取的是 ['421125199809047317']
let matchListOne = idNumber.match(/^\d{6}\d{4}\d{2}\d{2}\d{3}[0-9Xx]$/);

// 给正则加括号，会先匹配整个，再按照括号一个一个地去匹配  ['421125199809047317', '421125']
let matchListTwo = idNumber.match(/^(\d{6})\d{4}\d{2}\d{2}\d{3}[0-9Xx]$/);

// 给正则加括号，会先匹配整个，再按照括号一个一个地去匹配  同理
let matchListThree = idNumber.match(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9Xx])$/);

console.log(matchListOne, matchListTwo);
