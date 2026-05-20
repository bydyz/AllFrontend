let a = [
  {
    a1: 1
  },
  {
    a2: 2
  }
]

let b = [
  {
    b1: 1
  },
  {
    b2: 2
  }
]

let c = a.concat(b)
console.log(c)

// 影响 a 后，会影响到 c  原因：浅拷贝
a[0].a1 = 11
console.log(a, b, c)