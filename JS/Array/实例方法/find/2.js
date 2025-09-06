// find(callbackFn)
// find(callbackFn, thisArg)

// callbackFn = (element, index, array) => {}


// find() 方法返回数组中满足提供的测试函数的第一个元素的值。否则返回 undefined。

//   如果需要在数组中找到对应元素的索引，请使用 findIndex()。

//   如果需要查找某个值的索引，请使用 Array.prototype.indexOf()。（它类似于 findIndex()，
//   但只是检查每个元素是否与值相等，而不是使用测试函数。）

//   如果需要查找数组中是否存在某个值，请使用 Array.prototype.includes()。同样，它检查每个元素是否与值相等，而不是使用测试函数。

//   如果需要查找是否有元素满足所提供的测试函数，请使用 Array.prototype.some()。


// findLast() 的用法 基本同上 find
// findLast() 方法反向迭代数组，并返回满足提供的测试函数的第一个元素的值。如果没有找到对应元素，则返回 undefined。


const array1 = [
  {
    name: '1'
  },
  {
    name: '2'
  },
  {
    name: '3'
  },
];

const found = array1.find(item => item.name === '1');

console.log(found);

// 修改 find 的item，会影响源数组
found.name = '11'

console.log(array1)