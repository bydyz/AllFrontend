const originTarget = { name: 'Alice' };

const proxy = new Proxy(originTarget, {
  get: function(target, property, receiver) {

    // 很神奇，有这个 node.js 会报错      浏览器会重复执行
    console.log('Receiver:', receiver);

    console.log(receiver === proxy); // false
    console.log(target === proxy);   // false

    console.log(receiver === originTarget); // false
    console.log(target === originTarget);   // true

    console.log(receiver === child); // true
    console.log(target === child);   // false

    return target[property];
  }
});

// 继承 proxy
const child = Object.create(proxy);

// child 的 name属性，会从其原型上寻找，即 在 proxy上进行寻找，既是触发了 proxy.name
console.log(child.name);



/* 
直接利用 继承的子实例 进行获取、设置时，
  target    为  源数据
  receiver  为  child
*/