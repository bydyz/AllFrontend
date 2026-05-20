// 利用 Proxy 代理的是一个 函数是
// Proxy 也可以用来拦截函数调用

let target = function () {
  return "I am the target";
};

let handler = {
  apply: function (target, thisArg, argumentsList) {
    console.log(`Calling function with arguments: ${argumentsList.join(", ")}`);
    return target.apply(thisArg, argumentsList);
  },
};

let proxy = new Proxy(target, handler);

console.log(proxy()); 
// 输出: Calling function with arguments:
// 输出: I am the target
