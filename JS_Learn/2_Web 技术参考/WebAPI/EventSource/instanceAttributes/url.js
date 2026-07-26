/**
 * @fileoverview EventSource url 属性详解
 * @description 详细介绍 EventSource 实例的 url 属性，用于获取服务器端点的 URL
 * @author LearnJS
 * @version 1.0.0
 */

/**
 * =================================================================================
 * url 属性详解
 * =================================================================================
 * 
 * url 是 EventSource 实例的一个只读属性，用于返回创建 EventSource 时指定的 URL。
 * 这个 URL 指向服务器端的 SSE 端点，用于接收服务器发送的事件流。
 * 
 * 特性说明：
 * - 只读属性：一旦创建就无法更改
 * - 返回完整 URL：包括协议、域名、路径和查询参数（如果有）
 * - 与构造函数参数一致：返回的是传入构造函数的原始 URL
 * 
 * =================================================================================
 * 使用场景
 * =================================================================================
 * 
 * 1. 日志记录：记录连接到了哪个端点，便于问题排查
 * 2. 调试信息：在 UI 上显示当前连接的 URL
 * 3. 动态重连：使用相同的 URL 重新建立连接
 * 4. 验证配置：确认 EventSource 使用了正确的 URL
 * 5. 多端点管理：管理多个 SSE 连接时区分不同端点
 * 
 * =================================================================================
 * 注意事项
 * =================================================================================
 * 
 * - url 属性返回的是创建 EventSource 时传入的 URL
 * - 如果构造函数中传入的是相对路径，返回的也是相对路径
 * - URL 不会因为重连而改变，即使服务器端发生了重定向
 * 
 * =================================================================================
 * 示例代码
 * =================================================================================
 */

// 示例1：基本用法 - 获取连接的 URL
function demoBasicUsage() {
  console.log('========== 示例1：基本用法 ==========');
  
  // 创建 EventSource 时指定 URL
  const eventSource = new EventSource('https://httpbin.org/eventsource');
  
  // 通过 url 属性获取连接的 URL
  console.log('连接的 URL:', eventSource.url);
  console.log('URL 长度:', eventSource.url.length);
  
  // 监听连接打开事件
  eventSource.onopen = function() {
    console.log('连接已打开');
    console.log('URL 仍然是:', eventSource.url);
  };
  
  // 监听消息事件
  eventSource.onmessage = function(event) {
    console.log('收到消息:', event.data);
  };
  
  // 监听错误事件
  eventSource.onerror = function() {
    console.log('发生错误');
    console.log('URL 始终不变:', eventSource.url);
    eventSource.close();
  };
  
  return eventSource;
}

// 示例2：使用相对路径
function demoRelativePath() {
  console.log('========== 示例2：使用相对路径 ==========');
  
  // 使用相对路径创建 EventSource
  const eventSource = new EventSource('/api/events/stream');
  
  console.log('相对路径 URL:', eventSource.url);
  console.log('注意：实际解析后的完整 URL 取决于当前页面域名');
  
  eventSource.onmessage = function(event) {
    console.log('收到消息:', event.data);
  };
  
  eventSource.onerror = function() {
    eventSource.close();
  };
  
  return eventSource;
}

// 示例3：带查询参数的 URL
function demoUrlWithQueryParams() {
  console.log('========== 示例3：带查询参数的 URL ==========');
  
  // 创建带查询参数的 EventSource
  const params = new URLSearchParams({
    token: 'abc123',
    category: 'news',
    format: 'json'
  });
  
  const eventSource = new EventSource('https://httpbin.org/eventsource?' + params);
  
  console.log('完整 URL:', eventSource.url);
  
  // 解析 URL 获取查询参数
  const urlObj = new URL(eventSource.url);
  console.log('查询参数 token:', urlObj.searchParams.get('token'));
  console.log('查询参数 category:', urlObj.searchParams.get('category'));
  
  eventSource.onmessage = function(event) {
    console.log('收到消息:', event.data);
  };
  
  eventSource.onerror = function() {
    eventSource.close();
  };
  
  return eventSource;
}

// 示例4：多端点管理 - 记录和比较 URL
function demoMultipleEndpoints() {
  console.log('========== 示例4：多端点管理 ==========');
  
  // 创建多个 EventSource 实例
  const endpoints = [
    'https://httpbin.org/eventsource',
    'https://httpbin.org/stream/delay/2'
  ];
  
  // 存储所有 EventSource 实例
  const sources = [];
  
  endpoints.forEach(function(url, index) {
    console.log('创建第 ' + (index + 1) + ' 个 EventSource: ' + url);
    const source = new EventSource(url);
    
    // 保存 URL 信息
    source._customName = 'endpoint-' + (index + 1);
    
    source.onmessage = function(event) {
      console.log('[' + source._customName + '] 收到消息: ' + event.data);
      console.log('[' + source._customName + '] URL: ' + source.url);
    };
    
    source.onerror = function() {
      console.log('[' + source._customName + '] 发生错误，URL: ' + source.url);
      source.close();
    };
    
    sources.push(source);
  });
  
  // 3秒后清理
  setTimeout(function() {
    console.log('清理所有连接');
    sources.forEach(function(source) { source.close(); });
  }, 5000);
  
  return sources;
}

