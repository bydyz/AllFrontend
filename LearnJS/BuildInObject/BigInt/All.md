# 描述

BigInt 是一种内置对象，它提供了一种方法来表示大于 2^53 - 1 的整数。
2^53 - 1 原本是 Javascript 中可以用 Number 表示的最大数字。BigInt 可以表示任意大的整数。


可以用在一个整数字面量后面加 n 的方式定义一个 BigInt ，如：10n，
或者调用函数 BigInt()（但不包含 new 运算符）并传递一个整数值或字符串值。

```javascript
const theBiggestInt = 9007199254740991n;

const alsoHuge = BigInt(9007199254740991);
// ↪ 9007199254740991n

const hugeString = BigInt("9007199254740991");
// ↪ 9007199254740991n

const hugeHex = BigInt("0x1fffffffffffff");
// ↪ 9007199254740991n

const hugeBin = BigInt(
  "0b11111111111111111111111111111111111111111111111111111",
);
// ↪ 9007199254740991n
```





# 类型信息

```javascript
// 使用 typeof 测试时， BigInt 对象返回 "bigint"
typeof 1n === "bigint"; // true
typeof BigInt("1") === "bigint"; // true


// 使用 Object 包装后， BigInt 被认为是一个普通 "object"
typeof Object(1n) === "object"; // true
```





# 运算

以下操作符可以和 BigInt 一起使用： +、*、-、**、%。
除 >>> （无符号右移）之外的 位操作 也可以支持。因为 BigInt 都是有符号的， >>> （无符号右移）不能用于 BigInt。
为了兼容 asm.js，BigInt 不支持单目 (+) 运算符