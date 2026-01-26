// 检查对象是否为迭代器的函数
function isIterator(obj) {
  // 检查对象是否存在且具有next方法
  return obj != null && typeof obj.next === 'function';
}

// 检查对象是否为可迭代对象的函数
function isIterable(obj) {
  return obj != null && typeof obj[Symbol.iterator] === 'function';
}