const user = { name: "John", _password: "secret" };

const protectedUser = new Proxy(user, {
  get(target, property) {
    if (property.startsWith('_')) {
      throw new Error(`Access to private property "${property}" is denied`);
    }
    return target[property];
  },
  
  set(target, property, value) {
    if (property.startsWith('_')) {
      throw new Error(`Modification of private property "${property}" is denied`);
    }
    
    // 添加验证逻辑
    if (property === 'age' && (value < 0 || value > 150)) {
      throw new Error('Invalid age value');
    }
    
    target[property] = value;
    return true;
  },
  
  // 其他 trap...
  deleteProperty(target, property) {
    if (property.startsWith('_')) {
      throw new Error(`Deletion of private property "${property}" is denied`);
    }
    delete target[property];
    return true;
  }
});

// 使用
console.log(protectedUser.name); // "John"
protectedUser.age = 30; // 正常
// protectedUser._password = "new"; // 抛出错误