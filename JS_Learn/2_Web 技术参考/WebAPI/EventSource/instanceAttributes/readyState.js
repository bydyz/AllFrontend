/**
 * @fileoverview EventSource readyState 属性详解
 * @description 详细介绍 EventSource 实例的 readyState 属性，用于获取当前连接状态
 * @author LearnJS
 * @version 1.0.0
 */

/**
 * =================================================================================
 * readyState 属性详解
 * =================================================================================
 * 
 * readyState 是 EventSource 实例的一个只读属性，用于表示当前 SSE 连接的状态。
 * 它返回一个数值，代表连接的三种可能状态之一。
 * 
 * 属性值说明：
 * - EventSource.CONSTANT (0): CONNECTING - 表示正在建立连接
 * - EventSource.OPEN (1): OPEN - 表示连接已打开，可以接收消息
 * - EventSource.CLOSED (2): CLOSED - 表示连接已关闭
 * 
 * =================================================================================
 * 使用场景
 * =================================================================================
 * 
 * 1. 在建立连接前检查状态，确保不会重复建立连接
 * 2. 在断开连接后检查状态，判断是否需要重新连接
 * 3. 在连接过程中监听状态变化，实时了解连接进展
 * 4. 在调试时输出状态信息，帮助诊断连接问题
 * 
 * =================================================================================
 * 常量定义
 * =================================================================================
 */

// EventSource 连接状态常量（这些是静态属性）
const ReadyState = {
  CONNECTING: 0,  // 连接中
  OPEN: 1,        // 已连接
  CLOSED: 2       // 已关闭
};

// 状态对应的文字描述
const ReadyStateText = {
  0: 'CONNECTING - 连接中',
  1: 'OPEN - 已连接',
  2: 'CLOSED - 已关闭'
};

/**
 * =================================================================================
 * 示例代码
 * =================================================================================
 */

// 示例1：基本用法 - 读取当前连接状态
function demoBasicUsage() {
  console.log('========== 示例1：基本用法 ==========');
  
  // 创建 EventSource 实例
  const eventSource = new EventSource('https://httpbin.org/eventsource');
  
  // 读取 readyState 属性
  console.log('初始 readyState:', eventSource.readyState);
  console.log('对应状态:', ReadyStateText[eventSource.readyState]);
  
  // 监听 open 事件
  eventSource.onopen = function() {
    console.log('连接已打开，当前 readyState:', eventSource.readyState);
    console.log('状态描述:', ReadyStateText[eventSource.readyState]);
  };
  
  // 监听 message 事件
  eventSource.onmessage = function(event) {
    console.log('收到消息:', event.data);
    console.log('当前 readyState:', eventSource.readyState);
  };
  
  // 监听 error 事件
  eventSource.onerror = function() {
    console.log('发生错误，当前 readyState:', eventSource.readyState);
    console.log('状态描述:', ReadyStateText[eventSource.readyState]);
    
    // 关闭连接
    eventSource.close();
  };
  
  return eventSource;
}

// 示例2：状态检查 - 在不同阶段检查连接状态
function demoStateCheck() {
  console.log('========== 示例2：状态检查 ==========');
  
  const eventSource = new EventSource('https://httpbin.org/eventsource');
  
  /**
   * 检查当前是否处于可接收消息的状态
   * @returns {boolean} 是否处于 OPEN 状态
   */
  function isConnected() {
    return eventSource.readyState === EventSource.OPEN;
  }
  
  /**
   * 检查是否正在尝试连接
   * @returns {boolean} 是否处于 CONNECTING 状态
   */
  function isConnecting() {
    return eventSource.readyState === EventSource.CONNECTING;
  }
  
  /**
   * 检查连接是否已关闭
   * @returns {boolean} 是否处于 CLOSED 状态
   */
  function isClosed() {
    return eventSource.readyState === EventSource.CLOSED;
  }
  
  // 定时检查状态
  const checkInterval = setInterval(() => {
    console.log('当前状态:', ReadyStateText[eventSource.readyState]);
    
    // 如果连接已关闭或出错，停止检查
    if (isClosed()) {
      clearInterval(checkInterval);
      eventSource.close();
    }
  }, 2000);
  
  // 5秒后清理
  setTimeout(() => {
    clearInterval(checkInterval);
    eventSource.close();
    console.log('演示结束，连接已关闭');
  }, 10000);
  
  return eventSource;
}

