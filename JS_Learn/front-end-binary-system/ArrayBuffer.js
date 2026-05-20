// ArrayBuffer对象代表储存二进制数据的一段内存，它不能直接读写，只能通过视图进行操作。

    // 创建一个长度为 16 的 buffer 它会分配一个 16 字节（byte）的连续内存空间，并用 0 进行预填充。
    export function ArrayBufferBaseUseF() {
      const buffer1 = new ArrayBuffer(16);
      console.log(buffer1)
      console.log('')
      console.log("ArrayBuffer 的字节长度", buffer1.byteLength)
    }





// ArrayBuffer 是 JavaScript 中的一种数据类型，它代表一个通用的、固定大小的二进制数据缓冲区。ArrayBuffer 是用于在 JavaScript 中存储原始二进制数据的容器，可以存储整数、浮点数、字节数组等，而不需要进行编码或解码。

// 1.创建 ArrayBuffer：

//   使用 new ArrayBuffer(length) 构造函数来创建一个指定长度的 ArrayBuffer。length 参数表示缓冲区的字节数。例如，要创建一个具有 16 字节的 ArrayBuffer：const buffer = new ArrayBuffer(16);



// 2.获取 ArrayBuffer 的字节长度：

//   您可以使用 byteLength 属性来获取 ArrayBuffer 的字节长度。
//   const length = buffer.byteLength;


// 如果要分配的内存区域很大，有可能分配失败（因为没有那么多的连续空余内存），所以有必要检查是否分配成功。
// if (buffer.byteLength === n) {
//   // 成功
// } else {
//   // 失败
// }



// 3.ArrayBuffer.prototype.slice()

// ArrayBuffer实例有一个slice方法，允许将内存区域的一部分，拷贝生成一个新的ArrayBuffer对象。

// const buffer = new ArrayBuffer(8);
// const newBuffer = buffer.slice(0, 3);

// 上面代码拷贝buffer对象的前 3 个字节（从 0 开始，到第 3 个字节前面结束），生成一个新的ArrayBuffer对象。slice方法其实包含两步，第一步是先分配一段新内存，第二步是将原来那个ArrayBuffer对象拷贝过去。

// slice方法接受两个参数，第一个参数表示拷贝开始的字节序号（含该字节），第二个参数表示拷贝截止的字节序号（不含该字节）。如果省略第二个参数，则默认到原ArrayBuffer对象的结尾。

// 除了slice方法，ArrayBuffer对象不提供任何直接读写内存的方法，只允许在其上方建立视图，然后通过视图读写。



// 4.ArrayBuffer.isView()
// ArrayBuffer有一个静态方法isView，返回一个布尔值，表示参数是否为ArrayBuffer的视图实例。这个方法大致相当于判断参数，是否为TypedArray实例或DataView实例。

// const buffer = new ArrayBuffer(8);
// ArrayBuffer.isView(buffer) // false
// const v = new Int32Array(buffer);
// ArrayBuffer.isView(v) // true








// 3.ArrayBuffer 视图：

//   ArrayBuffer 本身只是一个固定大小的内存缓冲区，要在其上执行操作，通常需要使用 TypedArray 视图或 DataView 视图。

// ArrayBuffer有两种视图，一种是TypedArray视图，另一种是DataView视图。前者的数组成员都是同一个数据类型，后者的数组成员可以是不同的数据类型。
// 目前，TypedArray视图一共包括 9 种类型，每一种视图都是一种构造函数。

// Int8Array：8 位有符号整数，长度 1 个字节。
// Uint8Array：8 位无符号整数，长度 1 个字节。
// Uint8ClampedArray：8 位无符号整数，长度 1 个字节，溢出处理不同。
// Int16Array：16 位有符号整数，长度 2 个字节。
// Uint16Array：16 位无符号整数，长度 2 个字节。
// Int32Array：32 位有符号整数，长度 4 个字节。
// Uint32Array：32 位无符号整数，长度 4 个字节。
// Float32Array：32 位浮点数，长度 4 个字节。
// Float64Array：64 位浮点数，长度 8 个字节。

// 这 9 个构造函数生成的数组，统称为TypedArray视图。它们很像普通数组，都有length属性，都能用方括号运算符（[]）获取单个元素，所有数组的方法，在它们上面都能使用。普通数组与 TypedArray 数组的差异主要在以下方面。

