const array1 = [
  { name: "Alice" },
  { name: "Bob" },
  { name: "Charlie" }
];

let b = array1.copyWithin()
console.log(b)

let b0 = array1.copyWithin(0)
console.log(b0)

// array1  b   b0   公用一套引用，改谁均会影响其他
b[0].name = "Alice666"

console.log(array1, b, b0)