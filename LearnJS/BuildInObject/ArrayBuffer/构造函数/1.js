// new ArrayBuffer(length)
// new ArrayBuffer(length, options)

// ArrayBuffer() 只能使用 new 构造。尝试在没有 new 的情况下调用会抛出 TypeError。


// 参数
//   length
//     要创建的数组缓冲区的大小（以字节为单位）。

//   options 可选
//     一个对象，可以包含以下属性：
//       maxByteLength 可选
//         数组缓冲区可以调整到的最大大小，以字节为单位。

// 返回值
//   一个指定大小的新 ArrayBuffer 对象，其 maxByteLength 属性设置为指定的 maxByteLength（如果指定了该值），其内容被初始化为 0。

// 异常
//   RangeError
//     有下列情况之一时抛出：
//       length 或 maxByteLength 大于 Number.MAX_SAFE_INTEGER（≥ 2的53次方）或者为负数。
//       length 大于 maxByteLength。