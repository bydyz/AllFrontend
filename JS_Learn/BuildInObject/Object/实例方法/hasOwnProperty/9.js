// 在支持 Object.hasOwn 的浏览器中，建议使用 Object.hasOwn()，而非 hasOwnProperty()。

function mergeObjects(target, ...sources) {
  for (const source of sources) {
    for (const key in source) {
      if (source.hasOwnProperty(key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
}

const obj1 = { a: 1 };
const obj2 = Object.create({ b: 2 }); // b是继承属性
obj2.c = 3; // c是自有属性

const result = mergeObjects({}, obj1, obj2);
console.log(result); // { a: 1, c: 3 } (b被排除)