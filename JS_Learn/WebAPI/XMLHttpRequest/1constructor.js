import { createButton, getCurrentFilename } from "../../AAACommonJS/index.js";

// 内部创建的函数 - 演示 XMLHttpRequest 构造函数
function executeXHRDemo() {
  // 1. 创建 XMLHttpRequest 对象
  const xhr = new XMLHttpRequest();
  console.log("打印 XMLHttpRequest对象", xhr);

  // 2. 创建信息显示区域
  const infoDiv = document.createElement("div");
  infoDiv.id = "xhr-info";
  infoDiv.style.cssText = `
    margin: 20px;
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 8px;
    border: 2px solid #dee2e6;
    font-family: 'Courier New', monospace;
  `;

  // 3. 显示 XHR 对象信息
  infoDiv.innerHTML = `
    <h3 style="color: #333; margin-top: 0;">XMLHttpRequest 对象已创建</h3>
    <div style="margin-bottom: 10px;">
      <strong>对象信息：</strong>
      <ul style="margin: 10px 0; padding-left: 20px;">
        <li>构造函数: ${xhr.constructor.name}</li>
        <li>原型链: ${Object.getPrototypeOf(xhr).constructor.name}</li>
        <li>readyState: ${xhr.readyState}</li>
        <li>status: ${xhr.status}</li>
      </ul>
    </div>
    <div style="margin-bottom: 10px;">
      <strong>可用方法：</strong>
      <ul style="margin: 10px 0; padding-left: 20px;">
        <li>open() - ${typeof xhr.open}</li>
        <li>send() - ${typeof xhr.send}</li>
        <li>setRequestHeader() - ${typeof xhr.setRequestHeader}</li>
        <li>abort() - ${typeof xhr.abort}</li>
      </ul>
    </div>
    <div style="margin-bottom: 10px;">
      <strong>事件监听器：</strong>
      <ul style="margin: 10px 0; padding-left: 20px;">
        <li>onreadystatechange - ${typeof xhr.onreadystatechange}</li>
        <li>onload - ${typeof xhr.onload}</li>
        <li>onerror - ${typeof xhr.onerror}</li>
      </ul>
    </div>
  `;

  // 4. 移除之前的信息（如果存在）
  const existingInfo = document.getElementById("xhr-info");
  if (existingInfo) {
    existingInfo.remove();
  }

  // 5. 将信息添加到页面
  document.body.appendChild(infoDiv);

  // 6. 创建第二个按钮 - 演示实际请求
  const requestButton = document.createElement("button");
  requestButton.textContent = "执行 GET 请求";
  requestButton.style.cssText = `
    padding: 10px 20px;
    font-size: 14px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    margin: 10px 20px;
    transition: background-color 0.3s;
  `;

  requestButton.addEventListener("mouseenter", () => {
    requestButton.style.backgroundColor = "#0056b3";
  });

  requestButton.addEventListener("mouseleave", () => {
    requestButton.style.backgroundColor = "#007bff";
  });

  // 移除之前的请求按钮（如果存在）
  const existingRequestButton = document.querySelector("#request-button");
  if (existingRequestButton) {
    existingRequestButton.remove();
  }

  requestButton.id = "request-button";
  requestButton.addEventListener("click", () => {
    executeRequest(xhr, infoDiv);
  });

  // 将请求按钮添加到信息区域后
  infoDiv.appendChild(requestButton);
}

