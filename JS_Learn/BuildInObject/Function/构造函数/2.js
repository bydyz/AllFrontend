// 函数构造器可以接受多个分号分隔的语句。Function 表达式需要带有函数的返回语句

// 观察一下，new Function 被调用了。这样我们就可以在事后直接调用我们创建的函数了
const sumOfArray = new Function(
  "const sumArray = (arr) => arr.reduce((previousValue, currentValue) => previousValue + currentValue); return sumArray",
)();

// 调用函数
sumOfArray([1, 2, 3, 4]);
// 10

// 如果你不在创建函数时调用 new Function，你可以使用 Function.call() 方法来调用它
const findLargestNumber = new Function(
  "function findLargestNumber (arr) { return Math.max(...arr) }; return findLargestNumber",
);
// 调用函数
findLargestNumber.call({}).call({}, [2, 4, 1, 8, 5]);
// 8

// 函数声明不需要返回语句
const sayHello = new Function(
  "return function (name) { return `Hello, ${name}` }",
)();

// 调用函数
sayHello("world");
// Hello, world