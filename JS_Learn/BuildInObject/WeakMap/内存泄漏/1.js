function demonstrateMemoryLeakPrevention() {
  console.log('\n=== Map  vs WeakMap 内存泄漏对比 ===');
  
  // 模拟大量数据存储
  class DataProcessor {
    constructor() {
      this.mapStorage = new Map();
      this.weakMapStorage = new WeakMap();
      this.objects = [];
    }
    
    // 创建测试数据
    createTestData(count) {
      for (let i = 0; i < count; i++) {
        const obj = { id: i, data: `Object ${i}` };
        this.objects.push(obj);
        
        // 同时存储到Map和WeakMap
        this.mapStorage.set(obj, `Map data for ${i}`);
        this.weakMapStorage.set(obj, `WeakMap data for ${i}`);
      }
    }
    
    // 释放部分对象
    releaseHalfObjects() {
      const halfIndex = Math.floor(this.objects.length / 2);
      const released = this.objects.splice(halfIndex);
      
      console.log(`释放了 ${released.length} 个对象`);
      console.log('Map大小:', this.mapStorage.size);
      
      // 被释放的对象仍然在Map中，但不在WeakMap中
      released.forEach(obj => {
        console.log(`对象 ${obj.id} 在Map中:`, this.mapStorage.has(obj));
        // 在WeakMap中可能已被回收（如果其他地方没有引用）
      });
    }
  }
  
  const processor = new DataProcessor();
  processor.createTestData(10);
  processor.releaseHalfObjects();
}

demonstrateMemoryLeakPrevention();