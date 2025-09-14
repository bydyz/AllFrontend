// Array.fromAsync(arrayLike)
// Array.fromAsync(arrayLike, mapFn)
// Array.fromAsync(arrayLike, mapFn, thisArg)


// arrayLike
//   要转换为数组的异步可迭代、可迭代或类数组对象。

// mapFn 可选
//   为数组中的每个元素执行的函数。如果提供了该函数，则每个要添加到数组中的值都会先通过该函数处理，mapFn 的返回值将代替该值被添加到数组中（在等待兑现后）。该函数被调用时将传入以下参数：

//     element
//       数组中当前正在处理的元素。由于所有元素都会先等待其兑现，因此该值永远不会是 thenable。

//     index
//       正在处理的元素在数组中的索引。

// thisArg 可选
//   执行 mapFn 时用作 this 的值。

// 返回值
//   一个新的 Promise，其兑现值是一个新的 Array 实例。