/**
 * @file bodyUsed.js
 * @description Response.bodyUsed 属性 - 检测响应体是否已被读取
 * 
 * bodyUsed 属性返回一个布尔值，表示响应体（body）是否已被读取
 * 一旦读取了 body，该属性将变为 true，且不能再读取
 * 
 * @author 前端学习者
 * @since 2024
 */

/**
 * BodyUsed 属性说明
 * =============
 * 
 * Response.bodyUsed 是 Response 对象的只读实例属性
 * 返回一个布尔值，指示响应体是否已被读取
 * 
 * 工作原理：
 * - 初始时 bodyUsed 为 false（响应刚创建时）
 * - 当调用任何 body 读取方法（text(), json(), blob(), arrayBuffer(), formData()）后
 * - bodyUsed 变为 true
 * - 一旦 bodyUsed 为 true，就不能再调用 body 读取方法
 * 
 * 为什么需要这个属性：
 * - Response body 只能被读取一次（单次消费）
 * - bodyUsed 用于检查 body 是否已被读取
 * - 防止重复读取导致报错
 * 
 * 读取方法（会使 bodyUsed 变为 true）：
 * - response.text() - 读取为文本
 * - response.json() - 读取并解析为 JSON
 * - response.blob() - 读取为 Blob 对象
 * - response.arrayBuffer() - 读取为 ArrayBuffer
 * - response.formData() - 读取为 FormData 对象
 * - response.clone() - 克隆响应（但不会改变原始响应的 bodyUsed）
 * 
 * 使用场景：
 * - 检查响应是否已处理过
 * - 避免重复读取响应体
 * - 调试和日志记录
 * - 判断是否可以安全地读取 body
 */

/**
 * 示例 1：基础使用 - 检查 body 是否已被读取
 * 
 * 在读取 body 前后检查 bodyUsed 的值
 */
async function checkBasicBodyUsed() {
    console.log("=== 示例 1：基础使用 ===");
    
    const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
    
    // 读取 body 之前
    console.log("读取 body 之前:");
    console.log("  bodyUsed:", response.bodyUsed);  // false
    
    // 读取 body
    const data = await response.json();
    console.log("\n读取 body 之后:");
    console.log("  bodyUsed:", response.bodyUsed);  // true
    console.log("  数据:", data.title);
}

/**
 * 示例 2：防止重复读取 body
 * 
 * 使用 bodyUsed 防止对已读取的 body 再次读取
 */
async function preventDoubleReading() {
    console.log("\n=== 示例 2：防止重复读取 ===");
    
    const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
    
    // 第一次读取
    if (!response.bodyUsed) {
        const data = await response.json();
        console.log("第一次读取成功:", data.title);
    }
    
    // 第二次尝试读取
    try {
        if (!response.bodyUsed) {
            const data = await response.json();
            console.log("第二次读取成功:", data);
        } else {
            console.log("body 已被读取，不能再次读取");
        }
    } catch (error) {
        console.error("读取失败:", error.message);
    }
}

/**
 * 示例 3：使用 bodyUsed 进行条件处理
 * 
 * 根据 bodyUsed 的值决定如何处理响应
 */
async function conditionalProcessing() {
    console.log("\n=== 示例 3：条件处理 ===");
    
    async function processResponse(response) {
        // 检查 body 是否已被读取
        if (response.bodyUsed) {
            console.log("响应体已被读取，需要重新请求");
            return null;
        }
        
        // 根据 Content-Type 选择处理方式
        const contentType = response.headers.get("content-type");
        
        if (contentType && contentType.includes("application/json")) {
            const data = await response.json();
            return { type: "json", data };
        } else if (contentType && contentType.includes("text/")) {
            const text = await response.text();
            return { type: "text", data: text };
        } else {
            return { type: "unknown" };
        }
    }
    
    // 测试
    const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
    const result = await processResponse(response);
    console.log("处理结果:", result);
}

/**
 * 示例 4：bodyUsed 与 clone 方法的关系
 * 
 * clone 方法可以创建一个新的响应副本，而不影响原始响应的 bodyUsed
 */
async function bodyUsedWithClone() {
    console.log("\n=== 示例 4：clone 与 bodyUsed ===");
    
    const originalResponse = await fetch("https://jsonplaceholder.typicode.com/posts/1");
    
    console.log("初始状态:");
    console.log("  原始响应 bodyUsed:", originalResponse.bodyUsed);
    
    // 克隆响应
    const clonedResponse = originalResponse.clone();
    
    console.log("\n克隆后:");
    console.log("  原始响应 bodyUsed:", originalResponse.bodyUsed);
    console.log("  克隆响应 bodyUsed:", clonedResponse.bodyUsed);
    
    // 读取克隆响应的 body
    const clonedData = await clonedResponse.json();
    console.log("\n读取克隆响应后:");
    console.log("  克隆响应 bodyUsed:", clonedResponse.bodyUsed);
    console.log("  原始响应 bodyUsed:", originalResponse.bodyUsed);  // 仍然是 false
    
    // 现在可以安全地读取原始响应
    const originalData = await originalResponse.json();
    console.log("\n读取原始响应后:");
    console.log("  原始响应 bodyUsed:", originalResponse.bodyUsed);  // 现在是 true
}

/**
 * 示例 5：调试和日志记录中使用 bodyUsed
 * 
 * 在处理响应时记录 body 的状态
 */
