// lastIndexOf(searchString)
// lastIndexOf(searchString, position)

// 参数
//   searchString
//   所有值都会强制转换为字符串
//   如果该参数被省略或传入 undefined，lastIndexOf() 方法会在字符串中搜索 "undefined"

// position 可选
//   默认为 +Infinity。   +Infinity 在 JavaScript 中表示正无穷大    使用 +Infinity 和 使用 字符串长度 - 1 并无差异
//   如果 position 大于调用字符串的长度，则该方法将搜索整个字符串
//   如果 position 小于 0，则行为与 0 相同，即该方法只在索引 0 处查找指定的子字符串。

// 返回值
//   如果找到了 searchString，则返回最后一次出现的索引，否则返回 -1。



// 返回指定子字符串在小于或等于 position 的位置中的最后一次出现的索引



const paragraph = "I think Ruth's dog is cuter than your dog!";

const searchTerm = "dog";

console.log(paragraph.lastIndexOf(searchTerm));

console.log(paragraph.lastIndexOf(searchTerm), 17);