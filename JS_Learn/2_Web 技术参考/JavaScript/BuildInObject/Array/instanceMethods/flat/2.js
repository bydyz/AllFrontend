// 不影响 源数组，
// 也是浅拷贝


// flat()  默认值为 1
// flat(depth)

// flat() 方法创建一个新的数组，并根据指定深度递归地将所有子数组元素拼接到新的数组中。



const arr1 = [
  {
    a: 0
  },
  {
    a: 1
  },
  {
    a: 2
  },
  [
    {
      a: 3
    },
    {
      a: 4
    },
  ]
];

let b = arr1.flat()
console.log(b);

arr1[0].a = '00'
console.log(b)