// TypedArray 数组的所有成员，都是同一种类型。
// TypedArray 数组的成员是连续的，不会有空位。
// TypedArray 数组成员的默认值为 0。比如，new Array(10)返回一个普通数组，里面没有任何成员，只是 10 个空位；new Uint8Array(10)返回一个 TypedArray 数组，里面 10 个成员都是 0。
// TypedArray 数组只是一层视图，本身不储存数据，它的数据都储存在底层的ArrayBuffer对象之中，要获取底层对象必须使用buffer属性。



// （1）TypedArray(buffer, byteOffset=0, length?)

// 同一个ArrayBuffer对象之上，可以根据不同的数据类型，建立多个视图。

export function TypedArrayUseF() {
  // 创建一个8字节的ArrayBuffer
  const b = new ArrayBuffer(8);
  console.log(b)

  // 创建一个指向b的Int32视图，开始于字节0，直到缓冲区的末尾
  const v1 = new Int32Array(b);
  console.log(v1)
  v1[1] = 6

  // 创建一个指向b的Uint8视图，开始于字节2，直到缓冲区的末尾
  const v2 = new Uint8Array(b, 2);
  console.log(v2)

  // 创建一个指向b的Int16视图，开始于字节2，视图长度为2
  const v3 = new Int16Array(b, 2, 2);
  console.log(v3)
  



  // const buffer = new ArrayBuffer(12);
  // const x1 = new Int32Array(buffer);
  // console.log(x1)
  // // x1[0] = 1;
  // console.log(x1)
  // const x2 = new Uint8Array(buffer);
  // console.log(x1, x2)
  // x2[0] = 2;
  // console.log(x1, x2)
  // x1[0] // 2





  // const buffer = new ArrayBuffer(8);
  // const i16 = new Int16Array(buffer, 1);
  // Uncaught RangeError: start offset of Int16Array should be a multiple of 2
}

// 上面代码在一段长度为 8 个字节的内存（b）之上，生成了三个视图：v1、v2和v3。

// 视图的构造函数可以接受三个参数：

// 第一个参数（必需）：视图对应的底层ArrayBuffer对象。
// 第二个参数（可选）：视图开始的字节序号，默认从 0 开始。
// 第三个参数（可选）：视图包含的数据个数，默认直到本段内存区域结束。

// 一个字节  对应  8位

// 因此，v1、v2和v3是重叠的：v1[0]是一个 32 位整数，指向字节 0 ～字节 3；v2[0]是一个 8 位无符号整数，指向字节 2；v3[0]是一个 16 位整数，指向字节 2 ～字节 3。只要任何一个视图对内存有所修改，就会在另外两个视图上反应出来。


// 上面代码中，新生成一个 8 个字节的ArrayBuffer对象，然后在这个对象的第一个字节，建立带符号的 16 位整数视图，结果报错。因为，带符号的 16 位整数需要两个字节，所以byteOffset参数必须能够被 2 整除。

// 如果想从任意字节开始解读ArrayBuffer对象，必须使用DataView视图，因为TypedArray视图只提供 9 种固定的解读格式。






// （2）TypedArray(length)

// 视图还可以不通过ArrayBuffer对象，直接分配内存而生成。

export function NewTypedArrayUseF() {
  const f64a = new Float64Array(8);
  console.log(f64a)

  f64a[0] = 10;
  f64a[1] = 20;
  f64a[2] = f64a[0] + f64a[1];
  console.log(f64a)
}

// 上面代码生成一个 8 个成员的Float64Array数组（共 64 字节），然后依次对每个成员赋值。这时，视图构造函数的参数就是成员的个数。可以看到，视图数组的赋值操作与普通数组的操作毫无两样。







// （3）TypedArray(typedArray)

// TypedArray 数组的构造函数，可以接受另一个TypedArray实例作为参数。

// const typedArray = new Int8Array(new Uint8Array(4));

// 上面代码中，Int8Array构造函数接受一个Uint8Array实例作为参数。

// 注意，此时生成的新数组，只是复制了参数数组的值，对应的底层内存是不一样的。新数组会开辟一段新的内存储存数据，不会在原数组的内存之上建立视图。

