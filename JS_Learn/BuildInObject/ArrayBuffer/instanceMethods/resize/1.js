// resize(newLength)

// newLength
//   ArrayBuffer 要调整到的新的长度，以字节为单位。

// 返回值
//   无（undefined）。

// 异常
//   TypeError
//     如果 ArrayBuffer 已分离或不可调整大小，则抛出该错误。

// RangeError
//   如果 newLength 大于该 ArrayBuffer 的 maxByteLength，则抛出该错误。

// 描述
//   resize() 方法将 ArrayBuffer 调整为 newLength 参数指定的大小，前提是该 ArrayBuffer 是可调整大小的
//   并且新的大小小于或等于该 ArrayBuffer 的 maxByteLength。新字节被初始化为 0。

//   请注意，你可以使用 resize() 来缩小和增大 ArrayBuffer——即使 newLength 小于 ArrayBuffer 的当前 byteLength。

const bufferResize = new ArrayBuffer(8, { maxByteLength: 16 });

console.log(bufferResize.byteLength);
// Expected output: 8

console.log("resize的返回值：", bufferResize.resize(12));

console.log(bufferResize.byteLength);
// Expected output: 12
console.log("");
