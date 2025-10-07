// 自动保存到 localStorage

function createStoredObject(key, defaultValue = {}) {
  const stored = JSON.parse(localStorage.getItem(key)) || defaultValue;
  
  return new Proxy(stored, {
    set(target, property, value, receiver) {
      const success = Reflect.set(target, property, value, receiver);
      
      // 自动保存到 localStorage
      if (success) {
        localStorage.setItem(key, JSON.stringify(target));
        console.log(`Saved ${property} = ${value} to localStorage`);
      }
      
      return success;
    }
  });
}

// 使用示例
const settings = createStoredObject('app-settings', {
  theme: 'dark',
  language: 'en'
});

settings.theme = 'light';    // 自动保存
settings.language = 'zh-CN'; // 自动保存
settings.fontSize = 14;      // 自动保存