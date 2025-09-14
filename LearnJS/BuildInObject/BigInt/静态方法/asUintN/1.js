// BigInt.asUintN(width, bigint);

// BigInt.asUintN 静态方法将 BigInt 转换为一个 0 和 2^width-1 之间的无符号整数。

// 参数
//   width
//     可存储整数的位数。

//   bigint
//     要存储在指定位数上的整数。

// 返回值
//   bigint 模 (modulo) 2^width 作为无符号整数的值。



const U64_CEIL = 2n ** 64n;

console.log(BigInt.asUintN(64, U64_CEIL - 1n));
// 18446744073709551615n (2n ** 64n - 1n, the maximum non-wrapping value)
console.log(BigInt.asUintN(64, U64_CEIL));
// 0n (wraps to zero)
console.log(BigInt.asUintN(64, U64_CEIL + 1n));
// 1n
console.log(BigInt.asUintN(64, U64_CEIL * 2n));
// 0n (wraps on multiples)
console.log(BigInt.asUintN(64, U64_CEIL * -42n));
// 0n (also wraps on negative multiples)