// export function NewTypedArrayTypedArrayF() {
//   const x = new Int8Array([1, 1]);
//   const y = new Int8Array(x);
//   x[0] // 1
//   y[0] // 1
//   x[0] = 2;
//   y[0] // 1
// }

// 上面代码中，数组y是以数组x为模板而生成的，当x变动的时候，y并没有变动。

// 如果想基于同一段内存，构造不同的视图，可以采用下面的写法。

export function NewTypedArrayTypedArrayUseF() {
  const x = new Int8Array([1, 1]);
  console.log(x)
  const y = new Int8Array(x.buffer);
  console.log(y)
  console.log(x[0]) // 1
  console.log(y[0]) // 1
  x[0] = 2;
  console.log(y[0]) // 2
}








// （4）TypedArray(arrayLikeObject)

// 构造函数的参数也可以是一个普通数组，然后直接生成TypedArray实例。

// const typedArray = new Uint8Array([1, 2, 3, 4]);

// 注意，这时TypedArray视图会重新开辟内存，不会在原数组的内存上建立视图。

// 上面代码从一个普通的数组，生成一个 8 位无符号整数的TypedArray实例。


// TypedArray 数组也可以转换回普通数组。

// const normalArray = [...typedArray];
// // or
// const normalArray = Array.from(typedArray);
// // or
// const normalArray = Array.prototype.slice.call(typedArray);









// 数组方法
// 普通数组的操作方法和属性，对 TypedArray 数组完全适用。

// TypedArray 数组没有concat方法。如果想要合并多个 TypedArray 数组，可以用下面这个函数。

// function concatenate(resultConstructor, ...arrays) {
//   let totalLength = 0;
//   for (let arr of arrays) {
//     totalLength += arr.length;
//   }
//   let result = new resultConstructor(totalLength);
//   let offset = 0;
//   for (let arr of arrays) {
//     result.set(arr, offset);
//     offset += arr.length;
//   }
//   return result;
// }
// concatenate(Uint8Array, Uint8Array.of(1, 2), Uint8Array.of(3, 4))
// // Uint8Array [1, 2, 3, 4]


// 另外，TypedArray 数组与普通数组一样，部署了 Iterator 接口，所以可以被遍历。
// let ui8 = Uint8Array.of(0, 1, 2);
// for (let byte of ui8) {
//   console.log(byte);
// }
// // 0
// // 1
// // 2








// 字节序
// 字节序指的是数值在内存中的表示方式。

export function ByteOrderUseF() {
  const buffer = new ArrayBuffer(16);
  const int32View = new Int32Array(buffer);
  for (let i = 0; i < int32View.length; i++) {
    int32View[i] = i * 2;
  }



  const int16View = new Int16Array(buffer);
  for (let i = 0; i < int16View.length; i++) {
    console.log("Entry " + i + ": " + int16View[i]);
  }
  // Entry 0: 0
  // Entry 1: 0
  // Entry 2: 2
  // Entry 3: 0
  // Entry 4: 4
  // Entry 5: 0
  // Entry 6: 6
  // Entry 7: 0

}

// 上面代码生成一个 16 字节的ArrayBuffer对象，然后在它的基础上，建立了一个 32 位整数的视图。由于每个 32 位整数占据 4 个字节，所以一共可以写入 4 个整数，依次为 0，2，4，6。

// 如果在这段数据上接着建立一个 16 位整数的视图，则可以读出完全不一样的结果。


// 由于每个 16 位整数占据 2 个字节，所以整个ArrayBuffer对象现在分成 8 段。然后，由于 x86 体系的计算机都采用小端字节序（little endian），相对重要的字节排在后面的内存地址，相对不重要字节排在前面的内存地址，所以就得到了上面的结果。

// 比如，一个占据四个字节的 16 进制数0x12345678，决定其大小的最重要的字节是“12”，最不重要的是“78”。小端字节序将最不重要的字节排在前面，储存顺序就是78563412；大端字节序则完全相反，将最重要的字节排在前面，储存顺序就是12345678。目前，所有个人电脑几乎都是小端字节序，所以 TypedArray 数组内部也采用小端字节序读写数据，或者更准确的说，按照本机操作系统设定的字节序读写数据。

