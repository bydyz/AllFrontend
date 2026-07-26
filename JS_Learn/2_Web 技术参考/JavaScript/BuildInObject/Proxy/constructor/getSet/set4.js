// 数据绑定/响应式系统

class Observable {
  constructor() {
    this._listeners = new Map();
    return new Proxy(this, {
      set(target, property, value, receiver) {
        const oldValue = target[property];
        const success = Reflect.set(target, property, value, receiver);
        
        // 触发监听器
        if (success && oldValue !== value) {
          const listeners = target._listeners.get(property) || [];
          listeners.forEach(callback => callback(value, oldValue));
        }
        
        return success;
      }
    });
  }
  
  observe(property, callback) {
    if (!this._listeners.has(property)) {
      this._listeners.set(property, []);
    }
    this._listeners.get(property).push(callback);
  }
}

// 使用示例
const data = new Observable();

data.observe('name', (newVal, oldVal) => {
  console.log(`Name changed from ${oldVal} to ${newVal}`);
});

data.observe('age', (newVal, oldVal) => {
  console.log(`Age changed to ${newVal}`);
});

data.name = 'Alice'; // Name changed from undefined to Alice
data.age = 25;       // Age changed to 25
data.name = 'Bob';   // Name changed from Alice to Bob