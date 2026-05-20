// 获取 min - max （前后均包含） 之间的随机整数
function randomNum(min, max) {
  // 求 0 ~ 两数差 的随机整数
  let res = Math.floor(Math.random() * (max - min + 1));

  // 使用随机整数 + 相对小的数字
  let res2 = res + min;

  // 把计算结果当做返回值
  return res2;
}

// 需要获取 10 ~ 20 的随机整数
let res = randomNum(10, 20);

console.log(res);
