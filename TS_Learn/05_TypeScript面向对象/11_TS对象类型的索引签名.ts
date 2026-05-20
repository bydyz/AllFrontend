// !    在 TypeScript 中，索引签名（Index Signature）允许对象拥有动态数量的属性，并且这些属性的键和值可以是特定类型的集合。这对于需要处理未知或动态属性的对象特别有用。

//！ 需要注意的是，当使用字符串索引签名时，所有明确声明的属性必须与索引签名兼容，即它们的类型应该是索引签名类型或其子类型。


//！ 假设我们需要一个对象来存储不同用户的名字，但事先不知道会有多少个用户或他们的名字是什么。则使用如下接口
interface StringArray {
  [index: string]: string;
}

const names: StringArray = {};
names['Alice'] = 'Software Engineer';
names['Bob'] = 'Data Scientist';

console.log(names['Alice']); // 输出 "Software Engineer"
console.log(names['Bob']);   // 输出 "Data Scientist"








//！ 使用数字作为 键
interface NumberDictionary {
  [index: number]: string;
}

let myArray: NumberDictionary = {};
myArray[0] = "Hello";
myArray[1] = "World";

console.log(myArray[0]); // 输出 "Hello"
console.log(myArray[1]); // 输出 "World"








//！ 限制对象的键只能是某些预定义的字符串之一。可以通过联合类型实现这一点。
type Role = 'admin' | 'user' | 'guest';

type Permissions = {
  [role in Role]: string[];
};

let permissions: Permissions = {
    admin: ['read', 'write', 'delete'],
    user: ['read', 'write'],
    guest: ['read']
};

console.log(permissions.admin); // 输出 ["read", "write", "delete"]
console.log(permissions.user);  // 输出 ["read", "write"]
console.log(permissions.guest); // 输出 ["read"]







//！ 只读属性
interface ReadonlyStringArray {
  readonly [index: string]: string;
}

let readOnlyNames: ReadonlyStringArray = {
  Alice: 'Software Engineer',
  Bob: 'Data Scientist'
};

// readOnlyNames['Charlie'] = 'DevOps'; // 错误：无法分配到 "readOnlyNames" ，因为它是只读属性。








//！ 在 TypeScript 中，当你希望对象同时拥有固定的属性和动态的属性时，可以通过索引签名实现这一点。然而，TypeScript 对这种混合使用有一些类型上的限制：所有明确声明的固定属性必须与索引签名的类型兼容。这意味着如果索引签名定义了某种类型的值（如 string），那么所有固定属性的类型也必须是该类型的子类型。
interface MixedObjectStrict {
  id: number; // 固定属性 id 类型为 number
  [key: string]: string; // 索引签名的值类型为 string
}

// 下面的代码会导致编译错误，因为 'id' 的类型 'number' 不符合索引签名的类型 'string'
let objStrict: MixedObjectStrict = {
  id: 1, // 错误：类型 'number' 不能赋值给类型 'string'
  name: "John Doe",
};



// !    同类型即可
interface MixedObjectStrict1 {
  id: string;
  [key: string]: string; // 索引签名的值类型为 string
}

let objStrict1: MixedObjectStrict1 = {
  id: '666',
  name: "John Doe",
};



interface MixedObjectStrict2 {
  id: '666';
  [key: string]: string; // 索引签名的值类型为 string
}

// 下面的代码会导致编译错误，因为 'id' 的类型 'number' 不符合索引签名的类型 'string'
let objStrict2: MixedObjectStrict2 = {
  id: '666',
  name: "John Doe",
};







// ！   动态属性类型 为  固定属性 类型 的 联合类型
interface Employee {
  id: number;
  department: string;
  [key: string]: string | number | boolean; // 更广泛的联合类型
}

let employee: Employee = {
  id: 1,
  department: "Engineering",
  isManager: true, // 布尔类型
  salary: 75000   // 数字类型
};

console.log(employee.id);        // 输出 1
console.log(employee.department); // 输出 "Engineering"
console.log(employee.isManager);  // 输出 true
console.log(employee.salary);     // 输出 75000












//！ 如果索引签名定义了某种类型的值（如 string），那么所有固定属性的类型也必须是该类型的子类型。
interface ICollection0 {

  //！ 任何以数字作为键的属性都必须是 number 类型。
  [index: number]: number

  length: number
}

function iteratorCollection0(collection: ICollection0) {
  console.log(collection[0])
  console.log(collection[1])
}

iteratorCollection0({ 2: 111, 1: 18, length: 10 })
iteratorCollection0({ 3: 18, length: 10 })
iteratorCollection2({ 'name': 18, length: 10 })
iteratorCollection2({ '333': 18, length: 10 })    // 这个真烦！！！
iteratorCollection0({ length: 10 })

iteratorCollection0([111, 222, 333])               // [index: number]: number      [index: number]: any

iteratorCollection0(['111', '222', '333'])         // [index: string]: string      [index: number]: any

// ！  这样却不行     是因为不是对象吗
const tuple0: [string, string] = ["why", "18"]

iteratorCollection0(tuple0)






interface ICollection1 {
  [index: string]: number

  length: number
}

function iteratorCollection1(collection: ICollection1) {
  console.log(collection[0])
  console.log(collection[1])
}

iteratorCollection1({ 2: 111, 1: 18, length: 10 })
iteratorCollection1({ '666': 18, length: 10 })
iteratorCollection1({ length: 10 })

iteratorCollection1([111, 222, 333])               // [index: number]: number      [index: number]: any

iteratorCollection1(['111', '222', '333'])         // [index: string]: string      [index: number]: any

// ！  这样却不行     是因为不是对象吗
const tuple1: [string, string] = ["why", "18"]

iteratorCollection1(tuple1)













// interface ICollection0 {
//   [index: number]: string;
//   length: number;
// }

// 索引签名：[index: number]: string 表示任何以数字作为键的属性都必须具有 string 类型的值。
// 固定属性：length: number 定义了一个名为 length 的属性，其类型为 number。
// 由于 number 不是 string 的子类型，因此 TypeScript 编译器会报错，提示 length 属性的类型与索引签名不兼容。

//！ 为了使这个接口定义合法，将固定属性与具有索引签名的部分分开，通常可以通过嵌套结构来实现这一点
interface ICollectionBase {
  [index: number]: string;
}

interface ICollectionSon extends ICollectionBase {
  length: number;
}

let collectionSon: ICollectionSon = {
  0: "first",
  1: "second",
  length: 2,
};

console.log(collectionSon[0]); // 输出 "first"
console.log(collectionSon.length); // 输出 2







export {}
