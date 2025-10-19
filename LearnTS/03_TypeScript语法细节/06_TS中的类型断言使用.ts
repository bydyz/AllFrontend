//! TypeScript无法获取具体的类型信息，这个我们需要使用类型断言      变量名 as 类型名

//! 获取DOM元素，仅仅是Element类型，不能使用  .src   需要是HTMLImageElement才可以使用 .src


// 获取DOM元素 <img class="img"/>       TypeScript只知道下面函数会返回 Element | null ，但并不知道它具体的类型
const imgEl = document.querySelector(".img")
if (imgEl !== null) { // 类型缩小
  imgEl.src = "xxx"     //获取DOM元素，仅仅是Element类型，不能使用  .src   需要是HTMLImageElement才可以使用 .src
  imgEl.alt = "yyy"
}

// 使用类型断言     as HTMLImageElement
const imgEl1 = document.querySelector(".img") as HTMLImageElement
imgEl1.src = "xxx"
imgEl1.alt = "yyy"




//! 类型断言的规则: 断言只能断言成更加具体的类型, 或者 不太具体(any/unknown) 类型
const age: number = 18
// 错误的做法
// const age2 = age as string


//! TS类型检测来说是正确的, 但是这个代码本身不太正确
const age3 = age as any
const age4 = age3 as string
// console.log(age4.split(" "))


export {}