// 示例3：状态转换监听 - 监听连接状态的变化
function demoStateTransition() {
  console.log('========== 示例3：状态转换监听 ==========');
  
  const eventSource = new EventSource('https://httpbin.org/eventsource');
  
  // 保存上一次的状态
  let previousState = eventSource.readyState;
  
  // 监听 open 事件 - 连接打开
  eventSource.addEventListener('open', function() {
    console.log('>>> 事件: open - 连接已打开');
    console.log('    状态从', ReadyStateText[previousState], '变为', ReadyStateText[eventSource.readyState]);
    previousState = eventSource.readyState;
  });
  
  // 监听 message 事件 - 收到消息
  eventSource.addEventListener('message', function(event) {
    console.log('>>> 事件: message - 收到消息');
    console.log('    数据:', event.data);
    console.log('    当前状态:', ReadyStateText[eventSource.readyState]);
  });
  
  // 监听 error 事件 - 发生错误
  eventSource.addEventListener('error', function() {
    console.log('>>> 事件: error - 发生错误');
    console.log('    错误前状态:', ReadyStateText[previousState]);
    console.log('    错误后状态:', ReadyStateText[eventSource.readyState]);
    previousState = eventSource.readyState;
    
    // 如果连接已关闭
    if (eventSource.readyState === EventSource.CLOSED) {
      console.log('    连接已永久关闭');
    }
  });
  
  return eventSource;
}

// 示例4：自动重连控制 - 根据状态决定是否重连
function demoReconnectControl() {
  console.log('========== 示例4：自动重连控制 ==========');
  
  const eventSource = new EventSource('https://httpbin.org/eventsource');
  
  // 监听 error 事件
  eventSource.onerror = function() {
    console.log('检测到错误，readyState:', eventSource.readyState);
    
    // 判断是否是可恢复的错误
    if (eventSource.readyState === EventSource.CONNECTING) {
      console.log('正在重连中...');
    } else if (eventSource.readyState === EventSource.CLOSED) {
      console.log('连接已关闭，不再自动重连');
    }
  };
  
  // 3秒后手动关闭
  setTimeout(() => {
    console.log('手动关闭连接');
    eventSource.close();
    console.log('关闭后 readyState:', eventSource.readyState);
  }, 5000);
  
  return eventSource;
}

// 示例5：状态轮询 - 定时检查并输出状态信息
function demoStatePolling() {
  console.log('========== 示例5：状态轮询 ==========');
  
  const eventSource = new EventSource('https://httpbin.org/eventsource');
  
  // 定时输出状态信息
  const timer = setInterval(() => {
    const state = eventSource.readyState;
    const stateText = ReadyStateText[state];
    const timestamp = new Date().toLocaleTimeString();
    
    console.log('[' + timestamp + '] readyState: ' + state + ' (' + stateText + ')');
    
    // 如果连接已关闭，停止轮询
    if (state === EventSource.CLOSED) {
      clearInterval(timer);
      console.log('连接已关闭，停止轮询');
    }
  }, 1500);
  
  // 10秒后清理
  setTimeout(() => {
    clearInterval(timer);
    eventSource.close();
    console.log('演示完成');
  }, 10000);
  
  return eventSource;
}

// 示例6：使用常量进行状态比较（推荐写法）
function demoUseConstants() {
  console.log('========== 示例6：使用常量进行状态比较 ==========');
  
  const eventSource = new EventSource('https://httpbin.org/eventsource');
  
  // 推荐使用 EventSource 原生常量进行比较
  console.log('使用 EventSource.CONNECTING:', eventSource.readyState === EventSource.CONNECTING);
  console.log('使用 EventSource.OPEN:', eventSource.readyState === EventSource.OPEN);
  console.log('使用 EventSource.CLOSED:', eventSource.readyState === EventSource.CLOSED);
  
  // 状态判断辅助函数
  function getConnectionStatus(source) {
    switch (source.readyState) {
      case EventSource.CONNECTING:
        return '正在连接';
      case EventSource.OPEN:
        return '已连接';
      case EventSource.CLOSED:
        return '已关闭';
      default:
        return '未知状态';
    }
  }
  
  console.log('连接状态:', getConnectionStatus(eventSource));
  
  // 定期检查状态
  const interval = setInterval(() => {
    const status = getConnectionStatus(eventSource);
    console.log('当前状态:', status);
    
    if (eventSource.readyState === EventSource.CLOSED) {
      clearInterval(interval);
    }
  }, 2000);
  
  setTimeout(() => {
    clearInterval(interval);
    eventSource.close();
  }, 8000);
  
  return eventSource;
}

// 导出模块
module.exports = {
  ReadyState,
  ReadyStateText,
  demoBasicUsage,
  demoStateCheck,
  demoStateTransition,
  demoReconnectControl,
  demoStatePolling,
  demoUseConstants
};