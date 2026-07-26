const user = {
  name: 'Alice',
  age: 25
};

const validatedUser = new Proxy(user, {
  set(target, property, value, receiver) {
    console.log(`Setting ${property} to ${value}`);
    
    // 基础属性验证
    // 年龄验证
    if (property === 'age') {
      if (typeof value !== 'number') {
        throw new TypeError('Age must be a number');
      }
      if (value < 0 || value > 150) {
        throw new RangeError('Age must be between 0 and 150');
      }
    }
    
    // 姓名验证
    if (property === 'name') {
      if (typeof value !== 'string') {
        throw new TypeError('Name must be a string');
      }
      if (value.length < 2) {
        throw new Error('Name must be at least 2 characters');
      }
    }
    
    // 使用 Reflect.set 实际设置值
    return Reflect.set(target, property, value, receiver);
  }
});

// 正常设置
validatedUser.name = 'Bob'; // ✅
validatedUser.age = 30;     // ✅

// 验证失败
try {
  validatedUser.age = -5;   // ❌ RangeError
} catch (error) {
  console.log(error.message);
}

try {
  validatedUser.name = '';  // ❌ Error
} catch (error) {
  console.log(error.message);
}