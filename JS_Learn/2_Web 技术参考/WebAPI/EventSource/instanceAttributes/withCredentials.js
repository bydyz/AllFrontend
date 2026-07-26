/**
 * @fileoverview EventSource withCredentials 属性详解
 * @description 详细介绍 EventSource 实例的 withCredentials 属性，用于判断是否携带跨域凭证
 * @author LearnJS
 * @version 1.0.0
 */

/**
 * =================================================================================
 * withCredentials 属性详解
 * =================================================================================
 * 
 * withCredentials 是 EventSource 实例的一个只读属性，用于返回是否配置了跨域凭证。
 * 这个属性决定了在发起跨域 SSE 连接时，是否会携带 Cookie、Authorization 头等凭证信息。
 * 
 * 属性值说明：
 * - true: 创建 EventSource 时传入了 withCredentials: true，连接会携带凭证
 * - false: 创建 EventSource 时未传入 withCredentials 或传入 false（默认值）
 * 
 * =================================================================================
 * 使用场景
 * =================================================================================
 * 
 * 1. 身份验证：需要携带认证信息访问受保护的 SSE 端点
 * 2. 会话管理：需要保持登录状态的 SSE 连接
 * 3. 跨域通信：与不同域的服务器建立 SSE 连接时携带凭证
 * 4. 调试检查：确认当前 SSE 连接是否配置了凭证
 * 5. 安全审计：记录哪些连接使用了凭证
 * 
 * =================================================================================
 * CORS 跨域凭证说明
 * =================================================================================
 * 
 * 当 withCredentials 设置为 true 时：
 * - 会发送 Cookie（按照 CORS 规则）
 * - 可能会发送 Authorization 头
 * - 不会发送自定义请求头
 * 
 * 注意事项：
 * - 服务器必须设置 Access-Control-Allow-Credentials: true
 * - 服务器必须设置 Access-Control-Allow-Origin 为具体域名（不能是 *）
 * - 如果服务器不支持凭证，请求会失败
 * 
 * =================================================================================
 * 示例代码
 * =================================================================================
 */

// 示例1：基本用法 - 检查 withCredentials 状态
function demoBasicUsage() {
  console.log('========== 示例1：基本用法 ==========');
  
  // 不带凭证的连接（默认）
  const eventSourceWithoutCred = new EventSource('https://httpbin.org/eventsource');
  console.log('默认创建的 withCredentials:', eventSourceWithoutCred.withCredentials);
  console.log('（默认值通常为 false）');
  
  // 带凭证的连接
  const eventSourceWithCred = new EventSource('https://httpbin.org/eventsource', {
    withCredentials: true
  });
  console.log('设置 withCredentials: true 后的值:', eventSourceWithCred.withCredentials);
  
  // 清理
  setTimeout(function() {
    eventSourceWithoutCred.close();
    eventSourceWithCred.close();
  }, 3000);
  
  return [eventSourceWithoutCred, eventSourceWithCred];
}

// 示例2：使用 withCredentials 进行条件处理
function demoConditionalHandling() {
  console.log('========== 示例2：条件处理 ==========');
  
  /**
   * 根据 withCredentials 状态进行不同的处理
   * @param {EventSource} source - EventSource 实例
   */
  function handleEventSource(source) {
    if (source.withCredentials) {
      console.log('此连接携带凭证，可能已认证');
      console.log('提示：确保服务器允许跨域凭证');
    } else {
      console.log('此连接不携带凭证');
      console.log('提示：适用于公开端点');
    }
    
    // 显示连接信息
    console.log('  URL:', source.url);
    console.log('  withCredentials:', source.withCredentials);
  }
  
  // 创建两种不同的连接
  const publicSource = new EventSource('https://httpbin.org/eventsource');
  const authSource = new EventSource('https://httpbin.org/eventsource', {
    withCredentials: true
  });
  
  console.log('处理公开连接:');
  handleEventSource(publicSource);
  console.log('');
  
  console.log('处理认证连接:');
  handleEventSource(authSource);
  
  // 清理
  setTimeout(function() {
    publicSource.close();
    authSource.close();
  }, 3000);
  
  return [publicSource, authSource];
}

