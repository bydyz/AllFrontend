function demonstrateGarbageCollection() {
  console.log('=== WeakMap 的垃圾回收 ===');
  
  let weakMap = new WeakMap();
  
  // 创建一些对象
  function createObjects() {
    const tempObj1 = { data: '临时对象1' };
    const tempObj2 = { data: '临时对象2' };
    
    weakMap.set(tempObj1, '关联数据1');
    weakMap.set(tempObj2, '关联数据2');
    
    console.log('创建后 - 包含tempObj1:', weakMap.has(tempObj1));
    console.log('创建后 - 包含tempObj2:', weakMap.has(tempObj2));
    
    // 返回其中一个对象，另一个将在函数结束时被回收
    return tempObj1;
  }
  
  // 保持对返回对象的引用
  const keptObject = createObjects();
  
  // 强制垃圾回收（在浏览器中可能需要特殊标志）
  console.log('函数执行后:');
  console.log('keptObject仍然存在:', weakMap.has(keptObject));
  
  // 注意：在实际环境中，tempObj2 会被垃圾回收
  // 但由于JavaScript的垃圾回收时机不确定，我们无法直接演示
}

demonstrateGarbageCollection();