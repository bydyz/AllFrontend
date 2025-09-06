// 影响 源数组，
// 返回值  操作后的数组，也是原数组经过操作的值
// 也是浅拷贝


// 语法：
// copyWithin(target)
// copyWithin(target, start)
// copyWithin(target, start, end)


// 浅复制（Shallow Copy）：只复制引用，不深拷贝对象。

// 当数组中包含 引用类型 时，copyWithin() 只复制这些对象的引用，而不是创建新对象。
// 当数组中包含 基本类型 时，copyWithin() 复制是值复制，没有“浅复制”问题。

const arr = [
  { name: "Alice" },
  { name: "Bob" },
  { name: "Charlie" }
];

// 将索引 1 的元素复制到索引 0
arr.copyWithin(0, 1, 2);

console.log(arr);
// [
//   { name: "Bob" },  // 指向原索引1的对象
//   { name: "Bob" },
//   { name: "Charlie" }
// ]


arr[0].name = "Updated";

console.log(arr);
// [
//   { name: "Updated" },
//   { name: "Updated" },  // 被同步修改了！
//   { name: "Charlie" }
// ]