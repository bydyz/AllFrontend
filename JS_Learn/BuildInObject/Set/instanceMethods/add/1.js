// 集合中不存在，则在该集合中插入 一个新元素 

// 返回值  添加了值的 Set 对象。

const set1 = new Set();

set1.add(42);
set1.add(42);
set1.add(13);

for (const item of set1) {
  console.log(item);
  // Expected output: 42
  // Expected output: 13
}