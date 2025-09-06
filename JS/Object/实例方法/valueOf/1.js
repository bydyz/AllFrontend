// Object 实例的 valueOf() 方法将 this 值转换成对象。该方法旨在被派生对象重写，以实现自定义类型转换逻辑。


function MyNumberType(n) {
  this.number = n;
}

MyNumberType.prototype.valueOf = function () {
  return this.number;
};

const object1 = new MyNumberType(4);

console.log(object1 + 3);
// Expected output: 7