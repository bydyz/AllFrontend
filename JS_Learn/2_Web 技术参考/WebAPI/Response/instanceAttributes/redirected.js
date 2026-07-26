/**
 * @file redirected.js
 * @description Response.redirected 属性 - 检测响应是否发生了重定向
 * 
 * redirected 属性返回一个布尔值，表示响应是否来自重定向
 * 如果请求经历了任何 HTTP 重定向，则返回 true，否则返回 false
 * 
 * @author 前端学习者
 * @since 2024
 */

/**
 * Redirected 属性说明
 * =============
 * 
 * Response.redirected 是 Response 对象的只读实例属性
 * 返回一个布尔值，指示响应是否因 HTTP 重定向而产生
 * 
 * 工作原理：
 * - 当浏览器或 fetch 自动跟随重定向时，redirected 为 true
 * - 如果请求没有发生重定向，redirected 为 false
 * - 无论是同源还是跨域重定向，都会被检测到
 * 
 * 重定向类型（会触发 redirected = true）：
 * - 301 Moved Permanently - 永久重定向
 * - 302 Found - 临时重定向
 * - 303 See Other - 查看其他位置（POST重定向为GET）
 * - 307 Temporary Redirect - 临时重定向（保持请求方法）
 * - 308 Permanent Redirect - 永久重定向（保持请求方法）
 * 
 * 非重定向情况（redirected = false）：
 * - 直接返回 200 OK 的响应
 * - 返回 304 Not Modified 的缓存响应
 * - 使用 redirect: 'manual' 手动处理重定向
 * 
 * 与 url 属性的关系：
 * - url 返回最终请求的实际 URL（重定向后的 URL）
 * - redirected 只是标记是否发生了重定向
 * 
 * 使用场景：
 * - 检测资源是否已迁移（301/308）
 * - 记录请求的重定向日志
 * - 在重定向场景下获取原始 URL
 * - 判断是否需要更新资源链接
 */

/**
 * 示例 1：基础使用 - 检测响应是否重定向
 * 
 * 使用 fetch 发送请求后，检查 redirected 属性
 */
async function checkBasicRedirected() {
    console.log("=== 示例 1：基础使用 ===");
    
    try {
        // 发起一个可能重定向的请求
        const response = await fetch("https://httpbin.org/redirect-to?url=https://jsonplaceholder.typicode.com/posts/1");
        
        // redirected 属性返回布尔值
        console.log("是否重定向:", response.redirected);
        console.log("最终 URL:", response.url);
        
        if (response.redirected) {
            console.log("请求发生了重定向");
        } else {
            console.log("请求直接到达目标 URL");
        }
    } catch (error) {
        console.error("网络错误:", error);
    }
}

/**
 * 示例 2：对比重定向和非重定向请求
 * 
 * 观察有无重定向时 redirected 属性的不同值
 */
async function compareRedirected() {
    console.log("\n=== 示例 2：对比重定向与非重定向 ===");
    
    // 测试非重定向请求
    console.log("\n非重定向请求:");
    const normalResponse = await fetch("https://jsonplaceholder.typicode.com/posts/1");
    console.log("  URL:", normalResponse.url);
    console.log("  redirected:", normalResponse.redirected);
    
    // 测试重定向请求
    console.log("\n重定向请求:");
    const redirectResponse = await fetch("https://httpbin.org/redirect-to?url=https://jsonplaceholder.typicode.com/posts/1");
    console.log("  URL:", redirectResponse.url);
    console.log("  redirected:", redirectResponse.redirected);
}

/**
 * 示例 3：手动处理重定向模式下的 redirected
 * 
 * 使用 redirect: 'manual' 阻止自动跟随重定向
 */
async function handleManualRedirect() {
    console.log("\n=== 示例 3：手动重定向模式 ===");
    
    // 使用 manual 模式，不自动跟随重定向
    const response = await fetch("https://httpbin.org/redirect-to?url=https://jsonplaceholder.typicode.com/posts/1", {
        redirect: "manual"
    });
    
    console.log("重定向模式: manual");
    console.log("状态码:", response.status);
    console.log("是否重定向:", response.redirected);
    
    // 检查是否有 Location 头
    if (response.status === 301 || response.status === 302) {
        const location = response.headers.get("Location");
        console.log("重定向到:", location);
    }
}

/**
 * 示例 4：检测多次重定向
 * 
 * 当请求经历多次重定向时，redirected 仍为 true
 */
async function handleMultipleRedirects() {
    console.log("\n=== 示例 4：多次重定向 ===");
    
    // 发起多级重定向请求
    const response = await fetch("https://httpbin.org/redirect/3");
    
    console.log("重定向次数: 3");
    console.log("是否重定向:", response.redirected);
    console.log("最终 URL:", response.url);
    console.log("\n说明: 即使经历多次重定向，redirected 仍为 true");
}

/**
 * 示例 5：使用 redirected 属性实现重定向检测工具
 * 
 * 创建实用工具函数来检测和记录重定向信息
 */
async function createRedirectDetector() {
    console.log("\n=== 示例 5：重定向检测工具 ===");
    
    // 创建重定向检测函数
    async function detectRedirect(originalUrl, fetchOptions = {}) {
        console.log(`\n检测 URL: ${originalUrl}`);
        
        // 保存原始 URL
        const originalRequestUrl = originalUrl;
        
        try {
            const response = await fetch(originalUrl, {
                ...fetchOptions,
                // 跟踪重定向需要允许自动跟随
                redirect: fetchOptions.redirect || "follow"
            });
            
            const result = {
                originalUrl: originalRequestUrl,
                finalUrl: response.url,
                redirected: response.redirected,
                status: response.status,
                statusText: response.statusText,
                // 判断是否是重定向状态码
                isRedirectStatus: response.status >= 300 && response.status < 400
            };
            
            console.log("  原始 URL:", result.originalUrl);
            console.log("  最终 URL:", result.finalUrl);
            console.log("  是否重定向:", result.redirected);
            console.log("  状态码:", result.status);
            
            return result;
        } catch (error) {
            console.error("  请求失败:", error.message);
            return null;
        }
    }
    
    // 测试不同的 URL
    await detectRedirect("https://jsonplaceholder.typicode.com/posts/1");
    await detectRedirect("https://httpbin.org/redirect-to?url=https://jsonplaceholder.typicode.com/posts/1");
}

