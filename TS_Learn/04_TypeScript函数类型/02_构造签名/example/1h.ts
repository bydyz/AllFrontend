// 既有构造签名又有调用签名的接口
interface CallableConstructor {
  // 构造签名
  new (name: string): CallableInstance;
  
  // 调用签名（作为函数调用）
  (prefix: string): string;
  
  // 静态属性
  instanceCount: number;
  maxInstances: number;
}

interface CallableInstance {
  name: string;
  invoke(): void;
}

// 实现
const MyCallable: CallableConstructor = (function(this: any, ...args: any[]) {
  if (this instanceof MyCallable) {
    // 作为构造函数调用
    this.name = args[0];
    MyCallable.instanceCount++;
  } else {
    // 作为函数调用
    return `Prefix: ${args[0]}`;
  }
} as any) as CallableConstructor;

// 添加静态属性
MyCallable.instanceCount = 0;
MyCallable.maxInstances = 10;

// 设置原型方法
MyCallable.prototype.invoke = function() {
  console.log(`Invoking: ${this.name}`);
};

// 使用
// 作为函数调用
const result = MyCallable("test");
console.log(result); // "Prefix: test"

// 作为构造函数调用
const instance = new MyCallable("MyInstance");
instance.invoke(); // "Invoking: MyInstance"

console.log(MyCallable.instanceCount); // 1