// 示例3：安全检查 - 验证凭证配置
function demoSecurityCheck() {
  console.log('========== 示例3：安全检查 ==========');
  
  /**
   * 安全检查函数：验证 withCredentials 配置是否正确
   * @param {string} url - 服务器 URL
   * @param {boolean} withCredentials - 是否使用凭证
   * @returns {Object} 检查结果
   */
  function validateCredentialsConfig(url, withCredentials) {
    const result = {
      isValid: true,
      warnings: [],
      errors: []
    };
    
    // 检查 URL 协议
    if (url.indexOf('http://') === 0 && withCredentials) {
      result.warnings.push('在 HTTP 连接中使用 withCredentials 可能不安全');
    }
    
    // 检查跨域情况
    try {
      const currentOrigin = window.location.origin;
      const targetOrigin = new URL(url).origin;
      
      if (currentOrigin !== targetOrigin && withCredentials) {
        result.warnings.push('跨域连接 (' + targetOrigin + ')，已配置凭证');
        result.warnings.push('请确保目标服务器支持 CORS 凭证');
      }
    } catch (e) {
      result.errors.push('URL 格式无效');
      result.isValid = false;
    }
    
    return result;
  }
  
  // 测试不同配置
  const configs = [
    { url: 'https://api.example.com/events', withCredentials: true },
    { url: 'http://localhost:3000/events', withCredentials: true },
    { url: 'https://httpbin.org/eventsource', withCredentials: false }
  ];
  
  configs.forEach(function(config, index) {
    console.log('配置 ' + (index + 1) + ':', JSON.stringify(config));
    const result = validateCredentialsConfig(config.url, config.withCredentials);
    console.log('  验证结果:', JSON.stringify(result));
    console.log('');
  });
  
  // 创建 EventSource
  const eventSource = new EventSource('https://httpbin.org/eventsource', {
    withCredentials: true
  });
  
  console.log('创建的 EventSource 配置:');
  console.log('  URL:', eventSource.url);
  console.log('  withCredentials:', eventSource.withCredentials);
  
  eventSource.close();
  
  return eventSource;
}

// 示例4：工厂函数 - 根据认证状态创建不同配置的 EventSource
function demoFactoryFunction() {
  console.log('========== 示例4：工厂函数 ==========');
  
  /**
   * 创建 EventSource 的工厂函数
   * @param {string} url - 服务器端点 URL
   * @param {Object} options - 配置选项
   * @param {boolean} options.authenticated - 是否需要认证
   * @param {string} options.token - 认证令牌（可选）
   * @returns {EventSource} EventSource 实例
   */
  function createEventSource(url, options) {
    options = options || {};
    const config = {
      // 默认不携带凭证
      withCredentials: options.authenticated || false
    };
    
    console.log('创建 EventSource 配置:');
    console.log('  URL:', url);
    console.log('  withCredentials:', config.withCredentials);
    
    const source = new EventSource(url, config);
    
    // 验证配置
    console.log('  验证 - withCredentials:', source.withCredentials);
    
    return source;
  }
  
  // 创建公开的 SSE 连接（无需认证）
  console.log('场景1：公开连接');
  const publicSource = createEventSource('https://httpbin.org/eventsource', {
    authenticated: false
  });
  
  // 创建需要认证的 SSE 连接
  console.log('\n场景2：需要认证的连接');
  const authSource = createEventSource('https://httpbin.org/eventsource', {
    authenticated: true
  });
  
  // 监听消息
  publicSource.onmessage = function(e) { console.log('[公开] 消息:', e.data); };
  authSource.onmessage = function(e) { console.log('[认证] 消息:', e.data); };
  
  // 清理
  setTimeout(function() {
    publicSource.close();
    authSource.close();
  }, 3000);
  
  return [publicSource, authSource];
}

