const config = {
  apiKey: 'abc123',
  version: '1.0.0'
};

const protectedConfig = new Proxy(config, {
  set(target, property, value, receiver) {
    const readonlyProperties = ['version', 'apiKey'];
    
    // 只读属性保护
    if (readonlyProperties.includes(property)) {
      console.warn(`Property "${property}" is read-only`);
      return false; // 设置失败
    }
    
    console.log(`Setting ${property} to ${value}`);
    return Reflect.set(target, property, value, receiver);
  }
});

protectedConfig.version = '2.0.0'; // ⚠️ 警告，设置失败
protectedConfig.timeout = 5000;    // ✅ 正常设置
console.log(protectedConfig.timeout); // 5000