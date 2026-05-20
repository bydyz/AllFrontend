function demonstrateEventListenerManagement() {
  console.log('\n=== 事件监听器管理 ===');
  
  const registeredListeners = new WeakSet();
  
  class EventManager {
    constructor() {
      this.listeners = new Map();
    }
    
    addEventListener(target, eventType, listener) {
      // 检查监听器是否已注册
      if (registeredListeners.has(listener)) {
        console.log('监听器已注册，跳过');
        return false;
      }
      
      // 注册监听器
      if (!this.listeners.has(eventType)) {
        this.listeners.set(eventType, new WeakSet());
      }
      
      target.addEventListener(eventType, listener);
      this.listeners.get(eventType).add(listener);
      registeredListeners.add(listener);
      
      console.log(`注册了 ${eventType} 事件的监听器`);
      return true;
    }
    
    removeEventListener(target, eventType, listener) {
      if (registeredListeners.has(listener)) {
        target.removeEventListener(eventType, listener);
        registeredListeners.delete(listener);
        
        if (this.listeners.has(eventType)) {
          this.listeners.get(eventType).delete(listener);
        }
        
        console.log('移除监听器成功');
        return true;
      }
      
      console.log('监听器未注册');
      return false;
    }
  }
  
  // 使用示例
  const eventManager = new EventManager();
  const button = { 
    addEventListener: (type, listener) => console.log(`添加 ${type} 监听器`),
    removeEventListener: (type, listener) => console.log(`移除 ${type} 监听器`)
  };
  
  const clickHandler = () => console.log('按钮被点击');
  const anotherHandler = () => console.log('另一个处理器');
  
  eventManager.addEventListener(button, 'click', clickHandler);
  eventManager.addEventListener(button, 'click', clickHandler); // 重复注册
  eventManager.addEventListener(button, 'click', anotherHandler);
  
  eventManager.removeEventListener(button, 'click', clickHandler);
  
  return { eventManager, registeredListeners };
}

const eventDemo = demonstrateEventListenerManagement();