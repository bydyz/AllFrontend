// Map 对象保存键值对，并且能够记住键的原始插入顺序。任何值（对象或者原始值）都可以作为键或值。


// Map() 构造函数创建 Map 对象


// new Map()
// new Map(iterable)


// Map() 只能用 new 构造。尝试不使用 new 调用它会抛出 TypeError。


// 参数
//   iterable 可选
//     一个元素是键值对的数组或其他可迭代对象。
//     （例如，包含两个元素的数组，如 [[ 1, 'one' ],[ 2, 'two' ]]。）每个键值对都被添加到新的 Map 中。


const myMap = new Map([
  [1, "one"],
  [2, "two"],
  [3, "three"],
]);

console.log(myMap)