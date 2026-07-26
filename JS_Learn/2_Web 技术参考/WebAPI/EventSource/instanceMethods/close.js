/**
 * @fileoverview EventSource close() 方法示例
 * @description 演示如何使用 EventSource 的 close() 方法来关闭服务器发送事件连接
 * @see https://developer.mozilla.org/en-US/docs/Web/API/EventSource/close
 * @see https://html.spec.whatwg.org/multipage/server-sent-events.html#dom-eventsource-close-dev
 */

/**
 * close() 方法详解
 * =============================================
 * 
 * 【概述】
 * close() 方法用于关闭 EventSource 连接，并将 readyState 属性设置为 CLOSED (2)
 * 
 * 【语法】
 * eventSource.close()
 * 
 * 【参数】
 * 无 - 该方法不接受任何参数
 * 
 * 【返回值】
 * undefined - 该方法没有返回值
 * 
 * 【使用场景】
 * 1. 用户主动关闭 SSE 连接（如点击关闭按钮、离开页面）
 * 2. 应用不再需要接收服务器推送数据时
 * 3. 清理资源，在页面卸载前断开连接
 * 4. 根据业务条件手动断开连接（如登录过期）
 * 
 * 【注意事项】
 * - 如果连接已经关闭，调用 close() 不会执行任何操作
 * - 关闭后 readyState 会变成 CLOSED (2)
 * - 关闭连接后无法重新打开，需要创建新的 EventSource 实例
 * - 建议在页面卸载（beforeunload/unload）事件中调用
 * - 可在 Web Worker 中使用
 * 
 * =============================================
 */

// ============================================
// 示例 1：基础用法 - 按钮点击关闭连接
// ============================================

function exampleBasicClose() {
  // 创建 EventSource 实例，连接到 SSE 服务器
  const eventSource = new EventSource('/api/events/stream');

  // 监听消息事件
  eventSource.onmessage = function(event) {
    console.log('收到消息:', event.data);
  };

  // 监听错误事件
  eventSource.onerror = function(error) {
    console.error('连接错误:', error);
  };

  // 获取关闭按钮并添加点击事件
  const closeButton = document.getElementById('closeBtn');
  if (closeButton) {
    closeButton.addEventListener('click', function() {
      // 调用 close() 方法关闭连接
      eventSource.close();
      
      // 验证连接已关闭
      console.log('readyState:', eventSource.readyState); // 输出: 2 (CLOSED)
      console.log('连接已关闭');
    });
  }
}


// ============================================
// 示例 2：带状态检查的关闭
// ============================================

function exampleCloseWithCheck() {
  const eventSource = new EventSource('/api/notifications');

  // 显示当前连接状态
  console.log('初始 readyState:', eventSource.readyState); // 0 (CONNECTING)

  eventSource.onopen = function() {
    console.log('连接已打开, readyState:', eventSource.readyState); // 1 (OPEN)
  };

  eventSource.onmessage = function(event) {
    console.log('收到通知:', event.data);
  };

  // 安全关闭函数 - 先检查连接状态
  function safeClose() {
    // 只在连接打开或正在连接时关闭
    if (eventSource.readyState !== EventSource.CLOSED) {
      console.log('正在关闭连接...');
      eventSource.close();
      console.log('关闭完成, readyState:', eventSource.readyState); // 2 (CLOSED)
    } else {
      console.log('连接已经关闭，无需重复操作');
    }
  }

  // 5秒后自动关闭连接（示例）
  setTimeout(safeClose, 5000);

  return eventSource;
}


// ============================================
// 示例 3：页面卸载时关闭连接
// ============================================

