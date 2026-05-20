const typedArray1 = new Int8Array(8);
console.log(typedArray1)
console.log('')
console.log('')
console.log('')
console.log('')
console.log('')
console.log('')


const typedArray2 = new Int8Array(10);
console.log(typedArray2)
console.log('')
console.log('')
console.log('')
console.log('')
console.log('')
console.log('')


const typedArray3 = new Int8Array(8);
typedArray3[0] = 32
console.log(typedArray3)
console.log('')
const typedArray4 = new Int8Array(typedArray3);
console.log(typedArray4)
console.log('')
console.log(typedArray3 === typedArray4)   //false
console.log('')
typedArray4[1] = 42
const typedArray5 = new Int8Array(typedArray4);
console.log(typedArray5)
console.log('')