/**
 * 示例 6：结合 redirected 和 url 实现 URL 追溯
 * 
 * 当发生重定向时，追溯原始 URL 和最终 URL
 */
async function traceRedirectUrl() {
    console.log("\n=== 示例 6：URL 追溯功能 ===");
    
    // 创建带有 URL 追溯的请求函数
    async function fetchWithRedirectTrace(url) {
        // 注意：浏览器中无法直接获取原始请求 URL
        // 但可以通过 redirect: 'manual' 手动处理
        
        const response = await fetch(url);
        
        return {
            // 注意：无法获取原始 URL，这是浏览器的限制
            finalUrl: response.url,
            redirected: response.redirected,
            status: response.status
        };
    }
    
    // 测试
    console.log("测试重定向追踪:");
    const result1 = await fetchWithRedirectTrace("https://jsonplaceholder.typicode.com/posts/1");
    console.log("  URL:", result1.finalUrl);
    console.log("  重定向:", result1.redirected);
    
    const result2 = await fetchWithRedirectTrace("https://httpbin.org/redirect-to?url=https://jsonplaceholder.typicode.com/posts/1");
    console.log("  URL:", result2.finalUrl);
    console.log("  重定向:", result2.redirected);
}

/**
 * 示例 7：重定向与 SEO 和缓存的关系
 * 
 * 了解重定向对资源管理的影响
 */
async function understandRedirectSeoCache() {
    console.log("\n=== 示例 7：重定向与 SEO/缓存 ===");
    
    console.log("重定向对不同场景的影响:\n");
    
    console.log("1. SEO (搜索引擎优化):");
    console.log("   - 301 永久重定向: 告诉搜索引擎页面永久移动");
    console.log("   - 302 临时重定向: 搜索引擎可能不会传递权重");
    console.log("   - 检测到重定向可帮助识别迁移的资源\n");
    
    console.log("2. 缓存:");
    console.log("   - 304 Not Modified 不算重定向");
    console.log("   - 重定向响应通常不会被缓存\n");
    
    console.log("3. 性能:");
    console.log("   - 每次重定向都会增加延迟");
    console.log("   - 过多重定向会影响加载时间\n");
    
    console.log("4. 安全性:");
    console.log("   - 重定向可能被用于钓鱼攻击");
    console.log("   - 检测重定向有助于安全审计");
    
    // 实际测试
    console.log("\n实际测试:");
    const testUrls = [
        { url: "https://jsonplaceholder.typicode.com/posts/1", desc: "直接请求" },
        { url: "https://httpbin.org/redirect-to?url=https://jsonplaceholder.typicode.com/posts/1", desc: "单次重定向" },
        { url: "https://httpbin.org/redirect/2", desc: "多次重定向" }
    ];
    
    for (const test of testUrls) {
        const response = await fetch(test.url);
        console.log(`  ${test.desc}: redirected = ${response.redirected}`);
    }
}

/**
 * 示例 8：注意事项和使用陷阱
 * 
 * 了解 redirected 属性的限制和注意事项
 */
async function understandCaveats() {
    console.log("\n=== 示例 8：注意事项 ===");
    
    console.log("1. 无法获取原始请求 URL:");
    console.log("   - Response.url 只返回最终 URL");
    console.log("   - 无法直接知道原始请求的 URL\n");
    
    console.log("2. 重定向模式的影响:");
    console.log("   - redirect: 'follow' (默认): 自动跟随，redirected 有效");
    console.log("   - redirect: 'manual': 不跟随，redirected 始终为 false");
    console.log("   - redirect: 'error': 遇到重定向报错\n");
    
    console.log("3. 不透明响应:");
    console.log("   - no-cors 模式下 redirected 可能不准确\n");
    
    console.log("4. 与 status 的关系:");
    console.log("   - 重定向响应状态码在 300-399 范围");
    console.log("   - 但 redirected 只标记是否发生了重定向");
    
    // 测试不同模式
    console.log("\n测试不同重定向模式:");
    
    const followMode = await fetch("https://httpbin.org/redirect-to?url=https://jsonplaceholder.typicode.com/posts/1", {
        redirect: "follow"
    });
    console.log("  follow 模式 - redirected:", followMode.redirected);
    
    const manualMode = await fetch("https://httpbin.org/redirect-to?url=https://jsonplaceholder.typicode.com/posts/1", {
        redirect: "manual"
    });
    console.log("  manual 模式 - redirected:", manualMode.redirected);
    console.log("  manual 模式 - status:", manualMode.status);
}

// 运行示例
if (require.main === module) {
    console.log("运行 Response.redirected 属性示例\n");
    console.log("=".repeat(50));
    
    checkBasicRedirected()
        .then(() => compareRedirected())
        .then(() => handleManualRedirect())
        .then(() => handleMultipleRedirects())
        .then(() => createRedirectDetector())
        .then(() => traceRedirectUrl())
        .then(() => understandRedirectSeoCache())
        .then(() => understandCaveats())
        .then(() => console.log("\n" + "=".repeat(50)))
        .catch(console.error);
}