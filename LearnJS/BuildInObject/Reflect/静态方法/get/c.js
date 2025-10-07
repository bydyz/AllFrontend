const person = {
  _name: 'Alice',
  get name() {
    console.log('源数据的 getter 执行了')
    return this._name; // this 指向取决于调用方式
  }
};

const proxy = new Proxy(person, {
  get(target, property, receiver) {
    // ❌ 错误：丢失 this 绑定
    // return target[property];
    
    // ✅ 正确：保持 this 绑定
    console.log('receiver 的 get trap执行了')
    return Reflect.get(target, property, receiver);
  }
});

const child = { _name: 'Bob' };
Object.setPrototypeOf(child, proxy);

console.log(child.name);
// ❌ 错误方式返回: 'Alice' (this 指向 person)
// ✅ 正确方式返回: 'Bob' (this 指向 child)