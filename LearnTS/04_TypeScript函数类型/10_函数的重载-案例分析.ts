//! 需求: 只能将两个数字/两个字符串进行相加

//！ 案例分析: any实现
// function add(arg1, arg2) {
//   return arg1 + arg2
// }

// add(10, 20)
// add("abc", "cba")
// add({aaa: "aaa"}, 123)


//！ 1.实现两个函数
// function add1(num1: number, num2: number) {
//   return num1 + num2
// }

// function add2(str1: string, str2: string) {
//   return str1 + str2
// }

// add1(10, 20)
// add2("abc", "cba")


//！ 2.错误的做法: 联合类型是不可以         运算符“+”不能应用于类型“string | number”和“string | number”
// function add(arg1: number|string, arg2: number|string) {
//   return arg1 + arg2
// }


//！ 3.TypeScript中函数的重载写法
// 在TypeScript中，我们可以去编写不同的重载签名（overload signatures）来表示函数可以以不同的方式进行调用；
// 一般是编写两个或者以上的重载签名，再去编写一个通用的函数以及实现
//！ 调用的时候，它会根据我们传入的参数类型来决定执行函数体时，到底执行哪一个函数的重载签名
//?  但是注意，有实现体的函数，是不能直接被调用的
// 3.1.先编写重载签名     函数的签名是：(参数以及类型): 返回值类型
function add(arg1: number, arg2: number): number
function add(arg1: string, arg2: string): string

// 3.2.编写通用的函数实现
function add(arg1: any, arg2: any): any {
  return arg1 + arg2
}

add(10, 20)
add("aaa", "bbb")
//！ 虽然通用的函数没有限制参数以及返回值的类型，但是调用通用的函数函数时回去匹配重载签名，倘若无法匹配，即会报错
add(10 , "aaa")
add({name: "why"}, "aaa")
add("aaa", 111)

export {}
