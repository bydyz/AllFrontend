const buffer = new ArrayBuffer(8, { maxByteLength: 16 });

console.log(buffer.byteLength);
// Expected output: 8

console.log(buffer.maxByteLength);
// Expected output: 16




const buffer1 = new ArrayBuffer(8);

console.log(buffer1.byteLength);
// Expected output: 8

console.log(buffer1.maxByteLength);
// Expected output: 8