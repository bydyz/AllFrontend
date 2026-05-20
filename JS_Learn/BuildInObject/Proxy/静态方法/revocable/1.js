const target = { message: "Hello, World!" };
const handler = {
  get: function(obj, prop) {
    return prop in obj ? obj[prop] : "属性不存在";
  }
};

const { proxy, revoke } = Proxy.revocable(target, handler);
console.log('111', proxy)   // { message: 'Hello, World!' }

console.log(proxy.message); // "Hello, World!"
console.log(proxy.other);   // "属性不存在"

// 撤销代理
revoke();

console.log('222', proxy)   // <Revoked Proxy>

// 如此写，会导致程序报错，程序停止运行
// console.log(proxy.message); // TypeError: Cannot perform 'get' on a proxy that has been revoked

try {
  console.log(proxy.message);  // 抛出TypeError
} catch (e) {
  console.log('try catch 中的打印', e.toString());
}