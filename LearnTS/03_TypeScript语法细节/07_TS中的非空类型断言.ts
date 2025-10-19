//! 在 TypeScript 中，非空类型断言（Non-null Assertion Operator）是一种告诉编译器你非常确定某个值不会是 null 或 undefined 的方式。这种断言使用后缀 ! 来表示。通过这种方式，你可以绕过 TypeScript 的严格空值检查，强制将一个可能为 null 或 undefined 的类型视为非空类型。
interface IPerson {
  name: string
  age: number
  friend?: {
    name: string
  }
}

const info: IPerson = {
  name: "why",
  age: 18
}

//! 访问属性: 可选链: ?.
console.log(info.friend?.name)

// 属性赋值:
//! 解决方案一: 类型缩小
if (info.friend) {
  info.friend.name = "kobe"
}

//! 解决方案二: 非空类型断言(有点危险, 只有确保friend一定有值的情况, 才能使用)
info.friend.name = "james"        //! 因为用了可选链，friend可能存在，也可能是undefined，故此处不用非空断言是不行的
info.friend!.name = "james"       //! 虽然使用了  非空类型断言  然后可以对可选的属性进行操作，但是  的确是 有问题的语句，运行会报错









let username: string | null = null;

// 这里会报错，因为 TypeScript 不确定 username 是否为 null
console.log(username.toUpperCase());

// 使用非空断言
console.log(username!.toUpperCase()); // 正确：假设我们知道 username 不会是 null








// HTML 中有 <div id="app"></div>
const appElement = document.getElementById('app');

// 这里会报错，因为 getElementById 可能返回 null
appElement.innerHTML = '<p>Hello World</p>';

// 使用非空断言
const appElementNotNull = document.getElementById('app')!;
appElementNotNull.innerHTML = '<p>Hello World</p>'; // 正确









declare function getUserData(): { name?: string, age?: number };

const user = getUserData();

// 这里会报错，因为 TypeScript 认为 name 和 age 可能是 undefined
console.log(`Name: ${user.name}, Age: ${user.age}`);

// 使用非空断言
console.log(`Name: ${user.name!}, Age: ${user.age!}`); // 正确：假设我们知道 getUserData 总是返回带有 name 和 age 的对象

export {}
