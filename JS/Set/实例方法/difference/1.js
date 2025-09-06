// Set 实例的 difference() 方法接受一个集合并返回一个新的集合，其中包含当前集合中存在但给定集合中不存在的所有元素。

// 返回值  一个新的 Set 对象，包含存在于当前集合但不存在于 other 中的所有元素。

const odds = new Set([1, 3, 5, 7, 9]);
const squares = new Set([1, 4, 9]);
console.log(odds.difference(squares)); // Set(3) { 3, 5, 7 }