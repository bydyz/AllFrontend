// 在支持 Object.hasOwn 的浏览器中，建议使用 Object.hasOwn()，而非 hasOwnProperty()。

const obj = {
  name: 'Alice',
  age: 25
};

// 只处理自有属性，避免处理继承的方法
for (const key in obj) {
  if (obj.hasOwnProperty(key)) {
    console.log(`${key}: ${obj[key]}`);
  }
}
// 输出:
// name: Alice
// age: 25