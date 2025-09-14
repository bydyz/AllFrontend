// 不影响 源数组


// keys() 方法返回一个新的数组迭代器对象，其中包含数组中每个索引的键。


const array1 = ["a", "b", "c"];
const iterator = array1.keys();

console.log(iterator)

for (const key of iterator) {
  console.log(key);
}

// Expected output: 0
// Expected output: 1
// Expected output: 2