// 这并不意味大端字节序不重要，事实上，很多网络设备和特定的操作系统采用的是大端字节序。这就带来一个严重的问题：如果一段数据是大端字节序，TypedArray 数组将无法正确解析，因为它只能处理小端字节序！为了解决这个问题，JavaScript 引入DataView对象，可以设定字节序，下文会详细介绍。


export function ByteOrderUseTwoF() {
  // 假定某段buffer包含如下字节 [0x02, 0x01, 0x03, 0x07]
  const buffer = new ArrayBuffer(4);
  const v1 = new Uint8Array(buffer);
  v1[0] = 2;
  v1[1] = 1;
  v1[2] = 3;
  v1[3] = 7;
  const uInt16View = new Uint16Array(buffer);
  // 计算机采用小端字节序
  // 所以头两个字节等于258
  if (uInt16View[0] === 258) {
    console.log('OK'); // "OK"
  }
  // 赋值运算
  uInt16View[0] = 255;    // 字节变为[0xFF, 0x00, 0x03, 0x07]
  uInt16View[0] = 0xff05; // 字节变为[0x05, 0xFF, 0x03, 0x07]
  uInt16View[1] = 0x0210; // 字节变为[0x05, 0xFF, 0x10, 0x02]
}


// 下面的函数可以用来判断，当前视图是小端字节序，还是大端字节序。

export function JudgeBigOrSmallUseF() {
  const BIG_ENDIAN = Symbol('BIG_ENDIAN');
  const LITTLE_ENDIAN = Symbol('LITTLE_ENDIAN');
  function getPlatformEndianness() {
    let arr32 = Uint32Array.of(0x12345678);
    let arr8 = new Uint8Array(arr32.buffer);
    switch ((arr8[0]*0x1000000) + (arr8[1]*0x10000) + (arr8[2]*0x100) + (arr8[3])) {
      case 0x12345678:
        return BIG_ENDIAN;
      case 0x78563412:
        return LITTLE_ENDIAN;
      default:
        throw new Error('Unknown endianness');
    }
  }
}

// 总之，与普通数组相比，TypedArray 数组的最大优点就是可以直接操作内存，不需要数据类型转换，所以速度快得多。





// BYTES_PER_ELEMENT 属性

// 每一种视图的构造函数，都有一个BYTES_PER_ELEMENT属性，表示这种数据类型占据的字节数。

// Int8Array.BYTES_PER_ELEMENT              // 1
// Uint8Array.BYTES_PER_ELEMENT             // 1
// Uint8ClampedArray.BYTES_PER_ELEMENT      // 1
// Int16Array.BYTES_PER_ELEMENT             // 2  
// Uint16Array.BYTES_PER_ELEMENT            // 2
// Int32Array.BYTES_PER_ELEMENT             // 4
// Uint32Array.BYTES_PER_ELEMENT            // 4
// Float32Array.BYTES_PER_ELEMENT           // 4
// Float64Array.BYTES_PER_ELEMENT           // 8

// 这个属性在TypedArray实例上也能获取，即有TypedArray.prototype.BYTES_PER_ELEMENT。







// ArrayBuffer 与字符串的互相转换
// ArrayBuffer 和字符串的相互转换，使用原生 TextEncoder 和 TextDecoder 方法。为了便于说明用法，下面的代码都按照 TypeScript 的用法，给出了类型签名。

/**
 * Convert ArrayBuffer/TypedArray to String via TextDecoder
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/TextDecoder
 */

// function ab2str(
//   input: ArrayBuffer | Uint8Array | Int8Array | Uint16Array | Int16Array | Uint32Array | Int32Array,
//   outputEncoding: string = 'utf8',
// ): string {
//   const decoder = new TextDecoder(outputEncoding)
//   return decoder.decode(input)
// }

/**
 * Convert String to ArrayBuffer via TextEncoder
 *
 * @see https://developer.mozilla.org/zh-CN/docs/Web/API/TextEncoder
 */

// function str2ab(input: string): ArrayBuffer {
//   const view = str2Uint8Array(input)
//   return view.buffer
// }

/** Convert String to Uint8Array */

// function str2Uint8Array(input: string): Uint8Array {
//   const encoder = new TextEncoder()
//   const view = encoder.encode(input)
//   return view
// }

