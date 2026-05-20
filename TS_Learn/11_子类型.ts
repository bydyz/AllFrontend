//!   在 TypeScript 中，子类型表示一个类型是另一个类型的一种形式。如果一个类型的所有成员（属性和方法）在另一个类型中也存在，并且类型之间的关系是兼容的，那么我们就可以说这个类型是另一个类型的子类型。




//! Dog 接口继承自 Animal 接口，因此 Dog 是 Animal 的子类型。我们可以将一个 Dog 类型的对象赋值给一个 Animal 类型的变量。
interface Animal {
  name: string;
}

interface Dog extends Animal {
  bark(): void;
}

let dog: Dog = { name: "Buddy", bark: () => console.log("Woof! Woof!") };
let animal: Animal = dog; // Dog 是 Animal 的子类型











//！ number 、 string  均为  number | string 的子类型
type IDType = number | string

type ResType = number extends IDType ? true : false
















// !    数字 1 是 number 的子类型     字符 1 是 string 的子类型
type numberType = 1 extends number ? 1 : '1'
type stringType = '1' extends string ? 1 : '1'













// !      似乎  K extends p     K的取值可以为 "slogan"  "name"  "age"  "slogan"|"name"  "slogan"|"age"  "age"|"name"  "slogan"|"name"|"age"
type K = "slogan"|"name"|"age"
type P = "slogan"|"name"|"age"
type a = K extends P ? true : false



export {}