// 构造函数 const blob = new Blob(array, options)
  // array 是一个由ArrayBuffer, ArrayBufferView, Blob, DOMString 等对象构成的数组，DOMStrings会被编码为UTF-8。
  // options 是一个可选，它可能会指定如下两个属性：
    // type，默认值为 ""，内容的MIME类型。
    // endings，默认值为"transparent"，用于指定包含行结束符\n的字符串如何被写入。 它是以下两个值中的一个： "native"，代表行结束符会被更改为适合宿主操作系统文件系统的换行符，或者 "transparent"，代表会保持blob中保存的结束符不变

  const blob1 = new Blob(["hello randy", "oh, my god"], { type: "text/plain" });
  console.log(blob1);

  let arrayBuffer = new Uint8Array([0x48, 0x65, 0x6c, 0x6c, 0x6f]); // "Hello" in ASCII
  let blob2 = new Blob([arrayBuffer], { type: "application/octet-stream" });

  let combinedBlob = new Blob([blob1, blob2], { type: "text/plain" });