import { createButton, getCurrentFilename } from "../../AAACommonJS/index.js";

function executeXHRDemo() {
  const xhr = new XMLHttpRequest();

  xhr.open("post", "http://110.41.184.250:8081/api/index/login");

  xhr.setRequestHeader("Content-Type", "application/json");

  // 关键设置：允许携带cookie
  xhr.withCredentials = true;

  // 将对象转换为JSON字符串
  const data = JSON.stringify({
    account: "admin",
    password: "admin123",
  });

  xhr.send(data);
}

createButton(getCurrentFilename(import.meta.url), executeXHRDemo);
