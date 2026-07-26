function demonstrateMemoryManagement() {
  console.log('\n=== Set vs WeakSet 内存管理对比 ===');
  
  class ObjectTracker {
    constructor() {
      this.setStorage = new Set();
      this.weakSetStorage = new WeakSet();
      this.objects = [];
    }
    
    // 创建测试对象
    createObjects(count) {
      for (let i = 0; i < count; i++) {
        const obj = { id: i, data: `Object ${i}` };
        this.objects.push(obj);
        
        // 同时添加到 Set 和 WeakSet
        this.setStorage.add(obj);
        this.weakSetStorage.add(obj);
      }
      console.log(`创建了 ${count} 个对象`);
      console.log('Set 大小:', this.setStorage.size);
    }
    
    // 释放部分对象
    releaseObjects(percentage) {
      const releaseCount = Math.floor(this.objects.length * percentage);
      const released = this.objects.splice(0, releaseCount);
      
      console.log(`释放了 ${released.length} 个对象`);
      console.log('Set 大小（应保持不变）:', this.setStorage.size);
      console.log('剩余对象数量:', this.objects.length);
      
      // 检查释放的对象是否仍在 Set 中（应该在）
      if (released.length > 0) {
        console.log('释放的对象仍在 Set 中:', this.setStorage.has(released[0]));
      }
    }
  }
  
  const tracker = new ObjectTracker();
  tracker.createObjects(100);
  tracker.releaseObjects(0.5); // 释放50%
  
  // 被释放的对象仍然在 Set 中，但可能在 WeakSet 中被回收
}

demonstrateMemoryManagement();