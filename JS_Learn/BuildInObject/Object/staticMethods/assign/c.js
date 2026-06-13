const o1 = { a: 1 };
const o2 = { b: 2 };
const o3 = { c: 3 };

const result = Object.assign({}, o1, o2, o3);
console.log(result); // { a: 1, b: 2, c: 3 }