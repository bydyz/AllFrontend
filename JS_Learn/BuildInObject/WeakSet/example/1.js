function demonstrateExistenceChecking() {
  console.log('=== 对象存在性检查 ===');
  
  // 使用 WeakSet 跟踪已处理的对象
  const processedObjects = new WeakSet();
  
  class DataProcessor {
    processData(dataObject) {
      // 检查是否已经处理过
      if (processedObjects.has(dataObject)) {
        console.log('对象已处理过，跳过');
        return false;
      }
      
      // 模拟处理过程
      console.log('处理对象:', dataObject);
      
      // 标记为已处理
      processedObjects.add(dataObject);
      return true;
    }
  }
  
  // 使用示例
  const processor = new DataProcessor();
  const data1 = { id: 1, value: 'Data 1' };
  const data2 = { id: 2, value: 'Data 2' };
  
  processor.processData(data1); // 第一次处理
  processor.processData(data1); // 第二次处理（跳过）
  processor.processData(data2); // 第一次处理
  processor.processData(data1); // 第三次处理（跳过）
  
  // 当数据对象不再需要时，它们会自动从 WeakSet 中移除
  return processedObjects;
}

const existenceCheckDemo = demonstrateExistenceChecking();
console.log(existenceCheckDemo)