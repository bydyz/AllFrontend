class Animal {
  constructor(name) {
    this._name = name;
  }
  
  get name() {
    return this._name.toUpperCase();
  }
}

const animal = new Animal('cat');
const proxy = new Proxy(animal, {
  get(target, property, receiver) {
    console.log(`Property: ${property}, Receiver:`, receiver);
    return Reflect.get(target, property, receiver);
  }
});

const dog = Object.create(proxy);
dog._name = 'dog';

console.log(dog.name);
// 输出:
// Property: name, Receiver: { _name: 'dog' }
// DOG