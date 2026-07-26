/**
 * @file 02_json.js
 * @description Response.json() 方法 - 解析 JSON 响应体
 * @author LearnJS
 * @date 2026-05-17
 */

/**
 * @section 方法说明
 * 
 * json() 方法用于读取响应体并将其解析为 JSON 格式。
 * 返回一个 Promise，解析成功后得到解析后的 JavaScript 对象。
 * 
 * 这是处理 REST API 响应最常用的方法之一。
 * 
 * @section 语法
 * json()
 * 
 * @section 参数
 * 无
 * 
 * @section 返回值
 * 返回一个 Promise，该 Promise 解析为解析 JSON 后的 JavaScript 对象
 * 
 * @section 使用场景
 * 1. 处理 REST API 返回的 JSON 数据
 * 2. 解析配置文件
 * 3. 处理 Ajax 请求的 JSON 响应
 * 4. 读取服务端返回的结构化数据
 * 
 * @section 注意事项
 * - 如果响应体不是有效的 JSON，解析会失败并抛出 SyntaxError
 * - 调用 json() 后，bodyUsed 会变为 true，不能再次读取
 * - 空响应体会解析为 undefined
 * - 大型 JSON 数据可能会导致内存问题
 * - 确保响应的 Content-Type 是 application/json
 */

'use strict';

console.log('=== Response.json() 方法示例 ===\n');

// ============================================================
// 示例 1：基本 JSON 解析
// ============================================================
async function example1BasicJson() {
    console.log('--- 示例 1：基本 JSON 解析 ---');
    
    // 创建一个 JSON 响应
    const jsonData = JSON.stringify({
        name: '张三',
        age: 25,
        city: '北京',
        skills: ['JavaScript', 'Vue', 'React']
    });
    
    const response = new Response(jsonData, {
        headers: { 'Content-Type': 'application/json' }
    });
    
    // 使用 json() 解析
    const data = await response.json();
    
    console.log('解析结果:', data);
    console.log('姓名:', data.name);
    console.log('技能:', data.skills.join(', '));
    console.log('');
}

// ============================================================
// 示例 2：处理嵌套 JSON
// ============================================================
async function example2NestedJson() {
    console.log('--- 示例 2：处理嵌套 JSON ---');
    
    // 复杂的嵌套 JSON
    const jsonData = JSON.stringify({
        status: 'success',
        code: 200,
        data: {
            user: {
                id: 1001,
                profile: {
                    avatar: 'https://example.com/avatar.jpg',
                    bio: '前端开发者'
                }
            },
            posts: [
                { id: 1, title: '第一篇文章' },
                { id: 2, title: '第二篇文章' }
            ]
        },
        timestamp: '2026-05-17T10:00:00Z'
    });
    
    const response = new Response(jsonData, {
        headers: { 'Content-Type': 'application/json' }
    });
    
    const result = await response.json();
    
    console.log('状态:', result.status);
    console.log('用户 ID:', result.data.user.id);
    console.log('头像:', result.data.user.profile.avatar);
    console.log('文章数量:', result.data.posts.length);
    console.log('第一篇文章:', result.data.posts[0].title);
    console.log('');
}

// ============================================================
// 示例 3：处理 JSON 数组
// ============================================================
async function example3JsonArray() {
    console.log('--- 示例 3：处理 JSON 数组 ---');
    
    const jsonData = JSON.stringify([
        { id: 1, name: '产品A', price: 100 },
        { id: 2, name: '产品B', price: 200 },
        { id: 3, name: '产品C', price: 300 }
    ]);
    
    const response = new Response(jsonData, {
        headers: { 'Content-Type': 'application/json' }
    });
    
    const products = await response.json();
    
    console.log('产品列表:');
    products.forEach(product => {
        console.log(`  - ${product.name}: ¥${product.price}`);
    });
    console.log('');
}

// ============================================================
// 示例 4：处理 API 错误响应
// ============================================================
async function example4ApiError() {
    console.log('--- 示例 4：处理 API 错误响应 ---');
    
    // 模拟 API 错误响应
    const errorJson = JSON.stringify({
        error: true,
        message: '请求的资源不存在',
        code: 404
    });
    
    const response = new Response(errorJson, {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
    });
    
    console.log('响应状态:', response.status);
    console.log('响应状态文本:', response.statusText);
    
    try {
        const errorData = await response.json();
        console.log('错误信息:', errorData.message);
    } catch (e) {
        console.log('JSON 解析失败');
    }
    console.log('');
}

// ============================================================
// 示例 5：处理无效 JSON（错误处理）
// ============================================================
async function example5InvalidJson() {
    console.log('--- 示例 5：处理无效 JSON ---');
    
    // 这不是有效的 JSON
    const invalidJson = '这是普通文本，不是 JSON';
    
    const response = new Response(invalidJson, {
        headers: { 'Content-Type': 'text/plain' }
    });
    
    try {
        const data = await response.json();
        console.log('解析成功:', data);
    } catch (error) {
        console.log('JSON 解析错误:', error.message);
        console.log('（预期行为：非 JSON 格式无法解析）');
    }
    console.log('');
}

// ============================================================
// 示例 6：fetch 中的实际使用
// ============================================================
async function example6FetchUsage() {
    console.log('--- 示例 6：fetch 中的实际使用 ---');
    console.log('（模拟 fetch API 调用）\n');
    
    // 模拟 fetch 函数
    const mockFetch = async (url) => {
        // 模拟 API 响应
        const data = JSON.stringify({
            users: [
                { id: 1, name: 'Alice', email: 'alice@example.com' },
                { id: 2, name: 'Bob', email: 'bob@example.com' }
            ],
            total: 2,
            page: 1
        });
        
        return new Response(data, {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    };
    
    // 使用 fetch 并调用 json()
    const response = await mockFetch('https://api.example.com/users');
    
    if (response.ok) {
        const result = await response.json();
        console.log('获取到的用户数据:');
        result.users.forEach(user => {
            console.log(`  ${user.id}. ${user.name} <${user.email}>`);
        });
    }
    console.log('');
}

// ============================================================
// 示例 7：空响应处理
// ============================================================
async function example7EmptyResponse() {
    console.log('--- 示例 7：空响应处理 ---');
    
    // 空响应
    const response = new Response('', {
        headers: { 'Content-Type': 'application/json' }
    });
    
    const data = await response.json();
    console.log('空响应解析结果:', data);
    console.log('（空字符串解析为 undefined）');
    console.log('');
}

// ============================================================
// 运行所有示例
// ============================================================
async function runAllExamples() {
    console.log('开始运行 json() 方法的所有示例...\n');
    
    await example1BasicJson();
    await example2NestedJson();
    await example3JsonArray();
    await example4ApiError();
    await example5InvalidJson();
    await example6FetchUsage();
    await example7EmptyResponse();
    
    console.log('=== 所有示例运行完成 ===');
}

if (typeof window !== 'undefined' || typeof global !== 'undefined') {
    runAllExamples().catch(console.error);
}

module.exports = { runAllExamples };
