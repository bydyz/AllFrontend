# 核心概念

ArrayBuffer 本身只是一个原始的二进制数据缓冲区，不能直接操作。要通过"视图"对象（如 TypedArray 或 DataView）来读写缓冲区内容。

它是一个字节数组，通常在其他语言中称为“byte array”。

# 主要用途

1. 处理文件I/O操作
2. 操作图像数据
3. WebSocket 通信中的二进制数据传输
4. WebGL 中的顶点数据
5. 与 WebAssembly 交互

# 关键点说明

1. ArrayBuffer 是原始二进制数据的容器，不能直接操作
2. TypedArray 视图（如 Int32Array, Uint8Array）提供了特定类型的数据访问方式
3. DataView 提供了更灵活的读写方式，可以处理不同的数据类型和字节序
4. 同一个 ArrayBuffer 可以被多个视图同时操作，它们共享底层数据
5. ArrayBuffer 在处理文件、网络通信和大型数据集中非常高效

# 可调整大小的ArrayBuffer在以下场景中非常有用：

1. 动态数据缓冲区
2. 流式数据处理
3. 需要灵活内存管理的应用
4. 大型数据集的渐进式加载

性能提示： 调整ArrayBuffer大小可能导致分配新的内存块并复制数据，因此应谨慎使用。

# JavaScript提供了多种类型的ArrayBuffer视图：

Int8Array - 8位有符号整数
Uint8Array - 8位无符号整数
Uint8ClampedArray - 8位无符号整数（饱和操作）
Int16Array - 16位有符号整数
Uint16Array - 16位无符号整数
Int32Array - 32位有符号整数
Uint32Array - 32位无符号整数
Float32Array - 32位浮点数
Float64Array - 64位浮点数
BigInt64Array - 64位有符号BigInt
BigUint64Array - 64位无符号BigInt
DataView - 灵活的数据视图
