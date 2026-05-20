// 影响 源数组，
// 返回值  操作后的数组，也是原数组经过操作的值
// 也是浅拷贝


// 语法：
// copyWithin(target)
// copyWithin(target, start)
// copyWithin(target, start, end)


const arr = [
  [1, 2],
  [3, 4],
  [5, 6]
];

arr.copyWithin(1, 0, 1); // 将索引0复制到索引1

console.log(arr);
// [
//   [1, 2],
//   [1, 2],  // 引用的是原 [1,2] 数组
//   [5, 6]
// ]

// 修改 arr[1]
arr[1].push(3);

console.log(arr);
// [
//   [1, 2, 3],  // 被影响！
//   [1, 2, 3],
//   [5, 6]
// ]