function exampleCloseOnUnload() {
  const eventSource = new EventSource('/api/live-updates');

  eventSource.onmessage = function(event) {
    // 更新页面数据
    updateUI(event.data);
  };

  // 在页面卸载前关闭连接，释放资源
  window.addEventListener('beforeunload', function() {
    if (eventSource.readyState !== EventSource.CLOSED) {
      console.log('页面即将关闭，关闭 SSE 连接');
      eventSource.close();
    }
  });

  // 兼容移动端页面隐藏
  document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
      // 页面隐藏时关闭连接以节省资源
      console.log('页面隐藏，关闭 SSE 连接');
      eventSource.close();
    } else {
      // 页面重新显示时重新建立连接（可选）
      console.log('页面显示，重新建立 SSE 连接');
      // 注意：需要创建新的 EventSource 实例
    }
  });

  return eventSource;
}


// ============================================
// 示例 4：根据条件自动关闭
// ============================================

function exampleConditionalClose() {
  let eventSource = null;
  let messageCount = maxMessages = 10;  // 限制接收消息数量
  let isLoggedIn = true;  // 模拟登录状态

  function connect() {
    eventSource = new EventSource('/api/stream');

    eventSource.onmessage = function(event) {
      messageCount--;
      console.log('收到消息:', event.data, '剩余:', messageCount);

      // 达到消息数量上限时关闭
      if (messageCount <= 0) {
        console.log('已达到消息上限，关闭连接');
        eventSource.close();
      }
    };

    eventSource.onerror = function(error) {
      console.error('连接错误:', error);
    };
  }

  // 模拟登录状态变化时关闭
  function handleLogout() {
    isLoggedIn = false;
    if (eventSource && eventSource.readyState !== EventSource.CLOSED) {
      console.log('用户登出，关闭 SSE 连接');
      eventSource.close();
    }
  }

  // 启动连接
  connect();

  return {
    close: handleLogout,
    getState: () => eventSource ? eventSource.readyState : null
  };
}


// ============================================
// 示例 5：在 Web Worker 中使用 close()
// ============================================

/**
 * Web Worker 中的 SSE 连接管理
 * 
 * 在 worker 线程中：
 */

// ==== worker.js 内容 ====
/*
self.onmessage = function(e) {
  if (e.data === 'start') {
    const eventSource = new EventSource('/api/worker-stream');
    
    eventSource.onmessage = function(event) {
      // 发送消息给主线程
      self.postMessage({ type: 'message', data: event.data });
    };
    
    eventSource.onerror = function(error) {
      self.postMessage({ type: 'error', error: error });
    };
    
    // 保存引用以便后续关闭
    self.eventSource = eventSource;
  }
  else if (e.data === 'stop') {
    // 关闭连接
    if (self.eventSource) {
      self.eventSource.close();
      console.log('Worker 中 SSE 连接已关闭');
    }
  }
};
*/

// ==== 主线程中使用 Web Worker ====
function exampleWorkerSSE() {
  // 创建 Web Worker
  const worker = new Worker('worker.js');

  // 启动 SSE 流
  worker.postMessage('start');

  // 监听 Worker 消息
  worker.onmessage = function(e) {
    if (e.data.type === 'message') {
      console.log('从 Worker 收到:', e.data.data);
    } else if (e.data.type === 'error') {
      console.error('Worker 错误:', e.data.error);
    }
  };

  // 停止并关闭 SSE 连接
  function stopSSE() {
    worker.postMessage('stop');
    worker.terminate();
  }

  // 5秒后自动停止
  setTimeout(stopSSE, 5000);

  return { worker, stop: stopSSE };
}


// ============================================
// 示例 6：完整演示 - 实时聊天/通知应用
// ============================================

/**
 * 实时通知系统示例
 * 展示完整的 SSE 连接生命周期管理
 */
class NotificationManager {
  constructor() {
    this.eventSource = null;
    this.notifications = [];
    this.isConnected = false;
  }

