// 对于普通数据属性，receiver 通常不重要：

// receiver 是指：当访问的属性是一个 getter 时，这个 getter 函数内部的 this 指向谁。
// 对于普通数据属性（如 value: 42），没有 getter，只是直接返回值，所以 this 指向谁不重要，自然 receiver 也就“不重要”。

const obj0 = { value: 42 };
console.log(Reflect.get(obj0, 'value')); // 42
console.log(Reflect.get(obj0, 'value', null)); // 42
console.log(Reflect.get(obj0, 'value', {})); // 42
console.log('\n-----------------------------------------\n')





// 对于 getter 方法，receiver 决定了 this 的值

const obj = {
  _value: 100,
  get value() {
    console.log('this in getter:', this);
    return this._value;
  }
};

const proxy = new Proxy(obj, {
  get(target, property, receiver) {
    console.log('Receiver:', receiver);
    return Reflect.get(target, property, receiver);
  }
});

const differentThis = { _value: 200 };

console.log('=== 直接访问 ===');
console.log(proxy.value);
// this in getter: Proxy { _value: 100, value: [Getter] }
// 100



// proxy 的 get 拦截器只有在你访问 proxy 本身属性时才会触发
console.log('\n=== 对原始数据，指定不同 receiver ===');
console.log(Reflect.get(obj, 'value', differentThis));
// this in getter: { _value: 200 }
// 200



console.log('\n=== 对proxy，指定不同 receiver ===');
// 此处传递的  receiver  会作为代理的get的 receiver 使用
console.log(Reflect.get(proxy, 'value', differentThis));
// Receiver: { _value: 200 }
// this in getter: { _value: 200 }
// 200