async function loggingWithBodyUsed() {
    console.log("\n=== 示例 5：日志记录 ===");
    
    // 创建一个响应处理包装器
    async function wrapResponse(response) {
        const info = {
            url: response.url,
            status: response.status,
            ok: response.ok,
            bodyUsed: response.bodyUsed,
            headers: {}
        };
        
        // 获取部分 header 信息
        const importantHeaders = ["content-type", "content-length", "cache-control"];
        for (const header of importantHeaders) {
            if (response.headers.has(header)) {
                info.headers[header] = response.headers.get(header);
            }
        }
        
        return { response, info };
    }
    
    // 使用包装器
    const { response, info } = await wrapResponse(
        await fetch("https://jsonplaceholder.typicode.com/posts/1")
    );
    
    console.log("响应信息:");
    console.log(JSON.stringify(info, null, 2));
    
    // 读取 body 后再检查
    await response.text();
    console.log("\n读取 body 后 bodyUsed:", response.bodyUsed);
}

/**
 * 示例 6：实际应用 - API 请求封装
 * 
 * 在封装 API 请求时使用 bodyUsed 确保 body 只被读取一次
 */
async function apiRequestWrapper() {
    console.log("\n=== 示例 6：API 请求封装 ===");
    
    // 封装 fetch 函数
    async function fetchWithRetry(url, options = {}, retries = 3) {
        let lastError;
        
        for (let i = 0; i < retries; i++) {
            try {
                const response = await fetch(url, options);
                
                // 检查响应是否可用
                if (response.bodyUsed) {
                    throw new Error("响应体已被使用，无法重试");
                }
                
                // 检查 HTTP 状态
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }
                
                return response;
            } catch (error) {
                console.log(`尝试 ${i + 1}/${retries} 失败:`, error.message);
                lastError = error;
            }
        }
        
        throw lastError;
    }
    
    // 测试
    try {
        const response = await fetchWithRetry("https://jsonplaceholder.typicode.com/posts/1");
        const data = await response.json();
        console.log("请求成功:", data.title);
    } catch (error) {
        console.error("最终失败:", error.message);
    }
}

/**
 * 示例 7：检查多个响应的 bodyUsed 状态
 * 
 * 批量处理请求并检查每个响应的状态
 */
async function checkMultipleResponses() {
    console.log("\n=== 示例 7：批量检查响应状态 ===");
    
    // 并发请求多个资源
    const urls = [
        "https://jsonplaceholder.typicode.com/posts/1",
        "https://jsonplaceholder.typicode.com/users/1",
        "https://jsonplaceholder.typicode.com/comments/1"
    ];
    
    // 使用 Promise.all 并发请求
    const responses = await Promise.all(urls.map(url => fetch(url)));
    
    console.log("所有响应状态:");
    for (let i = 0; i < responses.length; i++) {
        console.log(`  URL ${i + 1}:`);
        console.log("    bodyUsed:", responses[i].bodyUsed);
        console.log("    status:", responses[i].status);
    }
    
    // 读取所有响应
    const results = await Promise.all(
        responses.map(r => r.bodyUsed ? Promise.resolve(null) : r.json())
    );
    
    console.log("\n读取后状态:");
    for (let i = 0; i < responses.length; i++) {
        console.log(`  URL ${i + 1}: bodyUsed = ${responses[i].bodyUsed}`);
    }
}

/**
 * 示例 8：注意事项和陷阱
 * 
 * 了解 bodyUsed 的常见问题和注意事项
 */
async function understandCaveats() {
    console.log("\n=== 示例 8：注意事项 ===");
    
    console.log("1. 读取方法会使 bodyUsed 变为 true:");
    console.log("   - text(), json(), blob(), arrayBuffer(), formData()");
    console.log("   - 任何一种方法都会标记 body 为已使用\n");
    
    console.log("2. clone() 不会改变原始响应的 bodyUsed:");
    console.log("   - 克隆的响应是独立的");
    console.log("   - 可以从克隆响应读取 body\n");
    
    console.log("3. 读取错误后 bodyUsed 可能为 true:");
    console.log("   - 即使读取失败，body 也被认为已使用\n");
    
    console.log("4. 不透明响应的 bodyUsed:");
    console.log("   - no-cors 模式下 body 不可读");
    console.log("   - bodyUsed 可能不准确\n");
    
    // 演示
    console.log("演示:");
    
    // 正常读取
    const response1 = await fetch("https://jsonplaceholder.typicode.com/posts/1");
    console.log("正常响应 - bodyUsed:", response1.bodyUsed);
    await response1.text();
    console.log("读取后 - bodyUsed:", response1.bodyUsed);
    
    // 使用 stream
    console.log("\n注意: 使用 ReadableStream 也会改变 bodyUsed");
}

// 运行示例
if (require.main === module) {
    console.log("运行 Response.bodyUsed 属性示例\n");
    console.log("=".repeat(50));
    
    checkBasicBodyUsed()
        .then(() => preventDoubleReading())
        .then(() => conditionalProcessing())
        .then(() => bodyUsedWithClone())
        .then(() => loggingWithBodyUsed())
        .then(() => apiRequestWrapper())
        .then(() => checkMultipleResponses())
        .then(() => understandCaveats())
        .then(() => console.log("\n" + "=".repeat(50)))
        .catch(console.error);
}