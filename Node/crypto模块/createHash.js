// crypto的目的是提供通用的加密和哈希算法，javascript可以实现，但速度很慢，node使用了c/c++实现这些算法后，通过crypto这个模块暴露为JavaScript接口，这样用起来方便，运行速度也快。






// md5是一种常用的哈希算法，用于给任意数据一个“签名”。这个签名通常用一个十六进制的字符串表示：

const crypto = require('crypto');

const hash = crypto.createHash('md5');

// 可任意多次调用update():   经过下面两个  和  经过下面一个 最后的结果是不同的
hash.update('Hello, world!');
hash.update('Hello, nodejs!');

console.log(hash.digest('hex')); // 7e1977739c748beac0c0fd14fd26a544

// update()方法  默认字符串编码为UTF-8，也可以传入Buffer。

// 如果要计算SHA1，只需要把'md5'改成'sha1'，就可以得到SHA1的结果          1f32b9c9932c02227819a4151feed43e131aca40。

// 还可以使用更安全的sha256和sha512。
