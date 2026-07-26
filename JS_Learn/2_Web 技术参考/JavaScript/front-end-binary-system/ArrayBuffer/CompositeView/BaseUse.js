// 复合视图
// 由于视图的构造函数可以指定起始位置和长度，所以在同一段内存之中，可以依次存放不同类型的数据，这叫做“复合视图”。

// const buffer = new ArrayBuffer(24);
// const idView = new Uint32Array(buffer, 0, 1);
// const usernameView = new Uint8Array(buffer, 4, 16);
// const amountDueView = new Float32Array(buffer, 20, 1);

// 上面代码将一个 24 字节长度的ArrayBuffer对象，分成三个部分：

//     字节 0 到字节 3：1 个 32 位无符号整数
//     字节 4 到字节 19：16 个 8 位整数
//     字节 20 到字节 23：1 个 32 位浮点数