  /**
   * 启动通知连接
   */
  connect(url) {
    if (this.eventSource && this.isConnected) {
      console.log('连接已存在');
      return;
    }

    this.eventSource = new EventSource(url);

    // 连接打开
    this.eventSource.onopen = () => {
      this.isConnected = true;
      console.log('通知连接已建立, readyState:', this.eventSource.readyState);
      this.updateConnectionStatus('connected');
    };

    // 接收消息
    this.eventSource.onmessage = (event) => {
      const notification = JSON.parse(event.data);
      this.addNotification(notification);
      console.log('收到通知:', notification);
    };

    // 处理错误
    this.eventSource.onerror = (error) => {
      console.error('通知连接错误:', error);
      this.isConnected = false;
      this.updateConnectionStatus('error');
    };

    // 监听特定类型的事件
    this.eventSource.addEventListener('alert', (event) => {
      this.handleAlert(JSON.parse(event.data));
    });
  }

  /**
   * 关闭通知连接
   * 使用 close() 方法
   */
  disconnect() {
    if (this.eventSource) {
      // 检查连接是否未关闭
      if (this.eventSource.readyState !== EventSource.CLOSED) {
        console.log('正在关闭通知连接...');
        this.eventSource.close();
        this.isConnected = false;
        this.updateConnectionStatus('disconnected');
        console.log('通知连接已关闭, readyState:', this.eventSource.readyState);
      } else {
        console.log('连接已经是关闭状态');
      }
    }
  }

  /**
   * 获取当前连接状态
   */
  getConnectionState() {
    if (!this.eventSource) return 'none';
    
    const states = {
      [EventSource.CONNECTING]: 'connecting',
      [EventSource.OPEN]: 'open',
      [EventSource.CLOSED]: 'closed'
    };
    return states[this.eventSource.readyState] || 'unknown';
  }

  addNotification(notification) {
    this.notifications.push(notification);
    // 触发 UI 更新
    if (typeof updateNotificationsUI === 'function') {
      updateNotificationsUI(this.notifications);
    }
  }

  handleAlert(alert) {
    console.log('收到警报:', alert);
    // 显示警报提示
    if (typeof showAlert === 'function') {
      showAlert(alert);
    }
  }

  updateConnectionStatus(status) {
    console.log('连接状态:', status);
    // 可以在此更新 UI 指示器
  }
}

// 使用示例
function demoNotificationManager() {
  const manager = new NotificationManager();
  
  // 启动连接
  manager.connect('/api/notifications/stream');
  
  // 模拟：30秒后自动断开
  setTimeout(() => {
    console.log('演示结束，关闭连接');
    manager.disconnect();
  }, 30000);

  return manager;
}


// ============================================
// 常量参考（MDN 文档）
// ============================================

/**
 * EventSource.readyState 的可能值：
 * - EventSource.CONNECTING (0): 连接尚未建立，或正在重新连接
 * - EventSource.OPEN (1): 连接已打开，正在接收事件
 * - EventSource.CLOSED (2): 连接已关闭，不在尝试重新连接
 */

// ============================================
// 测试函数 - 模拟服务器响应
// ============================================

/**
 * 模拟 SSE 服务器响应的简单函数
 * 在实际环境中需要真实服务器
 */
function mockSSEServer() {
  console.log('=== 模拟 SSE 服务器 ===');
  console.log('服务器响应格式: text/event-stream');
  console.log('');
  console.log('示例响应:');
  console.log('data: {"message": "Hello"}\n');
  console.log('data: {"message": "World"}\n');
  console.log('event: alert\n');
  console.log('data: {"level": "warning", "text": "注意!"}\n');
}


// ============================================
// 导出（适用于模块化环境）
// ============================================

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    exampleBasicClose,
    exampleCloseWithCheck,
    exampleCloseOnUnload,
    exampleConditionalClose,
    exampleWorkerSSE,
    demoNotificationManager,
    NotificationManager,
    mockSSEServer
  };
}

console.log('EventSource close() 方法示例已加载');
console.log('查看上方示例函数了解 close() 的各种用法');
