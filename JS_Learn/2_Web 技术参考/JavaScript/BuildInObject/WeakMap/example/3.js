function demonstrateObjectMetadata() {
  console.log('\n=== 对象元数据关联 ===');
  
  // 使用 WeakMap 存储对象的元数据
  const objectMetadata = new WeakMap();
  
  class User {
    constructor(name, email) {
      this.name = name;
      this.email = email;
      
      // 存储创建时间和唯一标识
      objectMetadata.set(this, {
        createdAt: new Date(),
        version: 1,
        accessLog: []
      });
    }
    
    // 记录访问日志
    recordAccess() {
      const metadata = objectMetadata.get(this);
      metadata.accessLog.push(new Date());
      metadata.version++;
    }
    
    // 获取元数据（只读）
    getMetadata() {
      return { ...objectMetadata.get(this) }; // 返回副本
    }
    
    // 不能直接修改元数据，保持封装性
  }
  
  // 使用示例
  const user1 = new User('Alice', 'alice@example.com');
  const user2 = new User('Bob', 'bob@example.com');
  
  user1.recordAccess();
  user1.recordAccess();
  user2.recordAccess();
  
  console.log('User1 元数据:', user1.getMetadata());
  console.log('User2 元数据:', user2.getMetadata());
  
  // 当 User 实例被垃圾回收时，元数据也会自动清理
  return objectMetadata;
}

const metadataDemo = demonstrateObjectMetadata();