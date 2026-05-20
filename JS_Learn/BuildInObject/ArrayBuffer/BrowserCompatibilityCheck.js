// 浏览器兼容性检查
function checkCompatibility() {
  let optionsSupport = false;
  let resizeSupport = false;
  let transferSupport = false;

  try {
    // 测试options参数支持
    const buffer = new ArrayBuffer(16, { maxByteLength: 32 });
    optionsSupport = true;

    // 测试resize方法支持
    if (typeof buffer.resize === "function") {
      resizeSupport = true;
    }

    // 测试transfer方法支持
    if (typeof ArrayBuffer.prototype.transfer === "function") {
      transferSupport = true;
    }
  } catch (e) {
    // 如果出现错误，说明不支持
  }

  console.log(optionsSupport ? "options参数: 支持" : "options参数: 不支持");
  console.log(resizeSupport ? "resize()方法: 支持" : "resize()方法: 不支持");
  console.log(transferSupport ? "transfer()方法: 支持" : "transfer()方法: 不支持");
}

checkCompatibility();
