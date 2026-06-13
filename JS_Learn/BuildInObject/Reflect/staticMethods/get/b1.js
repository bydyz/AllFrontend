const target = { name: 'Alice' };

// ❌ 错误方式 - 会导致递归
const badProxy = new Proxy(target, {
  get(target, property, receiver) {
    return target[property]; // 可能触发无限递归
  }
});

console.log(badProxy.name);
// 输出:
// Getting name
// Alice