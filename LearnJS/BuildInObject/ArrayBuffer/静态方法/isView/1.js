// ArrayBuffer.isView() 静态方法判断传入值是否是 ArrayBuffer 视图之一，例如 TypedArray 或 DataView。


// ArrayBuffer.isView(value)

// 参数
//   value
//     要检查的值。

// 返回值
//   如果给定参数是 ArrayBuffer 视图之一则返回 true；否则返回 false。



const buffer = new ArrayBuffer(16);
console.log(ArrayBuffer.isView(new Int32Array()));
// Expected output: true