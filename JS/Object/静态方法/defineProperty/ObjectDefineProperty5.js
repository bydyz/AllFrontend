const pattern = {
  get() {
    return "我总是返回这个字符串，无论你的赋值是什么";
  },
  set() {
    this.myname = "这是我名称的字符串";
  },
};

function TestDefineSetAndGet() {
  Object.defineProperty(this, "myproperty", pattern);
}

const instance = new TestDefineSetAndGet();
instance.myproperty = "test";
console.log(instance.myproperty);   // 我总是返回这个字符串，无论你的赋值是什么

console.log(instance.myname);   // 这是我名称的字符串
