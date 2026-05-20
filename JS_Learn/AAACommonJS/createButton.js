// 创建并添加按钮到页面
export default function createButton(param, clickFunction) {
  // 创建按钮元素
  const button = document.createElement("button");
  button.textContent = param;
  button.style.cssText = `
    padding: 12px 24px;
    font-size: 16px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    margin: 20px;
    transition: background-color 0.3s;
  `;

  // 添加悬停效果
  button.addEventListener("mouseenter", () => {
    button.style.backgroundColor = "#45a049";
  });

  button.addEventListener("mouseleave", () => {
    button.style.backgroundColor = "#4CAF50";
  });

  // 添加点击事件 - 执行内部创建的函数
  button.addEventListener("click", () => {
    clickFunction();
  });

  // 将按钮添加到页面
  document.body.appendChild(button);
}