// 执行实际的 HTTP 请求
function executeRequest(xhr, infoDiv) {
  // 创建状态显示区域
  const statusDiv = document.createElement("div");
  statusDiv.id = "request-status";
  statusDiv.style.cssText = `
    margin-top: 15px;
    padding: 15px;
    background-color: #e9ecef;
    border-radius: 6px;
    border-left: 4px solid #ffc107;
  `;

  // 移除之前的状态（如果存在）
  const existingStatus = document.getElementById("request-status");
  if (existingStatus) {
    existingStatus.remove();
  }

  infoDiv.appendChild(statusDiv);

  // 更新状态显示
  statusDiv.innerHTML = `
    <div style="display: flex; align-items: center; margin-bottom: 10px;">
      <div style="width: 12px; height: 12px; border-radius: 50%; background-color: #ffc107; margin-right: 10px;"></div>
      <strong>请求状态：准备中...</strong>
    </div>
  `;

  // 配置请求
  xhr.open("GET", "https://jsonplaceholder.typicode.com/posts/1", true);

  // 设置请求头
  xhr.setRequestHeader("Content-Type", "application/json");

  // 监听状态变化
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 1) {
      statusDiv.innerHTML = `
        <div style="display: flex; align-items: center; margin-bottom: 10px;">
          <div style="width: 12px; height: 12px; border-radius: 50%; background-color: #17a2b8; margin-right: 10px;"></div>
          <strong>请求状态：已连接 (readyState: ${xhr.readyState})</strong>
        </div>
        <div style="font-size: 12px; color: #6c757d;">请求已打开，准备发送</div>
      `;
    } else if (xhr.readyState === 2) {
      statusDiv.innerHTML = `
        <div style="display: flex; align-items: center; margin-bottom: 10px;">
          <div style="width: 12px; height: 12px; border-radius: 50%; background-color: #17a2b8; margin-right: 10px;"></div>
          <strong>请求状态：已发送 (readyState: ${xhr.readyState})</strong>
        </div>
        <div style="font-size: 12px; color: #6c757d;">请求已发送，等待响应头</div>
      `;
    } else if (xhr.readyState === 3) {
      statusDiv.innerHTML = `
        <div style="display: flex; align-items: center; margin-bottom: 10px;">
          <div style="width: 12px; height: 12px; border-radius: 50%; background-color: #17a2b8; margin-right: 10px;"></div>
          <strong>请求状态：接收中 (readyState: ${xhr.readyState})</strong>
        </div>
        <div style="font-size: 12px; color: #6c757d;">正在接收响应数据</div>
      `;
    } else if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        statusDiv.innerHTML = `
          <div style="display: flex; align-items: center; margin-bottom: 10px;">
            <div style="width: 12px; height: 12px; border-radius: 50%; background-color: #28a745; margin-right: 10px;"></div>
            <strong>请求状态：已完成 (readyState: ${xhr.readyState}, Status: ${xhr.status})</strong>
          </div>
          <div style="margin-top: 10px;">
            <strong>响应数据：</strong>
            <pre style="background-color: white; padding: 10px; border-radius: 4px; font-size: 12px; overflow: auto;">${JSON.stringify(JSON.parse(xhr.responseText), null, 2)}</pre>
          </div>
        `;
      } else {
        statusDiv.innerHTML = `
          <div style="display: flex; align-items: center; margin-bottom: 10px;">
            <div style="width: 12px; height: 12px; border-radius: 50%; background-color: #dc3545; margin-right: 10px;"></div>
            <strong>请求状态：错误 (readyState: ${xhr.readyState}, Status: ${xhr.status})</strong>
          </div>
          <div style="font-size: 12px; color: #dc3545;">请求失败，状态码: ${xhr.status}</div>
        `;
      }
    }
  };

  // 监听加载完成
  xhr.onload = function () {
    console.log("请求完成，状态码:", xhr.status);
  };

  // 监听错误
  xhr.onerror = function () {
    statusDiv.innerHTML = `
      <div style="display: flex; align-items: center; margin-bottom: 10px;">
        <div style="width: 12px; height: 12px; border-radius: 50%; background-color: #dc3545; margin-right: 10px;"></div>
        <strong>请求状态：网络错误</strong>
      </div>
      <div style="font-size: 12px; color: #dc3545;">网络请求失败，请检查网络连接</div>
    `;
  };

  // 发送请求
  xhr.send();
}

createButton(getCurrentFilename(import.meta.url), executeXHRDemo);
