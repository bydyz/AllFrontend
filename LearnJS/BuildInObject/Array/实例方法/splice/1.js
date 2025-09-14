// 影响 源数组，
// 返回值  包含了删除的元素的数组
// 也是浅拷贝
//！ toSpliced  是 splice() 的复制，但是 不影响 源数组，是浅拷贝


// splice(start)
// splice(start, deleteCount)
// splice(start, deleteCount, item1)
// splice(start, deleteCount, item1, item2)
// splice(start, deleteCount, item1, item2, /* …, */ itemN)


// start
//   从 0 开始计算的索引，表示要开始改变数组的位置，它会被转换成整数。

//     负索引从数组末尾开始计算——如果 -buffer.length <= start < 0，使用 start + array.length。
//     如果 start < -array.length，使用 0。
//     如果 start >= array.length，则不会删除任何元素，但是该方法会表现为添加元素的函数，添加所提供的那些元素。
//     如果 start 被省略了（即调用 splice() 时不传递参数），则不会删除任何元素。这与传递 undefined 不同，后者会被转换为 0。

// deleteCount 可选
//   一个整数，表示数组中要从 start 开始删除的元素数量。

//   如果省略了 deleteCount，或者其值大于或等于由 start 指定的位置到数组末尾的元素数量，那么从 start 到数组末尾的所有元素将被删除。但是，如果你想要传递任何 itemN 参数，则应向 deleteCount 传递 Infinity 值，以删除 start 之后的所有元素，因为显式的 undefined 会转换为 0。
//   如果 deleteCount 是 0 或者负数，则不会移除任何元素。在这种情况下，你应该至少指定一个新元素（请参见下文）。

// item1、…、itemN 可选
//   从 start 开始要加入到数组中的元素。
//   如果不指定任何元素，splice() 将只从数组中删除元素。

// 返回值
//   一个包含了删除的元素的数组。
//   如果只移除一个元素，则返回一个元素的数组。
//   如果没有删除任何元素，则返回一个空数组。



// splice() 方法就地移除或者替换已存在的元素和/或添加新的元素。

// 要创建一个删除和/或替换部分内容而不改变原数组的新数组，请使用 toSpliced()。要访问数组的一部分而不修改它，参见 slice()。



const months = ["Jan", "March", "April", "June"];
months.splice(1, 0, "Feb");
// Inserts at index 1
console.log(months);
// Expected output: Array ["Jan", "Feb", "March", "April", "June"]

months.splice(4, 1, "May");
// Replaces 1 element at index 4
console.log(months);
// Expected output: Array ["Jan", "Feb", "March", "April", "May"]