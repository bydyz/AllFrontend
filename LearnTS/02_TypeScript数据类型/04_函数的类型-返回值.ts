// 在定义一个TypeScript中的函数时
//! 返回值类型可以明确的指定, 也可以自动进行类型推导
function sum(num1: number, num2: number): number {
  return num1 + num2
}

const res = sum(123, 321)






//！ 返回值，是由类型推导决定
function sum1(num1: number, num2: number) {
  return num1 + num2 + ''
}






// 函数的参数类型
//   函数是JavaScript非常重要的组成部分，TypeScript允许我们指定  函数的参数  和  返回值的类型
//   参数的类型注解
//     声明函数时，可以在每个参数后添加类型注解，以声明函数接受的参数类型
function greet(name: string): string {
  console.log("hello" + name.toUpperCase())
  return "hello" + name.toUpperCase()
}






type LyricInfoType = { time: number, text: string }
// parseLyric函数的数据类型: (lyric: string) => LyricInfoType[]
function parseLyric(lyric: string): LyricInfoType[] {
  const lyricInfos: LyricInfoType[] = []
  // 解析
  return lyricInfos
}



//！ JavaScript 规范声明任何没有 export 的 JavaScript 文件都应该被认为是一个脚本，而非一个模块
//！ 如果你有一个文件，现在没有任何 import 或者 export，但是你希望它被作为模块处理，添加这行代码  export{}
export {}
