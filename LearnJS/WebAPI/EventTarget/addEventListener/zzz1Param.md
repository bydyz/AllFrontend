```javascript
addEventListener(type, listener);
addEventListener(type, listener, options);
addEventListener(type, listener, useCapture);





// 参数1: type - 事件类型

// 常见的事件类型
const button = document.getElementById('myButton');

// 鼠标事件
button.addEventListener('click', handler);
button.addEventListener('dblclick', handler);      // 双击
button.addEventListener('mousedown', handler);     // 鼠标按下
button.addEventListener('mouseup', handler);       // 鼠标释放
button.addEventListener('mousemove', handler);     // 鼠标移动
button.addEventListener('mouseenter', handler);    // 鼠标进入
button.addEventListener('mouseleave', handler);    // 鼠标离开

// 键盘事件
document.addEventListener('keydown', handler);     // 按键按下
document.addEventListener('keyup', handler);       // 按键释放
document.addEventListener('keypress', handler);    // 按键按压

// 表单事件
const input = document.getElementById('myInput');
input.addEventListener('focus', handler);          // 获得焦点
input.addEventListener('blur', handler);           // 失去焦点
input.addEventListener('input', handler);          // 输入值变化
input.addEventListener('change', handler);         // 值改变并失去焦点
input.addEventListener('submit', handler);         // 表单提交

// 触摸事件（移动端）
button.addEventListener('touchstart', handler);    // 触摸开始
button.addEventListener('touchmove', handler);     // 触摸移动
button.addEventListener('touchend', handler);      // 触摸结束

// 其他事件
window.addEventListener('load', handler);          // 页面加载完成
window.addEventListener('resize', handler);        // 窗口大小改变
window.addEventListener('scroll', handler);        // 页面滚动


```