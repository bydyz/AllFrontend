// Array.from(arrayLike, mapFn, thisArg)

function NotArray(len) {
  console.log("NotArray called with length", len);
}

// 可迭代对象
console.log(Array.from.call(NotArray, new Set(["foo", "bar", "baz"])));
// NotArray called with length undefined
// NotArray { '0': 'foo', '1': 'bar', '2': 'baz', length: 3 }

// 类数组对象
console.log(Array.from.call(NotArray, { length: 1, 0: "foo" }));
// NotArray called with length 1
// NotArray { '0': 'foo', length: 1 }