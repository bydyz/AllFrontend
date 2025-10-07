const originTarget = { name: 'Alice' };
const proxy = new Proxy(originTarget, {
  get: function(target, property, receiver) {
    console.log('三个参数依次是', target, property, receiver)
    console.log(receiver === proxy); // true
    console.log(target === proxy);   // false
    console.log(receiver === originTarget); // false
    console.log(target === originTarget);   // true
    return target[property];
  }
});

console.log(proxy.name); // receiver 就是 proxy 本身

/* 
直接利用 proxy 进行获取、设置时，
  target    为  源数据
  receiver  为  proxy



不会触发 proxy 的监控
  打印 receiver  receiver === proxy

会触发 proxy 的监控
  获取、操作 receiver 的某个属性是，
*/

