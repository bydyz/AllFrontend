function demonstrateCreation() {
  console.log('=== Int8Array 创建方式 ===');
  
  // 1. 指定长度创建    长度为5的数组，每个是1字节
  const array1 = new Int8Array(5);
  console.log('1. 指定长度(5):', array1);
  
  // 2. 从数组创建
  const array2 = new Int8Array([10, 20, -30, 40, 50]);
  console.log('2. 从数组创建:', array2);
  
  // 3. 从其他类型化数组创建
  const int16Array = new Int16Array([100, 200, 300]);
  const array3 = new Int8Array(int16Array);
  console.log('3. 从Int16Array创建:', array3); // 值会被截断
  
  // 4. 从ArrayBuffer创建
  const buffer = new ArrayBuffer(8); // 8字节缓冲区 
  const array4 = new Int8Array(buffer);
  const array5 = new Int8Array(buffer, 2, 4); // 偏移2字节，长度4
  console.log('4. 从ArrayBuffer创建:', array4);
  console.log('5. 带偏移和长度:', array5);
  
  return { array1, array2, array3, array4, array5 };
}

const createdArrays = demonstrateCreation();