// 示例5：多连接管理 - 根据 withCredentials 分类
function demoMultiConnectionManagement() {
  console.log('========== 示例5：多连接管理 ==========');
  
  /**
   * SSE 连接管理器类
   */
  class SSEConnectionManager {
    constructor() {
      // 分类存储不同类型的连接
      this.authenticatedSources = new Map();
      this.publicSources = new Map();
    }
    
    /**
     * 添加连接
     * @param {string} name - 连接名称
     * @param {string} url - 服务器 URL
     * @param {boolean} withCredentials - 是否携带凭证
     */
    add(name, url, withCredentials) {
      const source = new EventSource(url, { withCredentials: withCredentials });
      
      // 根据配置分类存储
      const collection = withCredentials 
        ? this.authenticatedSources 
        : this.publicSources;
      
      collection.set(name, source);
      
      console.log('添加连接 "' + name + '":');
      console.log('  URL: ' + source.url);
      console.log('  withCredentials: ' + source.withCredentials);
      console.log('  分类: ' + (withCredentials ? '认证' : '公开'));
      
      return source;
    }
    
    /**
     * 获取所有连接的配置信息
     */
    getAllConfigs() {
      const configs = [];
      
      this.authenticatedSources.forEach(function(source, name) {
        configs.push({
          name: name,
          url: source.url,
          withCredentials: source.withCredentials,
          type: 'authenticated'
        });
      });
      
      this.publicSources.forEach(function(source, name) {
        configs.push({
          name: name,
          url: source.url,
          withCredentials: source.withCredentials,
          type: 'public'
        });
      });
      
      return configs;
    }
    
    /**
     * 统计信息
     */
    getStats() {
      return {
        authenticated: this.authenticatedSources.size,
        public: this.publicSources.size,
        total: this.authenticatedSources.size + this.publicSources.size
      };
    }
    
    /**
     * 关闭所有连接
     */
    closeAll() {
      console.log('关闭所有连接...');
      
      this.authenticatedSources.forEach(function(source, name) {
        console.log('  关闭认证连接: ' + name + ' (withCredentials: ' + source.withCredentials + ')');
        source.close();
      });
      
      this.publicSources.forEach(function(source, name) {
        console.log('  关闭公开连接: ' + name + ' (withCredentials: ' + source.withCredentials + ')');
        source.close();
      });
      
      this.authenticatedSources.clear();
      this.publicSources.clear();
    }
  }
  
  // 创建管理器
  const manager = new SSEConnectionManager();
  
  // 添加不同类型的连接
  manager.add('news-feed', 'https://httpbin.org/eventsource', false);
  manager.add('user-notifications', 'https://httpbin.org/eventsource', true);
  manager.add('stock-updates', 'https://httpbin.org/eventsource', false);
  manager.add('auth-messages', 'https://httpbin.org/eventsource', true);
  
  // 显示统计
  console.log('\n连接统计:');
  console.log(manager.getStats());
  
  // 显示所有配置
  console.log('\n所有连接配置:');
  console.log(manager.getAllConfigs());
  
  // 清理
  setTimeout(function() {
    manager.closeAll();
  }, 3000);
  
  return manager;
}

// 示例6：调试和日志记录
function demoDebugLogging() {
  console.log('========== 示例6：调试和日志记录 ==========');
  
  /**
   * 创建带调试功能的 EventSource
   * @param {string} name - 连接名称
   * @param {string} url - 服务器 URL
   * @param {boolean} withCredentials - 是否携带凭证
   * @returns {EventSource} 带有调试功能的 EventSource
   */
  function createDebuggableEventSource(name, url, withCredentials) {
    withCredentials = withCredentials || false;
    console.log('[' + name + '] 创建 EventSource');
    console.log('[' + name + ']   URL: ' + url);
    console.log('[' + name + ']   withCredentials: ' + withCredentials);
    
    const source = new EventSource(url, { withCredentials: withCredentials });
    
    // 保存元数据
    source._debugName = name;
    source._createdAt = new Date();
    
    // 拦截事件进行日志记录
    const originalOnOpen = source.onopen;
    source.onopen = function(event) {
      console.log('[' + name + '] 连接打开 - withCredentials: ' + source.withCredentials);
      if (originalOnOpen) originalOnOpen.call(source, event);
    };
    
    const originalOnMessage = source.onmessage;
    source.onmessage = function(event) {
      console.log('[' + name + '] 收到消息 - withCredentials: ' + source.withCredentials);
      if (originalOnMessage) originalOnMessage.call(source, event);
    };
    
    const originalOnError = source.onerror;
    source.onerror = function(event) {
      console.log('[' + name + '] 发生错误 - withCredentials: ' + source.withCredentials);
      if (originalOnError) originalOnError.call(source, event);
    };
    
    return source;
  }
  
  // 创建带调试的连接
  const source1 = createDebuggableEventSource('公开连接', 'https://httpbin.org/eventsource', false);
  const source2 = createDebuggableEventSource('认证连接', 'https://httpbin.org/eventsource', true);
  
  // 清理
  setTimeout(function() {
    source1.close();
    source2.close();
    console.log('调试连接已关闭');
  }, 3000);
  
  return [source1, source2];
}

