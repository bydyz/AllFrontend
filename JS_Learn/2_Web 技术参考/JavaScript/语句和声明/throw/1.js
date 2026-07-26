// throw 语句用于抛出用户自定义的异常。当前函数的执行将停止（throw 之后的语句不会被执行），并且控制权将传递给调用堆栈中第一个 catch 块。如果调用函数中没有 catch 块，则程序将终止。

function getRectArea(width, height) {
  if (isNaN(width) || isNaN(height)) {
    throw new Error("Parameter is not a number!");
  }
}

try {
  getRectArea(3, "A");
} catch (e) {
  console.error(e);
  // Expected output: Error: Parameter is not a number!
}
