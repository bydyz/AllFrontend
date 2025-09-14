const map = new Map([
  [1, 2],
  [2, 4],
  [4, 8],
]);
console.log(Array.from(map));
// [[1, 2], [2, 4], [4, 8]]


const mapper = new Map([
  ["1", "a"],
  ["2", "b"],
]);
console.log(mapper.values())
console.log(Array.from(mapper.values()));
// ['a', 'b'];


console.log(mapper.keys())
Array.from(mapper.keys());
// ['1', '2'];