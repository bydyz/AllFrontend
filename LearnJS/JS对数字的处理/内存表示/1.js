// 64位双精度浮点数的内存结构
const ieee754Format = {
  '符号位 (1位)': '决定正负 (0=正数, 1=负数)',
  '指数位 (11位)': '存储指数部分，使用偏移码表示',
  '尾数位 (52位)': '存储有效数字部分',
  '总计': '1 + 11 + 52 = 64位'
};

// 实际的内存表示
function demonstrateIEEE754Structure() {
  console.log('=== IEEE 754 双精度格式 ===');
  
  // 数字 3.14 的IEEE 754表示
  const number = 3.14;
  const buffer = new ArrayBuffer(8);
  const view = new Float64Array(buffer);
  view[0] = number;
  
  // 获取底层字节表示
  const byteView = new Uint8Array(buffer);
  const binaryString = Array.from(byteView)
    .map(byte => byte.toString(2).padStart(8, '0'))
    .reverse() // 小端序
    .join('');
  
  console.log(`数字: ${number}`);
  console.log(`64位二进制: ${binaryString}`);
  console.log(`符号位: ${binaryString[0]} (${binaryString[0] === '0' ? '正数' : '负数'})`);
  console.log(`指数位: ${binaryString.substring(1, 12)}`);
  console.log(`尾数位: ${binaryString.substring(12)}`);
}

demonstrateIEEE754Structure();