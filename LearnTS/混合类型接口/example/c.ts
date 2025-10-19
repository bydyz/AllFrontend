interface Middleware {
  // 调用签名：处理请求
  (request: any, next: (request: any) => any): any;
  
  // 中间件信息
  name: string;
  priority: number;
  enabled: boolean;
}

// 创建中间件
const loggerMiddleware: Middleware = Object.assign(
  function(request: any, next: (request: any) => any): any {
    console.log(`[${loggerMiddleware.name}] Request:`, request);
    const response = next(request);
    console.log(`[${loggerMiddleware.name}] Response:`, response);
    return response;
  },
  {
    name: "Logger",
    priority: 1,
    enabled: true
  }
);

const authMiddleware: Middleware = Object.assign(
  function(request: any, next: (request: any) => any): any {
    if (!request.token) {
      throw new Error("Authentication required");
    }
    return next(request);
  },
  {
    name: "Auth",
    priority: 2, 
    enabled: true
  }
);

// 中间件管道
function createMiddlewarePipeline(middlewares: Middleware[]) {
  const sorted = [...middlewares].sort((a, b) => a.priority - b.priority);
  
  return function execute(request: any, finalHandler: (request: any) => any): any {
    function dispatch(index: number): any {
      if (index >= sorted.length) {
        return finalHandler(request);
      }
      
      const middleware = sorted[index];
      if (!middleware.enabled) {
        return dispatch(index + 1);
      }
      
      return middleware(request, (req) => dispatch(index + 1));
    }
    
    return dispatch(0);
  };
}

// 使用
const pipeline = createMiddlewarePipeline([loggerMiddleware, authMiddleware]);
const result = pipeline({ token: "abc123", action: "getUser" }, (req) => {
  return { success: true, data: req };
});