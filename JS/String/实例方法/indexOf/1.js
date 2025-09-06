// indexOf(searchString)
// indexOf(searchString, position)

// searchValue
//   所有传入值都会被强制转换为字符串
//   如果该参数被省略或传入 undefined，indexOf() 方法会在字符串中搜索 "undefined"

// position 可选
//   默认为 0。
//   如果 position 大于调用字符串的长度，返回 -1
//   如果 position 小于零，该方法的行为就像 position 为 0 时一样。

// 返回值
//   查找的字符串 searchValue 的第一次出现的索引，如果没有找到，则返回 -1。

const paragraph = "I think Ruth's dog is cuter than your dog!";

const searchTerm = "dog";
let indexOfFirst = paragraph.indexOf(searchTerm)
console.log(indexOfFirst); // 15

console.log(paragraph.indexOf(
  searchTerm,
  indexOfFirst + 1,
)); // 38