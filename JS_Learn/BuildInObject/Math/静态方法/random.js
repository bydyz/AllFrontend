// Math.random()

// 作用：获取0~1之间的随机小数，包含0，但不包含1      （小数点位数由计算机精度确定）
// 返回值：返回所获取的数



function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

console.log(getRandomInt(3));
// Expected output: 0, 1 or 2

console.log(getRandomInt(1));
// Expected output: 0

console.log(Math.random());
// Expected output: a number from 0 to <1