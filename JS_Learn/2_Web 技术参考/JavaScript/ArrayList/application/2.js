// 批量处理 DOM 元素
const buttons = document.querySelectorAll('button');

// 错误：buttons.forEach 不存在（在旧浏览器中）
// buttons.forEach(btn => btn.disabled = true);

// 正确：先转换为数组
Array.from(buttons).forEach(btn => {
    btn.disabled = true;
    btn.classList.add('disabled');
});

// 或者使用 NodeList 的 forEach（现代浏览器支持）
if (buttons.forEach) {
    buttons.forEach(btn => btn.disabled = true);
}