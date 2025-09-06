//! Omit 类型允许你从一个类型中排除指定的属性

interface Person {
  name: string;
  age: number;
  location: string;
}

type PersonWithoutAge = Omit<Person, 'age'>;
// 结果类型为 { name: string; location: string; }









//! 将类型 T 的所有属性变为可选（?）

interface Todo {
  title: string;
  description: string;
}

type PartialTodo = Partial<Todo>;
// 结果类型为 { title?: string | undefined; description?: string | undefined; }









//!  将类型 T 的所有属性变为必需

interface Props {
  a?: number;
  b?: string;
}

type RequiredProps = Required<Props>;
// 结果类型为 { a: number; b: string; }








//!  将类型 T 的所有属性变为只读（readonly）。

interface Todo1 {
  title: string;
}

type ReadonlyProps = Readonly<Todo1>;








//!  构造一个对象类型，其键是类型 K，值是类型 T。

interface PageInfo {
  title: string;
}

type Page = "home" | "about" | "contact";

const x: Record<Page, PageInfo> = {
  home: { title: "Home" },
  about: { title: "About" },
  contact: { title: "Contact" },
};








//!    从类型 T 中挑选出指定的属性集合 K。

interface Todo2 {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview2 = Pick<Todo2, "title" | "completed">;
// 结果类型为 { title: string; completed: boolean; }







//!    从联合类型 T 中排除可以赋值给 U 的类型。

type T0 = Exclude<"a" | "b" | "c", "a">; // 结果类型为 "b" | "c"
type T1 = Exclude<string | number | (() => void), Function>; // 结果类型为 string | number







//!    从联合类型 T 中提取可以赋值给 U 的类型。

type T2 = Extract<"a" | "b" | "c", "a" | "f">; // 结果类型为 "a"
type T3 = Extract<string | number | (() => void), Function>; // 结果类型为 () => void








//!  从类型 T 中排除 null 和 undefined。

type T4 = NonNullable<string | number | undefined>; // 结果类型为 string | number
type T5 = NonNullable<string[] | null | undefined>; // 结果类型为 string[]








//!  获取函数返回类型的类型。

declare function f1(): { a: number; b: string };

type T6 = ReturnType<() => string>; // 结果类型为 string
type T7 = ReturnType<(s: string) => void>; // 结果类型为 void
type T8 = ReturnType<typeof f1>; // 结果类型为 { a: number; b: string }







//!    获取构造函数类型的实例类型。

class C {
  x = 0;
  y = 0;
}

type T9 = InstanceType<typeof C>; // 结果类型为 C
type T10 = InstanceType<any>; // 结果类型为 any
type T11 = InstanceType<never>; // 结果类型为 never


export{}