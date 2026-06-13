const target = { name: 'Alice' };

// ✅ 正确方式 - 使用 Reflect.get
const goodProxy = new Proxy(target, {
  get(target, property, receiver) {
    console.log(`Getting ${property}`);
    return Reflect.get(target, property, receiver);
  }
});

console.log(goodProxy.name);
// 输出:
// Getting name
// Alice