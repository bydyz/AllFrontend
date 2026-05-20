// 语法
//   BigInt.asIntN(width, bigint);


// 描述
//   BigInt.asIntN 静态方法将 BigInt 值转换为一个 -2^(width-1) 与 2^(width-1)-1 之间的有符号整数。
//      先对2^width取模，然后返回有符号整数


// 参数
//   width
//     可存储整数的位数。

//   bigint
//     要存储在指定位数上的整数。

// 返回值
//   bigint 模 (modulo) 2^width 作为有符号整数的值。


const I64_CEIL = 2n ** 63n;

console.log(BigInt.asIntN(64, I64_CEIL - 1n));
// 9223372036854775807n (2n ** 64n - 1n, the maximum non-wrapping value)

console.log(BigInt.asIntN(64, I64_CEIL));
// -9223372036854775808n (wraps to min value)

console.log(BigInt.asIntN(64, I64_CEIL + 1n));
// -9223372036854775807n (min value + 1n)

console.log(BigInt.asIntN(64, I64_CEIL * 2n));
// 0n (wrapped around to zero)

console.log(BigInt.asIntN(64, -I64_CEIL * -42n));
// 0n (also wraps on negative multiples)