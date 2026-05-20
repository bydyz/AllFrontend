// 语法
//   bigIntObj.valueOf()


// 描述
//   valueOf() 方法返回 BigInt 对象包装的原始值。


// 返回值
//   表示指定 BigInt 对象的原始 BigInt 值。


console.log(typeof Object(1n));
// Expected output: "object"

console.log(Object(1n).valueOf())
// Expected output: "1n"

console.log(typeof Object(1n).valueOf());
// Expected output: "bigint"