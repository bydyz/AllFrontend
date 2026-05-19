/**
 * @file 05_formData.js
 * @description Response.formData() 方法 - 获取 FormData 对象
 * @author LearnJS
 * @date 2026-05-17
 */

/**
 * @section 方法说明
 * 
 * formData() 方法用于读取响应体并将其解析为 FormData 对象。
 * FormData 对象用于构建键/值对集合，表示表单字段及其值。
 * 它使用 multipart/form-data 编码格式。
 * 
 * 适用于处理服务器返回的表单数据。
 * 
 * @section 语法
 * formData()
 * 
 * @section 参数
 * 无
 * 
 * @section 返回值
 * 返回一个 Promise，该 Promise 解析为 FormData 对象
 * 
 * @section 使用场景
 * 1. 处理表单提交后的响应
 * 2. 解析 multipart/form-data 格式的数据
 * 3. 处理文件上传后的服务器响应
 * 4. 读取包含表单字段的数据
 * 
 * @section 注意事项
 * - 响应的 Content-Type 必须是 multipart/form-data
 * - 调用 formData() 后，bodyUsed 会变为 true
 * - 如果响应体不是有效的 FormData，会抛出错误
 * - FormData 可以包含文件和文本字段
 * - 服务器返回的数据需要正确编码为 multipart/form-data
 */

'use strict';

console.log('=== Response.formData() 方法示例 ===\n');

// ============================================================
// 注意：由于 Node.js 不直接支持 FormData，
// 以下示例主要展示概念和用法，实际使用需要浏览器环境
// ============================================================

// 模拟浏览器中的 FormData 行为
class MockFormData {
    constructor() {
        this.fields = new Map();
    }
    
    append(name, value, filename) {
        if (!this.fields.has(name)) {
            this.fields.set(name, []);
        }
        this.fields.get(name).push({ value, filename });
    }
    
    get(name) {
        const items = this.fields.get(name);
        return items ? items[0].value : null;
    }
    
    getAll(name) {
        const items = this.fields.get(name);
        return items ? items.map(item => item.value) : [];
    }
    
    has(name) {
        return this.fields.has(name);
    }
    
    entries() {
        const result = [];
        for (const [name, items] of this.fields) {
            for (const item of items) {
                result.push([name, item.value]);
            }
        }
        return result[Symbol.iterator]();
    }
    
    keys() {
        return Array.from(this.fields.keys())[Symbol.iterator]();
    }
    
    values() {
        const result = [];
        for (const [, items] of this.fields) {
            for (const item of items) {
                result.push(item.value);
            }
        }
        return result[Symbol.iterator]();
    }
}

// ============================================================
// 示例 1：模拟基本 FormData 解析
// ============================================================
async function example1BasicFormData() {
    console.log('--- 示例 1：基本 FormData 解析（模拟）---');
    
    // 模拟 multipart/form-data 响应
    // 实际浏览器中，这需要真实的 multipart 数据
    const mockFormDataResponse = () => {
        // 创建模拟响应
        const formData = new MockFormData();
        formData.append('username', 'zhangsan');
        formData.append('email', 'zhangsan@example.com');
        return formData;
    };
    
    // 模拟 formData() 方法
    const response = {
        async formData() {
            return mockFormDataResponse();
        }
    };
    
    const formData = await response.formData();
    
    console.log('获取 username:', formData.get('username'));
    console.log('获取 email:', formData.get('email'));
    console.log('has("username"):', formData.has('username'));
    console.log('');
}

// ============================================================
// 示例 2：处理包含文件的 FormData
// ============================================================
async function example2FormDataWithFiles() {
    console.log('--- 示例 2：处理包含文件的 FormData（模拟）---');
    
    // 模拟包含文件上传的响应
    const mockFileFormData = () => {
        const formData = new MockFormData();
        formData.append('title', '我的文档');
        formData.append('file', '[File Object: document.pdf]', 'document.pdf');
        formData.append('description', '上传的 PDF 文档');
        return formData;
    };
    
    const response = {
        async formData() {
            return mockFileFormData();
        }
    };
    
    const formData = await response.formData();
    
    console.log('标题:', formData.get('title'));
    console.log('文件:', formData.get('file'));
    console.log('描述:', formData.get('description'));
    console.log('');
}

