const pattern = {
  get() {
    return "我总是返回这个字符串，无论你的赋值是什么";
  },
  set() {
    this.myname = "这是我名称的字符串";
  },
};

function TestDefineSetAndGet() {
  Object.defineProperty(this, "myProperty", pattern);
}

const instance = new TestDefineSetAndGet();
instance.myProperty = "test";
console.log(instance.myProperty);   // 我总是返回这个字符串，无论你的赋值是什么

console.log(instance.myname);   // 这是我名称的字符串
