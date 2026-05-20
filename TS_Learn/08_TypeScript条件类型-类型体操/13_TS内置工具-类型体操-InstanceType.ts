class Person {}
class Dog {}


// 类型体操
// ！   由  类的类型  导出  类的实例
type HYInstanceType<T extends new (...args: any[]) => any> = T extends new (...args: any[]) => infer R ? R: never
//!  T extends new (...args: any[]) => any 是 TypeScript 中的条件类型，用于判断类型 T 是否是一个构造函数类型。

// 具体解释如下：

// T 是一个类型参数，表示待检查的类型。
// new (...args: any[]) => any 表示构造函数类型。这个部分描述了一个构造函数的签名，它接受任意类型的参数，返回任意类型的实例。


const p1: Person = new Person()

// typeof Person: 构造函数具体的类型
//!  InstanceType构造函数创建出来的实例对象的类型
type HYPerson = HYInstanceType<typeof Person>
const p2: HYPerson = new Person()

type innerPerson = InstanceType<typeof Person>
const p5: innerPerson = new Person()




// 构造函数的例子
// 通过的创建实例的工具函数时会用到这个InstanceType
function factory<T extends new (...args: any[]) => any>(ctor: T): HYInstanceType<T> {
  return new ctor()
}

const p3 = factory(Person)
const d = factory(Dog)


export {}