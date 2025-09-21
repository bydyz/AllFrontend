const obj = {
  visible: 'visible',
  [Symbol('symbol')]: 'symbol value'
};

Object.defineProperty(obj, 'hidden', {
  value: 'hidden value',
  enumerable: false
});

// 只枚举可枚举的字符串键属性
// for...in循环不会输出symbol属性和不可枚举属性。
for (const key in obj) {
  console.log(key); // 只输出: 'visible'
}