// Symbol.replace 这个属性指定了当一个字符串替换所匹配字符串时所调用的方法。
// String.prototype.replace() 方法会调用此方法


class Replace1 {
  constructor(value) {
    this.value = value;
  }
  [Symbol.replace](string) {
    return `s/${string}/${this.value}/g`;
  }
}

console.log("foo".replace(new Replace1("bar")));
// Expected output: "s/foo/bar/g"
