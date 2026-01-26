const buffer = new ArrayBuffer(16);
const int32View = new Int32Array(buffer);
console.log(int32View);     // Int32Array [0, 0, 0, 0]
console.log(int32View.length); // 4

// 其他类型化数组
new Uint8Array([1, 2, 3]);   // Uint8Array
new Float64Array([1.1, 2.2]); // Float64Array