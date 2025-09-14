// 返回值
//   一个新的可迭代迭代器对象。

// values() 方法返回一个新的数组迭代器对象，该对象迭代数组中每个元素的值。

const array1 = ["a", "b", "c"];
const iterator = array1.values();

for (const value of iterator) {
  console.log(value);
}

// Expected output: "a"
// Expected output: "b"
// Expected output: "c"