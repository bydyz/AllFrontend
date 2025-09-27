function demonstrateWeakSetVsWeakMap() {
  console.log('=== WeakSet vs WeakMap 使用场景对比 ===');
  
  // 场景：用户会话管理
  
  // 使用 WeakSet - 只需要知道对象是否存在
  const activeSessionsWeakSet = new WeakSet();
  
  // 使用 WeakMap - 需要存储额外数据
  const activeSessionsWeakMap = new WeakMap();
  
  class SessionManager {
    constructor() {
      this.sessions = new WeakMap();
    }
    
    // WeakSet 版本：只需要检查是否存在
    loginWeakSet(user) {
      if (activeSessionsWeakSet.has(user)) {
        console.log('用户已登录');
        return false;
      }
      
      activeSessionsWeakSet.add(user);
      console.log('用户登录成功（WeakSet）');
      return true;
    }
    
    logoutWeakSet(user) {
      if (activeSessionsWeakSet.has(user)) {
        activeSessionsWeakSet.delete(user);
        console.log('用户登出成功（WeakSet）');
        return true;
      }
      return false;
    }
    
    // WeakMap 版本：需要存储会话数据
    loginWeakMap(user, sessionData) {
      if (this.sessions.has(user)) {
        console.log('用户已登录');
        return false;
      }
      
      this.sessions.set(user, {
        ...sessionData,
        loginTime: new Date(),
        lastActivity: new Date()
      });
      console.log('用户登录成功（WeakMap）');
      return true;
    }
    
    logoutWeakMap(user) {
      if (this.sessions.has(user)) {
        const session = this.sessions.get(user);
        console.log(`会话时长: ${new Date() - session.loginTime}ms`);
        this.sessions.delete(user);
        console.log('用户登出成功（WeakMap）');
        return true;
      }
      return false;
    }
    
    updateActivity(user) {
      if (this.sessions.has(user)) {
        const session = this.sessions.get(user);
        session.lastActivity = new Date();
        return true;
      }
      return false;
    }
  }
  
  // 测试
  const sessionManager = new SessionManager();
  const user1 = { id: 1, name: 'Alice' };
  const user2 = { id: 2, name: 'Bob' };
  
  console.log('--- WeakSet 版本 ---');
  sessionManager.loginWeakSet(user1);
  sessionManager.loginWeakSet(user1); // 重复登录
  
  console.log('--- WeakMap 版本 ---');
  sessionManager.loginWeakMap(user2, { ip: '192.168.1.1', device: 'Desktop' });
  sessionManager.updateActivity(user2);
  sessionManager.logoutWeakMap(user2);
  
  return { sessionManager, activeSessionsWeakSet };
}

const comparisonDemo = demonstrateWeakSetVsWeakMap();