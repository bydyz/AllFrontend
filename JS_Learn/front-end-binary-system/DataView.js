// really do not know

console.log('DataView')
console.log('')
const buffer3 = new ArrayBuffer(16);
// 可以转成各种格式
const dataView1 = new DataView(buffer3);
// 接受三个参数，1.字节序号，2.写入的数据，3.写入方式（true：小端  false|undefined:大端）
dataView1.setFloat64(0, 25, false); // 在第一个字节以大端字节序写入一个值为25的32位整数
console.log(dataView1);
console.log('')

console.log(dataView1.getUint8(0)); // 64
console.log('')

console.log(dataView1.getUint16(0)); // 16441
console.log('')

console.log(dataView1.getUint32(0)); // 1077477376
console.log('')

console.log(dataView1.getFloat64(0)); // 25
console.log('')

// 可以通过 obj.buffer 获取，比如上面的例子我们就可以使用dataView1.buffer获取到原始ArrayBuffer。
console.log(dataView1.buffer3)