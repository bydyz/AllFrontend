import { createButton, getCurrentFilename } from "../../AAACommonJS/index.js";

// 内部创建的函数 - 演示 XMLHttpRequest 构造函数
function executeXHRDemo() {
  const xhr = new XMLHttpRequest();

  // 监听 readyState 变化
  xhr.onreadystatechange = function () {
    console.log(`[onreadystatechange] readyState = ${xhr.readyState}`);

    switch (xhr.readyState) {
      case 0:
        console.log("0 - UNSENT: 对象创建，未 open()");
        break;
      case 1:
        console.log("1 - OPENED: 已调用 open()");
        break;
      case 2:
        console.log("2 - HEADERS_RECEIVED: 已收到响应头");
        console.log("Status:", xhr.status);
        console.log("Headers (示例):", xhr.getResponseHeader("Content-Type"));
        break;
      case 3:
        console.log("3 - LOADING: 正在接收响应体...");
        console.log("Partial response:", xhr.responseText.substring(0, 50) + "...");
        break;
      case 4:
        console.log("4 - DONE: 请求完成！");
        if (xhr.status >= 200 && xhr.status < 300) {
          console.log("✅ 成功！完整响应:", xhr.responseText);
        } else {
          console.log("❌ 失败！状态码:", xhr.status);
        }
        break;
    }
  };

  // 此时 readyState = 0 (UNSENT)
  console.log("创建后:", xhr.readyState); // 0

  xhr.open("GET", "http://110.41.184.250:8081/api/supplier/detail/5");
  // 调用 open() 后 → readyState = 1
  console.log("open() 后:", xhr.readyState); // 1

  xhr.setRequestHeader("Content-Type", "application/json");
  // 关键设置：允许携带cookie
  xhr.withCredentials = true;

  xhr.send();
  // send() 后会异步触发 2 → 3 → 4
}

createButton(getCurrentFilename(import.meta.url), executeXHRDemo);
