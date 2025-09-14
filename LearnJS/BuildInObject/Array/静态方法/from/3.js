// 序列生成器函数（通常称为“range”，例如 Clojure、PHP 等）
const range = (start, stop, step) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

// 生成的数字范围 0..4
console.log(range(0, 4, 1));
// [0, 1, 2, 3, 4]

// 生成的数字范围 1..10，步长为 2
console.log(range(1, 10, 2));
// [1, 3, 5, 7, 9]

// 使用 Array.from 生成字母表，并将其序列排序
console.log(range("A".charCodeAt(0), "Z".charCodeAt(0), 1).map((x) =>
  String.fromCharCode(x),
));
// ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]