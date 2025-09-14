// 创建一个 8 字节的缓冲区，它可以调整到的最大长度为 16 字节，然后使用 resize() 调整到 12 字节

const buffer = new ArrayBuffer(8, { maxByteLength: 16 });

buffer.resize(12);


// 推荐将 maxByteLength 设置为使用场景下最小的大小。它不应超过 1073741824（1GB），以减少内存溢出风险。