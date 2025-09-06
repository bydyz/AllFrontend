// Symbol.toStringTag 内置通用（well-known）symbol 是一个字符串值属性，用于创建对象的默认字符串描述。
// 它由 Object.prototype.toString() 方法内部访问。



class ValidatorClass {
  get [Symbol.toStringTag]() {
    return "Validator";
  }
}

console.log(Object.prototype.toString.call(new ValidatorClass()));
// Expected output: "[object Validator]"