// ============================================================
// 示例 3：遍历 FormData 所有字段
// ============================================================
async function example3IterateFormData() {
    console.log('--- 示例 3：遍历 FormData 所有字段（模拟）---');
    
    const mockIterateFormData = () => {
        const formData = new MockFormData();
        formData.append('name', '张三');
        formData.append('age', '25');
        formData.append('city', '北京');
        formData.append('hobby', '篮球');
        formData.append('hobby', '音乐');
        return formData;
    };
    
    const response = {
        async formData() {
            return mockIterateFormData();
        }
    };
    
    const formData = await response.formData();
    
    console.log('使用 entries() 遍历:');
    for (const [key, value] of formData.entries()) {
        console.log(`  ${key}: ${value}`);
    }
    
    console.log('\n使用 getAll() 获取多个值:');
    console.log('  hobby:', formData.getAll('hobby'));
    console.log('');
}

// ============================================================
// 示例 4：fetch 实际使用场景
// ============================================================
async function example4FetchUsage() {
    console.log('--- 示例 4：fetch 中使用 formData()（模拟）---');
    console.log('（模拟文件上传后服务器返回的表单数据）\n');
    
    // 模拟 fetch 返回的响应
    const mockFetchFormData = async () => {
        // 模拟服务器返回的 FormData 数据
        const formData = new MockFormData();
        formData.append('uploaded', 'true');
        formData.append('fileId', '12345');
        formData.append('fileName', 'example.png');
        formData.append('fileSize', '102400');
        formData.append('message', '文件上传成功');
        
        // 模拟 Response 对象
        return {
            ok: true,
            status: 200,
            async formData() {
                return formData;
            }
        };
    };
    
    const response = await mockFetchFormData();
    
    if (response.ok) {
        const formData = await response.formData();
        
        console.log('文件上传响应:');
        console.log('  上传状态:', formData.get('uploaded'));
        console.log('  文件 ID:', formData.get('fileId'));
        console.log('  文件名:', formData.get('fileName'));
        console.log('  文件大小:', formData.get('fileSize'), '字节');
        console.log('  消息:', formData.get('message'));
    }
    console.log('');
}

// ============================================================
// 示例 5：处理表单提交响应
// ============================================================
async function example5FormSubmitResponse() {
    console.log('--- 示例 5：处理表单提交响应（模拟）---');
    
    // 模拟表单提交后的服务器响应
    const mockFormSubmit = async () => {
        const formData = new MockFormData();
        formData.append('success', 'true');
        formData.append('token', 'abc123xyz');
        formData.append('redirectUrl', '/dashboard');
        
        return {
            status: 200,
            async formData() {
                return formData;
            }
        };
    };
    
    const response = await mockFormSubmit();
    const formData = await response.formData();
    
    console.log('表单提交结果:');
    console.log('  成功:', formData.get('success'));
    console.log('  Token:', formData.get('token'));
    console.log('  跳转地址:', formData.get('redirectUrl'));
    console.log('');
}

// ============================================================
// 示例 6：浏览器环境说明
// ============================================================
function example6BrowserEnvironment() {
    console.log('--- 示例 6：浏览器环境说明 ---');
    console.log('在真实的浏览器环境中，formData() 的用法示例:');
    console.log('');
    console.log('```javascript');
    console.log('// 假设服务器返回 multipart/form-data 响应');
    console.log('fetch(\'https://api.example.com/submit-form\')');
    console.log('  .then(response => response.formData())');
    console.log('  .then(formData => {');
    console.log('    // 获取字段值');
    console.log('    const name = formData.get(\'name\');');
    console.log('    const file = formData.get(\'file\');');
    console.log('    ');
    console.log('    // 遍历所有字段');
    console.log('    for (const [key, value] of formData.entries()) {');
    console.log('      console.log(key, value);');
    console.log('    }');
    console.log('  });');
    console.log('```');
    console.log('');
    console.log('注意事项:');
    console.log('1. 服务器响应的 Content-Type 必须是 multipart/form-data');
    console.log('2. FormData 中的文件是 File 对象');
    console.log('3. 可以使用 formData.getAll() 获取多个同名字段的值');
    console.log('');
}

// ============================================================
// 运行所有示例
// ============================================================
async function runAllExamples() {
    console.log('开始运行 formData() 方法的所有示例...\n');
    
    await example1BasicFormData();
    await example2FormDataWithFiles();
    await example3IterateFormData();
    await example4FetchUsage();
    await example5FormSubmitResponse();
    example6BrowserEnvironment();
    
    console.log('=== 所有示例运行完成 ===');
}

if (typeof window !== 'undefined' || typeof global !== 'undefined') {
    runAllExamples().catch(console.error);
}

module.exports = { runAllExamples };
