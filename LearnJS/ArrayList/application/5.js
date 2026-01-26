// 某些 NodeList 是动态的（live）
const liveList = document.getElementsByClassName('item');
console.log(liveList.length); // 假设是 3

// 添加新元素
document.body.innerHTML += '<div class="item"></div>';

console.log(liveList.length); // 现在是 4（自动更新）

// 而 querySelectorAll 返回的是静态的
const staticList = document.querySelectorAll('.item');
console.log(staticList.length); // 3

document.body.innerHTML += '<div class="item"></div>';
console.log(staticList.length); // 仍然是 3