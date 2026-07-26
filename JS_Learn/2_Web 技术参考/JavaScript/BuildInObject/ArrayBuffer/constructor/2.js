// 创建一个 8 字节的缓冲区，并使用一个 Int32Array 视图来引用该缓冲区

const buffer = new ArrayBuffer(8);
const view = new Int32Array(buffer);