export function StringArrayBufferChangeUseF() {
  // String = decoder.decode(ArrayBuffer)       ArrayBuffer to String
  // 有空研究一下  utf8  等各种编码方式！！！！
  const decoder = new TextDecoder("utf8")

  // 要用来转换的ArrayBuffer
  const ArrayBufferItem = new Uint8Array([0x74, 0x65, 0x73, 0x74])
  const ArrayBufferItemTwo = new Uint16Array([0x74, 0x65, 0x73, 0x74])
  
  console.log(ArrayBufferItem)
  console.log(ArrayBufferItemTwo)
                                                      // 用Uint16Array时，多了 空格 似乎  一个字节就够
  console.log(decoder.decode(ArrayBufferItem))        // t e s t
  console.log(decoder.decode(ArrayBufferItemTwo))     // test



  // String To ArrayBuffer
  const encoder = new TextEncoder()

  // 要用来转换的String
  const StringItem = "666"

  const view = encoder.encode(StringItem)
  console.log(view.buffer)

}








// 溢出
// 不同的视图类型，所能容纳的数值范围是确定的。超出这个范围，就会出现溢出。比如，8 位视图只能容纳一个 8 位的二进制值，如果放入一个 9 位的值，就会溢出。

// TypedArray 数组的溢出处理规则，简单来说，就是抛弃溢出的位，然后按照视图类型进行解释。

// const uint8 = new Uint8Array(1);
// uint8[0] = 256;
// uint8[0] // 0
// uint8[0] = -1;
// uint8[0] // 255

// 上面代码中，uint8是一个 8 位视图，而 256 的二进制形式是一个 9 位的值100000000，这时就会发生溢出。根据规则，只会保留后 8 位，即00000000。uint8视图的解释规则是无符号的 8 位整数，所以00000000就是0。

// 负数在计算机内部采用“2 的补码”表示，也就是说，将对应的正数值进行否运算，然后加1。比如，-1对应的正值是1，进行否运算以后，得到11111110，再加上1就是补码形式11111111。uint8按照无符号的 8 位整数解释11111111，返回结果就是255。

// 一个简单转换规则，可以这样表示。

//   正向溢出（overflow）：当输入值大于当前数据类型的最大值，结果等于当前数据类型的最小值加上余值，再减去 1。
//   负向溢出（underflow）：当输入值小于当前数据类型的最小值，结果等于当前数据类型的最大值减去余值的绝对值，再加上 1。

// 上面的“余值”就是模运算的结果，即 JavaScript 里面的%运算符的结果。
// 12 % 4 // 0
// 12 % 5 // 2


// const int8 = new Int8Array(1);
// int8[0] = 128;
// int8[0] // -128
// int8[0] = -129;
// int8[0] // 127

// 上面例子中，int8是一个带符号的 8 位整数视图，它的最大值是 127，最小值是-128。输入值为128时，相当于正向溢出1，根据“最小值加上余值（128 除以 127 的余值是 1），再减去 1”的规则，就会返回-128；输入值为-129时，相当于负向溢出1，根据“最大值减去余值的绝对值（-129 除以-128 的余值的绝对值是 1），再加上 1”的规则，就会返回127。


// Uint8ClampedArray视图的溢出规则，与上面的规则不同。它规定，凡是发生正向溢出，该值一律等于当前数据类型的最大值，即 255；如果发生负向溢出，该值一律等于当前数据类型的最小值，即 0。
// const uint8c = new Uint8ClampedArray(1);
// uint8c[0] = 256;
// uint8c[0] // 255
// uint8c[0] = -1;
// uint8c[0] // 0
// 上面例子中，uint8C是一个Uint8ClampedArray视图，正向溢出时都返回 255，负向溢出都返回 0。







// TypedArray.prototype.buffer

// TypedArray实例的buffer属性，返回整段内存区域对应的ArrayBuffer对象。该属性为只读属性。

// const a = new Float32Array(64);
// const b = new Uint8Array(a.buffer);

// 上面代码的a视图对象和b视图对象，对应同一个ArrayBuffer对象，即同一段内存。







// TypedArray.prototype.byteLength，TypedArray.prototype.byteOffset
// byteLength属性返回 TypedArray 数组占据的内存长度，单位为字节。byteOffset属性返回 TypedArray 数组从底层ArrayBuffer对象的哪个字节开始。这两个属性都是只读属性。

