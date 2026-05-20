function demonstrateListenerManagement() {
  console.log('\n=== 监听器管理 ===');
  
  const eventListeners = new WeakMap();
  
  class EventTarget {
    constructor() {
      eventListeners.set(this, new Map());
    }
    
    addEventListener(type, listener) {
      const listeners = eventListeners.get(this);
      if (!listeners.has(type)) {
        listeners.set(type, new Set());
      }
      listeners.get(type).add(listener);
    }
    
    removeEventListener(type, listener) {
      const listeners = eventListeners.get(this);
      if (listeners.has(type)) {
        listeners.get(type).delete(listener);
      }
    }
    
    dispatchEvent(type, data) {
      const listeners = eventListeners.get(this);
      if (listeners.has(type)) {
        listeners.get(type).forEach(listener => {
          try {
            listener(data);
          } catch (error) {
            console.error(`监听器执行错误: ${error.message}`);
          }
        });
      }
    }
  }
  
  // 使用示例
  const emitter = new EventTarget();
  
  const listener1 = data => console.log('监听器1:', data);
  const listener2 = data => console.log('监听器2:', data);
  
  emitter.addEventListener('message', listener1);
  emitter.addEventListener('message', listener2);
  emitter.addEventListener('error', error => console.error('错误:', error));
  
  console.log('触发消息事件:');
  emitter.dispatchEvent('message', { text: 'Hello World' });
  
  emitter.removeEventListener('message', listener1);
  console.log('移除监听器1后:');
  emitter.dispatchEvent('message', { text: '第二次消息' });
  
  // 当 EventTarget 实例被回收时，所有监听器也会自动清理
  return eventListeners;
}

const listenerDemo = demonstrateListenerManagement();