// 示例5：URL 验证 - 确保正确的端点
function demoUrlValidation() {
  console.log('========== 示例5：URL 验证 ==========');
  
  /**
   * 验证 EventSource URL 是否符合预期
   * @param {EventSource} source - EventSource 实例
   * @param {string} expectedPattern - 期望的 URL 模式
   * @returns {boolean} 是否匹配
   */
  function validateUrl(source, expectedPattern) {
    return source.url.indexOf(expectedPattern) !== -1;
  }
  
  // 创建 EventSource
  const eventSource = new EventSource('https://httpbin.org/eventsource');
  
  console.log('创建的 EventSource URL:', eventSource.url);
  console.log('是否包含 eventsource:', validateUrl(eventSource, 'eventsource'));
  console.log('是否是 https 协议:', eventSource.url.indexOf('https://') === 0);
  console.log('是否包含 httpbin:', validateUrl(eventSource, 'httpbin'));
  
  eventSource.onmessage = function(event) {
    console.log('收到消息:', event.data);
  };
  
  eventSource.onerror = function() {
    eventSource.close();
  };
  
  return eventSource;
}

// 示例6：动态 URL - 根据条件创建不同端点
function demoDynamicUrl() {
  console.log('========== 示例6：动态 URL ==========');
  
  /**
   * 根据配置创建 EventSource URL
   * @param {Object} config - 配置对象
   * @returns {string} 完整的 URL
   */
  function buildEventSourceUrl(config) {
    const baseUrl = config.baseUrl || 'https://httpbin.org';
    const endpoint = config.endpoint || '/eventsource';
    const params = new URLSearchParams(config.params || {});
    
    return baseUrl + endpoint + '?' + params;
  }
  
  // 配置1：新闻流
  const newsConfig = {
    baseUrl: 'https://httpbin.org',
    endpoint: '/eventsource',
    params: { type: 'news', interval: '5' }
  };
  
  // 配置2：股票行情
  const stockConfig = {
    baseUrl: 'https://httpbin.org',
    endpoint: '/eventsource',
    params: { type: 'stock', symbols: 'AAPL,GOOGL' }
  };
  
  // 创建两个不同的 EventSource
  const newsSource = new EventSource(buildEventSourceUrl(newsConfig));
  const stockSource = new EventSource(buildEventSourceUrl(stockConfig));
  
  console.log('新闻流 URL:', newsSource.url);
  console.log('股票流 URL:', stockSource.url);
  
  // 监听消息
  newsSource.onmessage = function(event) {
    console.log('[新闻] 收到消息:', event.data);
  };
  
  stockSource.onmessage = function(event) {
    console.log('[股票] 收到消息:', event.data);
  };
  
  newsSource.onerror = function() {
    console.log('[新闻] 连接错误');
    newsSource.close();
  };
  
  stockSource.onerror = function() {
    console.log('[股票] 连接错误');
    stockSource.close();
  };
  
  return [newsSource, stockSource];
}

// 示例7：重连时使用相同的 URL
function demoReconnectWithSameUrl() {
  console.log('========== 示例7：重连时使用相同的 URL ==========');
  
  // 保存原始 URL
  let originalUrl = null;
  let reconnectCount = 0;
  
  // 创建 EventSource
  const eventSource = new EventSource('https://httpbin.org/eventsource');
  
  // 保存原始 URL
  originalUrl = eventSource.url;
  console.log('初始 URL:', originalUrl);
  
  eventSource.onopen = function() {
    console.log('连接已打开');
  };
  
  eventSource.onmessage = function(event) {
    console.log('收到消息:', event.data);
  };
  
  eventSource.onerror = function() {
    console.log('发生错误，readyState:', eventSource.readyState);
    reconnectCount++;
    console.log('重连尝试次数: ' + reconnectCount);
    
    // 检查连接是否已关闭
    if (eventSource.readyState === EventSource.CLOSED) {
      console.log('连接已关闭');
      console.log('可以使用保存的 URL 重新连接:', originalUrl);
    }
  };
  
  return eventSource;
}

// 完整的 EventSource 管理类示例
class EventSourceManager {
  constructor() {
    this.sources = new Map();
  }
  
  /**
   * 添加一个 EventSource 连接
   * @param {string} name - 连接名称
   * @param {string} url - 服务器端点 URL
   */
  addSource(name, url) {
    // 检查是否已存在
    if (this.sources.has(name)) {
      console.log('"' + name + '" 已存在，URL: ' + this.sources.get(name).url);
      return;
    }
    
    // 创建新的 EventSource
    const source = new EventSource(url);
    
    // 存储连接信息
    this.sources.set(name, source);
    
    console.log('添加连接 "' + name + '", URL: ' + source.url);
    
    // 设置默认事件处理
    source.onmessage = function(event) {
      console.log('[' + name + '] 收到消息: ' + event.data);
    };
    
    source.onerror = function() {
      console.log('[' + name + '] 发生错误, URL: ' + source.url);
    };
    
    return source;
  }
  
  /**
   * 移除一个 EventSource 连接
   * @param {string} name - 连接名称
   */
  removeSource(name) {
    const source = this.sources.get(name);
    if (source) {
      console.log('移除连接 "' + name + '", URL: ' + source.url);
      source.close();
      this.sources.delete(name);
    }
  }
  
  /**
   * 获取所有连接的 URL 信息
   * @returns {Array} 连接信息数组
   */
  getAllUrls() {
    const urls = [];
    this.sources.forEach(function(source, name) {
      urls.push({
        name: name,
        url: source.url,
        readyState: source.readyState
      });
    });
    return urls;
  }
  
  /**
   * 关闭所有连接
   */
  closeAll() {
    console.log('关闭所有连接');
    this.sources.forEach(function(source, name) {
      console.log('关闭 "' + name + '", URL: ' + source.url);
      source.close();
    });
    this.sources.clear();
  }
}

// 导出模块
module.exports = {
  demoBasicUsage,
  demoRelativePath,
  demoUrlWithQueryParams,
  demoMultipleEndpoints,
  demoUrlValidation,
  demoDynamicUrl,
  demoReconnectWithSameUrl,
  demoEventSourceManager: EventSourceManager
};