// 影响 源数组，
// 返回值  操作后的数组，也是原数组经过操作的值
// 也是浅拷贝
//！ toSorted  是 sort() 的复制，但是 不影响 源数组，是浅拷贝


// sort()
// sort(compareFn)

// compareFn
//   定义排序顺序的函数。返回值应该是一个数字，其符号表示两个元素的相对顺序：如果 a 小于 b，返回值为负数，如果 a 大于 b，
//   返回值为正数，如果两个元素相等，返回值为 0。NaN 被视为 0。该函数使用以下参数调用：

//     a
//       第一个用于比较的元素。不会是 undefined。
//     b
//       第二个用于比较的元素。不会是 undefined。

//   如果省略该函数，数组元素会被转换为字符串，然后根据每个字符的 Unicode 码位值进行排序。

// 返回值
//   经过排序的原始数组的引用。注意数组是就地排序的，不会进行复制。



// sort() 方法就地对数组的元素进行排序，并返回对相同数组的引用。默认排序是将元素转换为字符串，然后按照它们的 UTF-16 码元值升序排序。
// 即 影响 原数组


const months = ["March", "Jan", "Feb", "Dec"];
months.sort();
console.log(months);
// Expected output: Array ["Dec", "Feb", "Jan", "March"]

const array1 = [1, 30, 4, 21, 100000];
array1.sort();
console.log(array1);
// Expected output: Array [1, 100000, 21, 30, 4]