// const b = new ArrayBuffer(8);
// const v1 = new Int32Array(b);
// const v2 = new Uint8Array(b, 2);
// const v3 = new Int16Array(b, 2, 2);
// v1.byteLength // 8
// v2.byteLength // 6
// v3.byteLength // 4
// v1.byteOffset // 0
// v2.byteOffset // 2
// v3.byteOffset // 2









// TypedArray.prototype.length
// length属性表示 TypedArray 数组含有多少个成员。注意将 length 属性和 byteLength 属性区分，前者是成员长度，后者是字节长度。

// const a = new Int16Array(8);
// a.length // 8
// a.byteLength // 16










// TypedArray.prototype.set()
// TypedArray 数组的set方法用于复制数组（普通数组或 TypedArray 数组），也就是将一段内容完全复制到另一段内存。

// const a = new Uint8Array(8);
// const b = new Uint8Array(8);
// b.set(a);

// 上面代码复制a数组的内容到b数组，它是整段内存的复制，比一个个拷贝成员的那种复制快得多。

// set方法还可以接受第二个参数，表示从b对象的哪一个成员开始复制a对象。

// const a = new Uint16Array(8);
// const b = new Uint16Array(10);
// b.set(a, 2)

// 上面代码的b数组比a数组多两个成员，所以从b[2]开始复制。













// TypedArray.prototype.subarray()
// subarray方法是对于 TypedArray 数组的一部分，再建立一个新的视图。

// const a = new Uint16Array(8);
// const b = a.subarray(2,3);
// a.byteLength // 16
// b.byteLength // 2

// subarray方法的第一个参数是起始的成员序号，第二个参数是结束的成员序号（不含该成员），如果省略则包含剩余的全部成员。所以，上面代码的a.subarray(2,3)，意味着 b 只包含a[2]一个成员，字节长度为 2。














// TypedArray.prototype.slice()
// TypeArray 实例的slice方法，可以返回一个指定位置的新的TypedArray实例。

// let ui8 = Uint8Array.of(0, 1, 2);
// ui8.slice(-1)
// // Uint8Array [ 2 ]

// 上面代码中，ui8是 8 位无符号整数数组视图的一个实例。它的slice方法可以从当前视图之中，返回一个新的视图实例。

// slice方法的参数，表示原数组的具体位置，开始生成新数组。负值表示逆向的位置，即-1 为倒数第一个位置，-2 表示倒数第二个位置，以此类推。













// TypedArray.of()
// TypedArray 数组的所有构造函数，都有一个静态方法of，用于将参数转为一个TypedArray实例。

// Float32Array.of(0.151, -8, 3.7)
// // Float32Array [ 0.151, -8, 3.7 ]


// 下面三种方法都会生成同样一个 TypedArray 数组。

// // 方法一
// let tarr = new Uint8Array([1,2,3]);
// // 方法二
// let tarr = Uint8Array.of(1,2,3);
// // 方法三
// let tarr = new Uint8Array(3);
// tarr[0] = 1;
// tarr[1] = 2;
// tarr[2] = 3;












// TypedArray.from()

// 静态方法from接受一个可遍历的数据结构（比如数组）作为参数，返回一个基于这个结构的TypedArray实例。

// Uint16Array.from([0, 1, 2])
// // Uint16Array [ 0, 1, 2 ]

// 这个方法还可以将一种TypedArray实例，转为另一种。

// const ui16 = Uint16Array.from(Uint8Array.of(0, 1, 2));
// ui16 instanceof Uint16Array // true

// from方法还可以接受一个函数，作为第二个参数，用来对每个元素进行遍历，功能类似map方法。

// Int8Array.of(127, 126, 125).map(x => 2 * x)
// // Int8Array [ -2, -4, -6 ]
// Int16Array.from(Int8Array.of(127, 126, 125), x => 2 * x)
// // Int16Array [ 254, 252, 250 ]

// 上面的例子中，from方法没有发生溢出，这说明遍历不是针对原来的 8 位整数数组。也就是说，from会将第一个参数指定的 TypedArray 数组，拷贝到另一段内存之中，处理之后再将结果转成指定的数组格式。





























