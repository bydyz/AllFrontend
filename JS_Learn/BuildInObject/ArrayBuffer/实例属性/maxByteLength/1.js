const bufferA = new ArrayBuffer(8, { maxByteLength: 16 });

console.log(bufferA.byteLength);
// Expected output: 8

console.log(bufferA.maxByteLength);
// Expected output: 16

const bufferB = new ArrayBuffer(8);

console.log(bufferB.byteLength);
// Expected output: 8

console.log(bufferB.maxByteLength);
// Expected output: 8

console.log("");
