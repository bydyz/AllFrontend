// 使用 has 陷阱来拦截 in 运算符的行为

let target = { a: 10, b: 20 };

let handler = {
  has: function (target, key) {
    console.log("执行了 has 的 trap");
    if (key === "a") {
      return false; // 让 'a' 看起来不存在于目标对象中
    }
    return key in target;
  },
};

let proxy = new Proxy(target, handler);

console.log("a" in proxy); // 输出: false
console.log("b" in proxy); // 输出: true

console.log('打印原对象，代理对象的a属性', target.a, proxy.a)


// 调整了 源对象 ， 代理和源对象均变
target.a = 100
console.log('打印是指了原对象的a属性后的a属性', target.a, proxy.a)


// 调整了 代理对象 ， 代理和源对象均变
proxy.b = 200
console.log('打印是指了代理对象的a属性后的a属性', target.b, proxy.b)
