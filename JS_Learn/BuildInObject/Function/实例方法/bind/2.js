// bind(thisArg)
// bind(thisArg, arg1)
// bind(thisArg, arg1, arg2)
// bind(thisArg, arg1, arg2, /* …, */ argN)

// thisArg  必选    浏览器环境下


function add(a, b) {
  console.log('函数第一个参数', a)
  return a + b;
}

// 使用 bind 创建一个新的函数，并预先设置第一个参数为 5
const addFive = add.bind(null, 5);

console.log(addFive(3)); // 输出: 8
console.log(addFive(7)); // 输出: 12