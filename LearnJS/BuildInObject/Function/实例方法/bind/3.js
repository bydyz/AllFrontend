// bind(thisArg)
// bind(thisArg, arg1)
// bind(thisArg, arg1, arg2)
// bind(thisArg, arg1, arg2, /* …, */ argN)

// thisArg  必选    浏览器环境下


function add(a, b) {
  console.log('函数第一个参数', a)
  return a + b;
}

// 预设 两个参数  满足函数调用的需求，故后面函数调用传递参数没有使用
const addFive = add.bind(null, 5, 8);

console.log(addFive(3)); // 输出: 8
console.log(addFive(7)); // 输出: 12 