// 示例：完整的认证 SSE 连接处理
function demoAuthenticatedConnection() {
  console.log('========== 示例：完整认证连接 ==========');
  
  /**
   * 认证的 SSE 连接处理器
   */
  class AuthenticatedSSEHandler {
    constructor(url, options) {
      options = options || {};
      this.url = url;
      this.withCredentials = options.withCredentials || false;
      this.authToken = options.authToken || null;
      this.source = null;
      this.handlers = new Map();
      this.isConnected = false;
    }
    
    /**
     * 初始化连接
     */
    connect() {
      console.log('初始化认证 SSE 连接');
      console.log('  URL: ' + this.url);
      console.log('  withCredentials: ' + this.withCredentials);
      
      try {
        this.source = new EventSource(this.url, {
          withCredentials: this.withCredentials
        });
        
        // 验证配置
        console.log('  验证 withCredentials: ' + this.source.withCredentials);
        
        // 设置事件处理
        const self = this;
        this.source.onopen = function(e) {
          self.isConnected = true;
          console.log('认证连接已建立');
          self.triggerHandler('open', e);
        };
        
        this.source.onmessage = function(e) {
          console.log('收到认证消息');
          self.triggerHandler('message', e);
        };
        
        this.source.onerror = function(e) {
          self.isConnected = false;
          console.log('认证连接出错');
          self.triggerHandler('error', e);
        };
        
        return this.source;
        
      } catch (error) {
        console.error('创建认证连接失败:', error);
        throw error;
      }
    }
    
    /**
     * 注册事件处理器
     * @param {string} event - 事件类型
     * @param {Function} handler - 处理函数
     */
    on(event, handler) {
      if (!this.handlers.has(event)) {
        this.handlers.set(event, []);
      }
      this.handlers.get(event).push(handler);
    }
    
    /**
     * 触发处理器
     * @param {string} event - 事件类型
     * @param {Object} data - 事件数据
     */
    triggerHandler(event, data) {
      const handlers = this.handlers.get(event) || [];
      handlers.forEach(function(handler) { handler(data); });
    }
    
    /**
     * 关闭连接
     */
    disconnect() {
      if (this.source) {
        console.log('关闭认证连接');
        this.source.close();
        this.isConnected = false;
      }
    }
    
    /**
     * 获取连接状态
     */
    getStatus() {
      return {
        url: this.url,
        withCredentials: this.source ? this.source.withCredentials : null,
        readyState: this.source ? this.source.readyState : null,
        isConnected: this.isConnected
      };
    }
  }
  
  // 创建认证连接处理器
  const handler = new AuthenticatedSSEHandler('https://httpbin.org/eventsource', {
    withCredentials: true,
    authToken: 'Bearer token123'
  });
  
  // 注册事件处理器
  handler.on('open', function(e) { console.log('连接成功事件'); });
  handler.on('message', function(e) { console.log('消息事件:', e.data); });
  handler.on('error', function(e) { console.log('错误事件'); });
  
  // 启动连接
  handler.connect();
  
  // 显示状态
  console.log('\n当前状态:');
  console.log(handler.getStatus());
  
  // 清理
  setTimeout(function() {
    handler.disconnect();
    console.log('\n最终状态:');
    console.log(handler.getStatus());
  }, 3000);
  
  return handler;
}

// 导出模块
module.exports = {
  demoBasicUsage,
  demoConditionalHandling,
  demoSecurityCheck,
  demoFactoryFunction,
  demoMultiConnectionManagement,
  demoDebugLogging,
  demoAuthenticatedConnection
};