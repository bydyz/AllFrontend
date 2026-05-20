//！ 可选类型需要在必传参数的后面

// y就是一个可选参数
// 可选参数类型是什么? number | undefined 联合类型    注意此处不能是 null
function foo(x: number, y?: number) {
  if (y !== undefined) {
    console.log(y + 10)
  }
}

// ！ 参数必须完全对应
foo(10)
foo(10, 20)
foo(10, 20, 30)

export {}

