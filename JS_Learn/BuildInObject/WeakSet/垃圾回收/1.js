function demonstrateGarbageCollection() {
  console.log('=== WeakSet 的垃圾回收 ===');
  
  let weakSet = new WeakSet();
  
  function createTemporaryObjects() {
    const tempObj1 = { name: '临时对象1' };
    const tempObj2 = { name: '临时对象2' };
    const tempObj3 = { name: '临时对象3' };
    
    // 添加到 WeakSet
    weakSet.add(tempObj1);
    weakSet.add(tempObj2);
    weakSet.add(tempObj3);
    
    console.log('创建后 - 包含 tempObj1:', weakSet.has(tempObj1));
    console.log('创建后 - 包含 tempObj2:', weakSet.has(tempObj2));
    console.log('创建后 - 包含 tempObj3:', weakSet.has(tempObj3));
    
    // 只返回一个对象，其他的将被回收
    return tempObj1;
  }
  
  // 保持对返回对象的引用
  const keptObject = createTemporaryObjects();
  
  console.log('函数执行后:');
  console.log('keptObject 仍然存在:', weakSet.has(keptObject));
  console.log('weakSet的打印', weakSet)

  setTimeout(() => {
    console.log('30s后，weakSet的打印', weakSet)
  }, 30000)
  
  // 注意：在实际环境中，tempObj2 和 tempObj3 会被垃圾回收
  // 但由于垃圾回收时机不确定，我们无法直接演示
}

demonstrateGarbageCollection();