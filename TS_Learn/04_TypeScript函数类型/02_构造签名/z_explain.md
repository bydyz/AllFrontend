# 构造函数的要求

传递的构造函数只需要具有接口要求的最小结构，额外的任何成员（实例方法、静态方法、实例属性、静态属性）都符合要求。



# 额外的实例属性和实例方法 不能直接使用



# 构造签名 接口 的限制范围：

  ✅ 约束构造函数本身：静态属性、静态方法

  ✅ 约束构造行为：参数类型、返回类型

  ❌ 不约束实例成员：实例属性、实例方法



# 构造签名 类的实例 的限制范围：实例属性、实例方法

```TypeScript
interface PersonInstance {
  name: string;
  age: number;
  greet(): string;
}

// 只能限定构造函数的实例属性、实例方法
```

```TypeScript
class Person {
  name: string
  age: number
  constructor(arg1: string, arg2: number) {
    this.name = arg1
    this.age = arg2
  }
}

// 能起到限定作用的，只能是其中的   实例属性、实例方法   即使定义了  静态属性、静态方法  也不起作用
```