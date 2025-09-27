function demonstrateObjectPool() {
  console.log('\n=== 对象池管理 ===');
  
  const activeObjects = new WeakSet();
  
  class ObjectPool {
    constructor(createFn) {
      this.createFn = createFn;
      this.available = [];
      this.active = new WeakSet();
    }
    
    acquire() {
      let obj;
      
      if (this.available.length > 0) {
        // 重用可用对象
        obj = this.available.pop();
        console.log('重用对象');
      } else {
        // 创建新对象
        obj = this.createFn();
        console.log('创建新对象');
      }
      
      this.active.add(obj);
      return obj;
    }
    
    release(obj) {
      if (this.active.has(obj)) {
        this.active.delete(obj);
        this.available.push(obj);
        console.log('释放对象回池中');
        return true;
      }
      console.log('对象不在活动集合中');
      return false;
    }
    
    getActiveCount() {
      // 注意：WeakSet 没有 size 属性，我们需要其他方式来跟踪
      return this.available.length;
    }
  }
  
  // 使用示例：数据库连接池
  const connectionPool = new ObjectPool(() => ({
    id: Math.random().toString(36).substr(2, 9),
    connected: true,
    query: function(sql) {
      console.log(`执行查询: ${sql}`);
      return { results: [] };
    }
  }));
  
  const conn1 = connectionPool.acquire();
  const conn2 = connectionPool.acquire();
  
  conn1.query('SELECT * FROM users');
  conn2.query('SELECT * FROM products');
  
  connectionPool.release(conn1);
  const conn3 = connectionPool.acquire(); // 应该重用 conn1
  
  return connectionPool;
}

const poolDemo = demonstrateObjectPool();