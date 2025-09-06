//！ 可选类型需要在必传参数的后面

// y就是一个可选参数
// 可选参数类型是什么? number | undefined 联合类型
function foo(x: number, y?: number) {
  if (y !== undefined) {
    console.log(y + 10)
  }
}

foo(10)
foo(10, 20)
// 和前面函数的参数是对象类型一样，调用时传入的参数必须精确         前面传入对象时，还有要求 key 相同
foo(10, 20, 30)

export {}

