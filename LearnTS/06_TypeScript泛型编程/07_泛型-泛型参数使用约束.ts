// 传入的key类型, obj当中key的其中之一
interface IKun {
  name: string
  age: number
}

// ！ 记住这个吧，少年
type IKunKeys = keyof IKun // "name"|"age"
// ！   sonType extends IKunKeys  =>  sonType 为  "name"  或者  "age"

//！  extends keyof 后面还接 O  
function getObjectProperty<O, K extends keyof O>(obj: O, key: K){
  return obj[key]
}

// !   此处若是只使用 extends 则会有问题，因为此时 K 是 { name: string, age: number } 的子属性，后面 obj[key]会有问题   
// ！  只有用了 keyof 后，K才是 name age 中的一个，才可以后面用obj[key]
// function getObjectProperty<O, K extends O>(obj: O, key: K){
//   return obj[key]
// }

const info = {
  name: "why",
  age: 18,
  height: 1.88
}

const name = getObjectProperty(info, "name")

const name1 = getObjectProperty(info, name)































//！ 在 TypeScript 中，keyof 是一个用于获取对象类型所有键的字符串字面量联合类型的关键字。它用于提取对象类型的键集合，使得我们可以更安全地操作对象的属性。

type Person1 = {
  name: string;
  age: number;
  address: string;
};

// 使用 keyof 提取 Person 类型的键集合
type PersonKeys = keyof Person1;

// PersonKeys 的类型为 "name" | "age" | "address"

// 在这个例子中，keyof Person 返回的类型是 "name" | "age" | "address"，表示 Person 类型的所有可能的键。这种类型可以在多个场景中使用。


// 访问对象的属性：

function getProperty(obj: Person1, key: keyof Person1): string | number {
  return obj[key];
}

const person: Person1 = {
  name: "John",
  age: 30,
  address: "123 Main St",
};

console.log(getProperty(person, "name")); // 返回 "John"
console.log(getProperty(person, "age"));  // 返回 30

// 在上述例子中，keyof Person 确保 getProperty 函数的第二个参数必须是 Person 类型的键，从而避免了使用不存在的属性。








// 使用 TypeScript 中的映射类型和keyof关键字创建了一个新的类型 PartialPerson，该类型将 Person 类型的每个属性变为可选属性。

type Person2 = {
  name: string;
  age: number;
  address: string;
};

// PartialPerson 类型的定义
type PartialPerson = {
  [K in keyof Person2]?: Person2[K];
};

//！ PartialPerson 类型为 { name?: string, age?: number, address?: string }

// 在这里，我们使用了映射类型的语法，[K in keyof Person2] 表示我们要遍历 Person2 类型的所有键（keyof Person2 返回 "name" | "age" | "address"）。然后，我们将每个键 K 转换为一个可选属性，使用 ?: 符号，其类型是 Person2[K]，表示属性值的类型与原始 Person2 对应属性的类型相同。

export {}
