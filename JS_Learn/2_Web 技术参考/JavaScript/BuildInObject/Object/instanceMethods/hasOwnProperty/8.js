// 在支持 Object.hasOwn 的浏览器中，建议使用 Object.hasOwn()，而非 hasOwnProperty()。

function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  
  const clone = Array.isArray(obj) ? [] : {};
  
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      clone[key] = deepClone(obj[key]);
    }
  }
  
  return clone;
}

const original = { a: 1, b: { c: 2 } };
const copied = deepClone(original);

console.log(copied); // { a: 1, b: { c: 2 } }
console.log(original.b === copied.b); // false (深拷贝成功)