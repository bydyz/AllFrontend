const obj = { name: 'Alice' };

// 直接访问 - 在严格模式下会报错
try {
  const value = obj.nonExistentProperty.anotherProperty;
} catch (error) {
  console.log('直接访问错误:', error.message);
}

// Reflect.get - 更安全
try {
  const value = Reflect.get(obj, 'nonExistentProperty');
  console.log('Reflect.get 结果:', value); // undefined，不会报错
} catch (error) {
  console.log('Reflect.get 错误:', error.message);
}