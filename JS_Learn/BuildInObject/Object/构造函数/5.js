// 确保总是返回对象
function safeObjectCreator(value) {
  // 使用 Object() 而不是 new Object()
  return Object(value);
}

console.log(safeObjectCreator(null)); // {}
console.log(safeObjectCreator(42));   // Number {42}
console.log(safeObjectCreator("test")); // String {"test"}