// 5.应用场景：

  // ArrayBuffer 在处理二进制数据、文件上传、网络通信、音视频处理等领域非常有用。它提供了高效的二进制数据操作方式，特别适用于需要处理大量原始数据的情况。
  


  // 需要注意的是，ArrayBuffer 和相关的视图是低级别的数据操作工具，需要小心处理数据类型和边界情况，以确保数据的正确性和安全性。在处理二进制数据时，通常需要了解数据的结构和编码方式，以正确解释数据。


















// ArrayBuffer 和 Buffer 都用于处理二进制数据，但它们在不同的 JavaScript 环境中有所不同。以下是它们的主要区别：

// JavaScript 环境:

// ArrayBuffer: 通常在浏览器环境和 Web Workers 中使用，也可以在一些 JavaScript 运行时环境中（如 Node.js）使用。
// Buffer: 主要用于 Node.js 环境。


// 数据结构:

// ArrayBuffer: 它是一个固定大小的二进制数据缓冲区，用于存储原始二进制数据。ArrayBuffer 不包含数据类型信息，只是一个字节序列。
// Buffer: 它是 Node.js 提供的内置模块，用于处理二进制数据。Buffer 是一个可变大小的数据结构，可以动态添加或删除数据。


// 操作方式:

// ArrayBuffer: 在浏览器环境中，通常需要使用 TypedArray 视图或 DataView 视图来处理 ArrayBuffer 中的数据，因为 ArrayBuffer 本身没有提供对数据的解析或编码支持。
// Buffer: Node.js 的 Buffer 对象提供了许多用于处理二进制数据的方法和功能，包括编码、解码、复制、切片、合并等。


// 可变性:

// ArrayBuffer: 一旦创建，大小和内容都是固定的，不可更改。要修改 ArrayBuffer 中的数据，通常需要创建新的 ArrayBuffer，并将数据复制到新的缓冲区中。
// Buffer: 可以方便地修改其内容，具有更多的灵活性。


// 性能:

// ArrayBuffer: 适合在浏览器环境中处理大量原始数据，因为它不需要额外的内存分配或垃圾回收操作。
// Buffer: 在 Node.js 环境中提供高性能的二进制数据处理功能。


// 总之，ArrayBuffer 主要用于浏览器环境，适用于处理原始二进制数据，而 Buffer 是 Node.js 提供的用于处理二进制数据的内置模块。在跨不同 JavaScript 环境的应用程序中，您需要根据具体环境和需求选择合适的二进制数据处理工具。















// 如何引入node.js的Buffer

// const Buffer = require('buffer').Buffer;
// import { Buffer } from 'buffer';


// // 将 ArrayBuffer 转换为 Buffer
// function arrayBufferToBuffer(arrayBuffer) {
//   const buffer = Buffer.from(new Uint8Array(arrayBuffer));

//   return buffer;
// }













//! ArrayBuffer 是 JavaScript 中的数据类型，它代表一个固定大小的原始二进制数据缓冲区。这意味着 ArrayBuffer 本身只是一个容器，不包含具体的数据，而只有指定大小的二进制数据缓冲区。您可以使用 new ArrayBuffer(size) 来创建一个特定大小的 ArrayBuffer。

// "ArrayBuffer 对象" 不是一个独立的概念。ArrayBuffer 本身就是一个对象，用于表示原始二进制数据。因此，通常不需要额外的 "ArrayBuffer 对象" 这一概念。

// 区别总结如下：

// ArrayBuffer 是一个 JavaScript 数据类型，表示固定大小的原始二进制数据缓冲区。

// ArrayBuffer 对象不是一个额外的实体，它本身就是 ArrayBuffer 类型的实例。

// 您可以使用 new ArrayBuffer(size) 创建特定大小的 ArrayBuffer。

// ArrayBuffer 不包含数据本身，只有指定大小的二进制数据缓冲区。要存储和操作数据，您通常会使用视图，如 TypedArray 或 DataView，来读取和写入 ArrayBuffer 中的数据。

// // 创建一个包含8个字节的 ArrayBuffer
// const buffer = new ArrayBuffer(8);

// // 使用 DataView 来读取和写入数据
// const view = new DataView(buffer);
// view.setInt8(0, 42);
// view.setInt16(2, 1000);

// 在上述示例中，buffer 是一个包含8个字节的 ArrayBuffer，但它不包含具体的数据。数据操作通常使用 DataView 或 TypedArray 视图对象来进行。