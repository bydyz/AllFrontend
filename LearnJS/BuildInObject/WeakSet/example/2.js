function demonstrateCircularReferenceDetection() {
  console.log('\n=== 循环引用检测 ===');
  
  const visitedObjects = new WeakSet();
  
  function hasCircularReferences(obj, path = '') {
    // 如果是基本类型，直接返回
    if (obj === null || typeof obj !== 'object') {
      return false;
    }
    
    // 检查是否已经访问过（循环引用）
    if (visitedObjects.has(obj)) {
      console.log(`发现循环引用: ${path}`);
      return true;
    }
    
    // 标记为已访问
    visitedObjects.add(obj);
    
    // 递归检查所有属性
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const newPath = path ? `${path}.${key}` : key;
        if (hasCircularReferences(obj[key], newPath)) {
          return true;
        }
      }
    }
    
    // 如果是数组，检查所有元素
    if (Array.isArray(obj)) {
      for (let i = 0; i < obj.length; i++) {
        const newPath = `${path}[${i}]`;
        if (hasCircularReferences(obj[i], newPath)) {
          return true;
        }
      }
    }
    
    return false;
  }
  
  // 测试用例
  const normalObject = {
    a: 1,
    b: { c: 2 },
    d: [3, 4, 5]
  };
  
  const circularObject = {
    a: 1,
    b: null
  };
  circularObject.b = circularObject; // 创建循环引用
  
  console.log('普通对象是否有循环引用:', hasCircularReferences(normalObject));
  console.log('循环引用对象检测:', hasCircularReferences(circularObject));
  
  return visitedObjects;
}

const circularRefDemo = demonstrateCircularReferenceDetection();