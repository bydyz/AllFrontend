// 不影响 源数组，
// 也是浅拷贝


// flat()  默认值为 1
// flat(depth)

// flat() 方法创建一个新的数组，并根据指定深度递归地将所有子数组元素拼接到新的数组中。



const arr1 = [0, 1, 2, [3, 4]];

console.log(arr1.flat());
// expected output: Array [0, 1, 2, 3, 4]
console.log(arr1)



const arr2 = [0, 1, [2, [3, [4, 5]]]];

console.log(arr2.flat());
// expected output: Array [0, 1, 2, Array [3, Array [4, 5]]]

console.log(arr2.flat(2));
// expected output: Array [0, 1, 2, 3, Array [4, 5]]

console.log(arr2.flat(Infinity));
// expected output: Array [0, 1, 2, 3, 4, 5]