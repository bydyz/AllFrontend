interface IPerson {
  name: string
  age: number
}


// 1.奇怪的现象一: 
// 定义info, 类型是IPerson类型
const obj = {
  name: "why",
  age: 18,

  // 多了一个height属性
  height: 1.88
}


// ！用对象赋值就报警告
// ！因为 TypeScript 支持结构化类型系统（也称为鸭子类型），这意味着只要对象满足接口要求的形状（即拥有所有必需的属性且类型正确），它就可以被赋值给该接口类型的变量。多余的属性不会导致错误。
const info: IPerson = obj

//！ 直接在对象字面量中添加了额外的属性（如 height），TypeScript 认为这是不安全的
const info2: IPerson = {
  name: "why",
  age: 18,

  // 多了一个height属性
  height: 1.88
}

//！ 解决方案

// ！ 加  as IPerson 即可
const info3: IPerson = {
  name: "why",
  age: 18,
  height: 1.88
} as IPerson;


// ！ 用 extends 进行拓展
interface IPersonExtended extends IPerson {
  height: number;
}

const info4: IPersonExtended = {
  name: "why",
  age: 18,
  height: 1.88
};


//！   使用索引签名
interface IPersonWithExtras {
  name: string;
  age: number;
  [propName: string]: any;
}

const info5: IPersonWithExtras = {
  name: "why",
  age: 18,
  height: 1.88
};

















// 2.奇怪的现象二:
function printPerson(person: IPerson) {

}
const kobe = { name: "kobe", age: 30, height: 1.98 }
printPerson(kobe)

printPerson({ name: "kobe", age: 30, height: 1.98 })






//！ 解释现象
//! 第一次创建的对象字面量, 称之为fresh(新鲜的)
//! 对于新鲜的字面量, 会进行严格的类型检测. 必须完全满足类型的要求(不能有多余的属性)
const obj2 = {
  name: "why",
  age: 18,

  height: 1.88
}

const p: IPerson = obj2



//！ 总结
// 直接引用已有对象：当直接引用一个已经存在的对象（如 obj）并将其赋值给接口类型的变量时，TypeScript 的结构化类型系统允许这样做，即使对象包含额外的属性。
// 直接创建对象字面量：当你直接在代码中创建对象字面量并尝试将其赋值给接口类型的变量时，TypeScript 实施了更严格的检查，不允许存在未定义在接口中的额外属性，除非使用类型断言或其他方式明确告知编译器忽略这些属性。
export {}
