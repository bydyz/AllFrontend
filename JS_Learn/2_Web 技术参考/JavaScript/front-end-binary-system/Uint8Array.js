console.log('Uint8Array...')
    console.log('')
    const buffer2 = new ArrayBuffer(16);
    // Uint8Array —— 将 ArrayBuffer 中的每个字节（8位）视为 0 到 255 之间的单个数字（每个字节是 8 位）。这称为 “8 位无符号整数”。
    // Uint16Array —— 将每 2 个字节（16位）视为一个 0 到 65535 之间的整数。这称为 “16 位无符号整数”。
    // Uint32Array —— 将每 4 个字节（32位）视为一个 0 到 4294967295 之间的整数。这称为 “32 位无符号整数”。
    // Float64Array —— 将每 8 个字节（64位）视为一个 5.0x10-324 到 1.8x10308 之间的浮点数。

    const uint8 = new Uint8Array(buffer2);
    console.log('uint8', uint8)
    console.log('')

    const uint16 = new Uint16Array(buffer2);
    console.log('uint16', uint8)
    console.log('')

    const uint32 = new Uint32Array(buffer2);
    console.log('uint32', uint8)
    console.log('')

    const float64 = new Float64Array(buffer2);
    console.log('uint64', uint8)
    console.log('')


    const uint8Change = new Uint8Array(buffer2);
    uint8Change[0] = 255;
    console.log('uint8Change', uint8Change)
    // 可以通过 obj.buffer 获取，比如上面的例子我们就可以使用uint8Change.buffer获取到原始ArrayBuffer。
    console.log(uint8Change.buffer)

    console.log('')
    console.log('')
    console.log('')
    console.log('')
    console.log('')
    console.log('')