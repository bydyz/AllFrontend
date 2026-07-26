// Set 实例的 entries() 方法返回一个新的集合迭代器对象，
// 该对象包含了此集合中每个元素的 [value, value] 数组，按插入顺序排列。
// Set 对象没有类似于 Map 对象中的 key。因此，为了保持 API 与 Map 对象类似，这里每个 entry 的 key 和 value 都相同，所以返回的数组为 [value, value]。


const set1 = new Set();
set1.add(42);
set1.add("forty two");

const iterator1 = set1.entries();

for (const entry of iterator1) {
  console.log(entry);
  // Expected output: Array [42, 42]
  // Expected output: Array ["forty two", "forty two"]
}